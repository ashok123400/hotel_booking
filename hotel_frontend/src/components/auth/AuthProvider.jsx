import React, { createContext, useState, useContext, useEffect } from "react"
import jwt_decode from "jwt-decode"

export const AuthContext = createContext({
	user: null,
	handleLogin: (token) => {},
	handleLogout: () => {}
})

export const AuthProvider = ({ children }) => {
	// Initialize user from localStorage token
	const [user, setUser] = useState(() => {
		const token = localStorage.getItem("token")
		if (token) {
			try {
				const decodedUser = jwt_decode(token)
				return decodedUser
			} catch (error) {
				console.error("Invalid token:", error)
				localStorage.removeItem("token")
				localStorage.removeItem("userId")
				localStorage.removeItem("userRole")
				return null
			}
		}
		return null
	})

	const handleLogin = (token) => {
		try {
			const decodedUser = jwt_decode(token)
			localStorage.setItem("userId", decodedUser.sub)
			localStorage.setItem("userRole", decodedUser.roles)
			localStorage.setItem("token", token)
			setUser(decodedUser)
		} catch (error) {
			console.error("Failed to decode token:", error)
		}
	}

	const handleLogout = () => {
		localStorage.removeItem("userId")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
