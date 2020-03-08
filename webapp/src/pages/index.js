import React from "react"
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import Layout from "../components/layout"
import SEO from "../components/seo"
import LoginButton from "../components/login-button"

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
