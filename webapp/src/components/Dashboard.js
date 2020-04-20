import React, { useState, useEffect } from "react"
import { useAuth } from "react-use-auth"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"
import NoteForm from "./NoteForm"

export const Dashboard = () => {
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [notes, setNotes] = useState([])

	const { data } = useQuery(gql`
    query {
      notes {
				user {
					userId
					username
				}
				noteId
        content
      }
    }
	`)

	useEffect(() => {
		if (data) {
			setNotes(data.notes)
		}
	}, [data])

	const { isAuthenticated, user, userId } = useAuth()

	const handleToOpenFormSection = (state = false) => {
		setIsFormOpen(state)
	}
	
	const addCreatedNote = (note = null) => {
		if (note) {
			setNotes([note, ...notes])
			setIsFormOpen(false)
		}
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
						<NoteForm 
							userId={userId}
							isFormOpen={isFormOpen} 
							handleToOpenFormSection={handleToOpenFormSection} 
							addCreatedNote={addCreatedNote}
						/>
					}
				</>
				: null
			}
			
			<main className="flex content-start flex-wrap p-3 border-8 border-red-800 notes">
				{ notes && notes.map((note, index) => (
						<div
							key={note.noteId}
							className={` m-2 w-40 h-40 bg-red-200 shadow-md border border-gray-400 px-4 transform ${index % 2 && '-rotate-3'} cursor-pointer ${index % 3 === 0 && 'bg-blue-200'} hover:scale-100 hover:rotate-3`}
						>
							<div 
								className={`
									w-5 h-5 rounded-lg mt-1 mx-auto shadow-md 
									${index % 2 ? 'pin1' : 'pin2'}
								`}
							/>
							<div className="note">
								{note.content}
							</div>
							<div>
								{note.user.username}
							</div>
						</div>
					))
				}
			</main>
		</>
  )
}
