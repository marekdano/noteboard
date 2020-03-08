import React, { useEffect } from "react"
import { useAuth } from 'react-use-auth'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

export function useUpdateUser(userId) {
	const [updateUser, { data }] = useMutation(
		gql`
			mutation updateUser($userId: String) {
				updateUser(userId: $userId) {
					userId
				}
			}
		`,
		{
			variables: {
				userId
			}
		}
	)

	useEffect(() => {
		userId && updateUser()
	}, [userId])
}

const LoginButton = () => {
	const { isAuthenticated, user, userId, login, logout } = useAuth()
	useUpdateUser(userId)
	
	return isAuthenticated() ? 
		<>
			<button onClick={logout}>Logout</button>
			<p>Hello, { user.name }</p>
		</> : 
		<>
			<button onClick={login}>Login</button>
			<p>Hello, everybody</p>
		</>
}

export default LoginButton
