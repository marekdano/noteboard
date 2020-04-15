import React, { useState } from "react"
import { useAuth } from "react-use-auth"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"

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
	
	const handleFormSection = (state = false) => {
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
							onClick={() => handleFormSection(true)}
						>
							Stick
						</span> your note on the board.
					</div>

					
					{isFormOpen && 
						<section className="mb-8 relative max-w-md">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="note-content">
        				Note
      				</label>
							<textarea 
								className="block w-5/6 h-20 mr-4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="note-content"
								placeholder="Enter your note" 
							/>
							<button className="shadow text-sm bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded" type="button">
        				Send
      				</button>
							<button 
								className="ml-2 shadow text-sm bg-red-500 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded" type="button"
								onClick={() => handleFormSection(false)}
							>
        				Cancel
      				</button>
							<span 
								className="absolute top-0 bottom-0 right-0 px-4 py-3 "
								aria-label="close form for adding notes" 
								onClick={() => handleFormSection(false)}
							>
    						<svg className="fill-current h-6 w-6 text-black-500 transition duration-100 ease-in-out transform hover:scale-125" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<title>Close</title>
									<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
								</svg>
  						</span>
						</section>
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
