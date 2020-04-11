import React from "react"
import { useAuth } from "react-use-auth"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"

export const Dashboard = () => {
	const { data } = useQuery(gql`
    query {
      notes {
				noteId
        content
      }
    }
  `)

  const { isAuthenticated, user } = useAuth()

  return (
    <>
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
			
			<main className="flex content-start flex-wrap p-4 border-8 border-red-800 notes">
				{ data && data.notes && data.notes.length &&
					data.notes.map((note, index) => (
						<div
							key={note.noteId}
							className={`
								m-2 w-40 h-40 bg-pink-400 shadow-md border border-gray-400 
								transform ${index % 2 && '-rotate-3'} cursor-pointer
								hover:scale-100 hover:rotate-3
							`}
						>
							<div className="w-5 h-5 rounded-lg mt-1 mx-auto shadow-md pin"></div>
							<div
								className="p-4"
							>
								{note.content}
							</div>
						</div>
						
					))
				}
			</main>
		</>
  )
}
