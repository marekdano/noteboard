import React, { useEffect } from "react"
import { useAuth } from 'react-use-auth'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

export function useUpdateUser(userId, username) {
	const [updateUser, { data }] = useMutation(
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
	
	return isAuthenticated() ? 
		<>
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={logout}>Logout</button>
			<p>Hello, { user.name }</p>
		</> : 
		<>
			<button onClick={login}>Login</button>
			<p>Hello, everybody</p>
		</>
}

export default LoginButton
