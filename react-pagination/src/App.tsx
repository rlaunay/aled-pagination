import { useState } from 'react';
import {gql, useQuery} from "@apollo/client";

const GET_POSTS = gql`
  query Posts($cursor: Int!, $limit: Int!) {
    posts(cursor: $cursor, limit: $limit) {
      hasNextPage
      pages
      posts {
        id
        title
      }
    }
  }
`

function App() {
  const { data, error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      cursor: 1,
      limit: 10
    }
  })

  const nextPage = () => fetchMore({ variables: { cursor: 11 }})

  return (
    <div>
      <pre>
      {data && JSON.stringify(data.posts, null, 2)}
      </pre>
      <button onClick={nextPage} >more</button>
    </div>
  )
}

export default App
