import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

function offsetFromCursor(items: any[], cursor: any, readField: any) {
  return items.findIndex((i) => readField("id", i) === cursor);
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: ["type"],
  
            // While args.cursor may still be important for requesting
            // a given page, it no longer has any role to play in the
            // merge function.
            merge(existing, incoming, { args, readField }) {

              const mergedPosts = existing ? existing.posts.slice(0) : [];
              let offset = offsetFromCursor(mergedPosts, args?.cursor, readField);
              // If we couldn't find the cursor, default to appending to
              // the end of the list, so we don't lose any data.
              if (offset < 0) offset = mergedPosts.length;

              for (let i = 0; i < incoming.posts.length; ++i) {
                mergedPosts[offset + i] = incoming.posts[i];
              }

              return {
                hasNextPage: incoming.hasNextPage,
                pages: incoming.pages,
                posts: mergedPosts
              };
            },
  
            // Return all items stored so far, to avoid ambiguities
            // about the order of the items. limit = existing.length
            read(existing, {
              args,
              variables,
              readField,
            }) {
              if (existing) {
                console.log('READ', existing);
                let offset = offsetFromCursor(existing.posts, variables?.cursor, readField);
                console.log('READ OFFSET', offset);
                console.log('READ ARGS', variables);
                // If we couldn't find the cursor, default to reading the
                // entire list.
                if (offset < 0) offset = 0;
                return {
                  hasNextPage: existing.hasNextPage,
                  pages: existing.pages,
                  posts: existing.posts.slice(offset, offset + args?.limit ?? existing.posts.length)
                };
              }
            },
          },
        },
      },
    },
  })
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
