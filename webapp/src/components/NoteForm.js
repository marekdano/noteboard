import React, { useState } from 'react'

const NoteForm = ({isFormOpen, handleToOpenFormSection}) => {
	return isFormOpen ? (
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
				onClick={() => handleToOpenFormSection(false)}
			>
				Cancel
			</button>
			<span 
				className="absolute top-0 bottom-0 right-0 px-4 py-3 "
				aria-label="close form for adding notes" 
				onClick={() => handleToOpenFormSection(false)}
			>
				<svg className="fill-current h-6 w-6 text-black-500 transition duration-100 ease-in-out transform hover:scale-125" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					<title>Close</title>
					<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
				</svg>
			</span>
		</section>
	) : null
}

export default NoteForm
