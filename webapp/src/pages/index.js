import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Dashboard } from "../components/Dashboard"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="noteboard" />
      <Dashboard />
    </Layout>
  )
}

export default IndexPage
