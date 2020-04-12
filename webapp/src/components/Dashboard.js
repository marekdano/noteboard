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
						today? <span>Stick</span> your note on the board.
					</p>
					<p></p>
				</>
				: null
			}
			
			<main className="flex content-start flex-wrap p-4 border-8 border-red-800 notes">
				{ data && data.notes && data.notes.length &&
					data.notes.map((note, index) => (
						<div
							key={note.noteId}
							className={`
								m-2 w-40 h-40 bg-red-200 shadow-md border border-gray-400 
								transform ${index % 2 && '-rotate-3'} cursor-pointer
								${index % 3 === 0 && 'bg-blue-200'}
								hover:scale-100 hover:rotate-3
							`}
						>
							<div 
								className={`
									w-5 h-5 rounded-lg mt-1 mx-auto shadow-md 
									${index % 2 ? 'pin1' : 'pin2'}
								`}
							/>
							<div
								className="p-4 note"
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
