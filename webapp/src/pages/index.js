import React from "react"
import { useAuth } from 'react-use-auth'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const { isAuthenticated, user, login, logout } = useAuth()

  const { data, loading } = useQuery(gql`
    query {
      notes {
        content
      }
    }
  `)

  return (
    <Layout>
      <SEO title="noteboard" />
      {isAuthenticated() ? 
        <>
          <button onClick={logout}>Logout</button>
          <p>Hello, { user.name }</p>
        </> : 
        <>
          <button onClick={login}>Login</button>
          <p>Hello, everybody</p>
        </>
      }
      <p>Stick your ordinary note on the board.</p>

      { data && data.notes && data.notes.length ?
        <ul>
          { data.notes.map(note => (<li>{note.content}</li>)) }
        </ul> :
        <h5>No notes yet</h5>
      }
    </Layout>
  )
}

export default IndexPage
