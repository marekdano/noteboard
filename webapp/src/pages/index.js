import React, { useEffect } from "react"
import { useAuth } from 'react-use-auth'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import Layout from "../components/layout"
import SEO from "../components/seo"

const LoginButton = () => {
  const { isAuthenticated, user, userId, login, logout } = useAuth()

  const [updateUser, { data }] = useMutation(
    gql`
      mutation updateUser($userId: String) {
        updateUser(userId: $userId) {
          userId
        }
      }
    `,
    {
      variables: {
        userId
      }
    }
  )

  useEffect(() => {
    userId && updateUser()
  }, [userId])
  
  return isAuthenticated() ? 
    <>
      <button onClick={logout}>Logout</button>
      <p>Hello, { user.name }</p>
    </> : 
    <>
      <button onClick={login}>Login</button>
      <p>Hello, everybody</p>
    </>
}

const IndexPage = () => {
  const { data } = useQuery(gql`
    query {
      notes {
        content
      }
    }
  `)

  return (
    <Layout>
      <SEO title="noteboard" />
      <LoginButton />
      <p>Stick your ordinary note on the board.</p>

      { data && data.notes && data.notes.length ?
        <ul>
          { data.notes.map((note, index) => (<li key={index}>{note.content}</li>)) }
        </ul> :
        <h5>No notes yet</h5>
      }
    </Layout>
  )
}

export default IndexPage
