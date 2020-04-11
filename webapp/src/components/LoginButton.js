import React, { useEffect } from "react"
import { useAuth } from "react-use-auth"
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

export function useUpdateUser(userId, username) {
	const [updateUser] = useMutation(
		gql`
			mutation updateUser($userId: String, $username: String) {
				updateUser(userId: $userId, username: $username) {
					userId,
					username
				}
			}
		`,
		{
			variables: {
				userId,
				username
			}
		}
	)

	useEffect(() => {
		userId && updateUser()
	}, [userId])
}

const LoginButton = () => {
	const { isAuthenticated, user, userId, login, logout } = useAuth()
	useUpdateUser(userId, user.name)
	
	return isAuthenticated() ? (
		<>
		<button 
			className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded" 
			onClick={logout}
		>
			Logout
		</button>
		
	</>
	) : (
		<>
			<button 
				className="bg-transparent hover:bg-blue-500 text-white text-sm font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
				onClick={login}
			>
				Login to add a note
			</button>
		</>
	) 
}

export default LoginButton
