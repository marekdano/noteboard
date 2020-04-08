import React from "react"
import { useAuth } from "react-use-auth"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LoginButton from "../components/LoginButton"
import { Dashboard } from "../components/Dashboard"

const IndexPage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Layout>
      <SEO title="noteboard" />
      <Dashboard />

      <LoginButton />
    </Layout>
  )
}

export default IndexPage
