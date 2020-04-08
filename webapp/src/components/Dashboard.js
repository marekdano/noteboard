import React from "react"
import { useAuth } from "react-use-auth"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"

export const Dashboard = () => {
	const { data } = useQuery(gql`
    query {
      notes {
        content
      }
    }
  `)

  const { isAuthenticated, user } = useAuth()

  return (
    <div>
			{ isAuthenticated() ? 
				<>
					<p>
						Hello <strong>{user.nickname}</strong>, what note are you going to create
						today?
					</p>
					<p>Stick your ordinary note on the board.</p>
				</>
				: null
			}
			

			<h2>Public notes</h2>

			{ data && data.notes && data.notes.length ?
				<ul>
					{ data.notes.map((note, index) => (<li key={index}>{note.content}</li>)) }
				</ul> :
				<h5>No notes yet</h5>
			}

		</div>
  )
}