import React, { useState } from "react"
import { useAuth } from "react-use-auth"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"
import NoteForm from "./NoteForm"

export const Dashboard = () => {
	const [isFormOpen, setIsFormOpen] = useState(false)

	const { data } = useQuery(gql`
    query {
      notes {
				noteId
        content
      }
    }
  `)

	const { isAuthenticated, user } = useAuth()

	const handleToOpenFormSection = (state = false) => {
		setIsFormOpen(state)
	}
	
  return (
    <>
			{ isAuthenticated() ? 
				<>
					<div className="mb-3">
						Hello <strong>{user.nickname}</strong>, what note are you going to create
						today?
						<span 
							className="ml-1 underline text-blue-600 font-semibold cursor-pointer hover:text-blue-800" 
							onClick={() => handleToOpenFormSection(true)}
						>
							Stick
						</span> your note on the board.
					</div>

					
					{isFormOpen && 
						<NoteForm isFormOpen={isFormOpen} handleToOpenFormSection={handleToOpenFormSection}/>
					}
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
