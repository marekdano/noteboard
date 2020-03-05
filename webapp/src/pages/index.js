import React from "react"
import { useAuth } from 'react-use-auth'

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const { isAuthenticated, user, login, logout } = useAuth()
  console.table(isAuthenticated(), user)

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

      <h5>No notes yet</h5>
    </Layout>
  )
}

export default IndexPage
