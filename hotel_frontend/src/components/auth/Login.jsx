import React, { useState } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({
		email: "",
		password: ""
	})
	const [showPassword, setShowPassword] = useState(false)
	const [validationErrors, setValidationErrors] = useState({})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setLogin({ ...login, [name]: value })

		if (validationErrors[name]) {
			setValidationErrors((prev) => ({
				...prev,
				[name]: "",
			}))
		}
	}

	const validateForm = () => {
		const errors = {}

		if (!login.email) {
			errors.email = "Email is required"
		} else if (!/\S+@\S+\.\S+/.test(login.email)) {
			errors.email = "Email is invalid"
		}

		if (!login.password) {
			errors.password = "Password is required"
		} else if (login.password.length < 4) {
			errors.password = "Password must be at least 6 characters"
		}

		setValidationErrors(errors)
		return Object.keys(errors).length === 0
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!validateForm()) return

		const success = await loginUser(login)
		if (success) {
			const token = success.token
			const userRole = success.roles ? success.roles.toString().toUpperCase() : ""
			
			auth.handleLogin(token)
			
			// Check if user is admin and redirect to admin dashboard
			if (userRole === "ROLE_ADMIN") {
				navigate("/admin", { replace: true })
			} else {
				navigate(redirectUrl, { replace: true })
			}
		} else {
			setErrorMessage("Invalid username or password. Please try again.")
		}
		setTimeout(() => {
			setErrorMessage("")
		}, 4000)
	}

	return (
		<div className="flex bg-white h-[650px]">
			{/* Left Side - Image Section */}
			<div
				className="d-none d-lg-block col-lg-6 position-relative overflow-hidden"
				style={{
					backgroundImage: `url('https://www.brides.com/thmb/JcdtVSFkiDT_FojuI32P0SQlrss=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/37-redwoods-outdoor-chapel-wedding-reception-dance-floor-ryan-ray-0524-65f65fcbd02f49e789f42482b59e8749.JPG')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				{/* Overlay Gradient */}
				<div
					className="position-absolute w-100 h-100"
					style={{
						background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
						zIndex: 10,
					}}
				></div>

				{/* Overlay Content */}
				<div
					className="position-absolute bottom-0 start-0 p-5 text-white"
					style={{ zIndex: 20, maxWidth: "500px" }}
				>
					<h3 className="display-5 fw-bold mb-3">Welcome Back</h3>
					<p className="fs-5" style={{ opacity: 0.9 }}>
						Trusted by thousands to manage events that inspire and impress.
					</p>
				</div>
			</div>

			{/* Right Side - Login Form */}
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center md:p-12 mt-8">
				<div className="w-full max-w-md bg-transparent p-8 rounded-lg border shadow-sm mx-auto">
					{/* Brand Logo */}
					<div className="text-center">
						<h1 className="text-2xl font-bold text-blue-600 no-underline">
							Hotel Booking
						</h1>
					</div>

					{/* Welcome Message */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							Hey there!
						</h2>
						<p className="text-gray-600">
							Enter your email and password to login
						</p>
					</div>

					{/* Error Message */}
					{errorMessage && (
						<div
							className="rounded-lg mb-4 p-3"
							style={{
								backgroundColor: "rgba(220, 53, 69, 0.1)",
								border: "1px solid rgba(220, 53, 69, 0.3)",
								color: "#dc3545",
							}}
						>
							{errorMessage}
						</div>
					)}

					{/* Login Form */}
					<form onSubmit={handleSubmit}>
						{/* Email Field */}
						<div className="mb-4">
							<label className="fw-semibold text-dark text-left mb-2 block">
								Email
							</label>
							<input
								type="email"
								name="email"
								placeholder="Enter your email address"
								value={login.email}
								onChange={handleInputChange}
								className={`w-full p-2 border rounded ${
									validationErrors.email ? "border-red-500" : "border-gray-300"
								}`}
								style={{ fontSize: "1rem" }}
							/>
							{validationErrors.email && (
								<div className="text-red-500 text-sm mt-1">
									{validationErrors.email}
								</div>
							)}
						</div>

						{/* Password Field */}
						<div className="mb-4">
							<label className="fw-semibold text-left text-dark mb-2 block">
								Password
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="Enter your password"
									value={login.password}
									onChange={handleInputChange}
									className={`w-full p-2 border rounded pr-12 ${
										validationErrors.password ? "border-red-500" : "border-gray-300"
									}`}
									style={{ fontSize: "1rem" }}
								/>
								<button
									type="button"
									className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3"
									onClick={() => setShowPassword(!showPassword)}
									style={{
										color: "#6c757d",
										zIndex: 5,
									}}
								>
									{showPassword ? (
										<FaEyeSlash size={20} />
									) : (
										<FaEye size={20} />
									)}
								</button>
								{validationErrors.password && (
									<div className="text-red-500 text-sm mt-1">
										{validationErrors.password}
									</div>
								)}
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-gray-800 text-white p-2 rounded  mb-4 hover:bg-gray-900 transition-colors"
							style={{ fontSize: "1.0rem" }}
						>
							Sign In
						</button>
					</form>

					{/* Register Link */}
					<div className="text-center">
						<p className="text-muted">
							Don't have an account?{" "}
							<Link
								to="/register"
								className="no-underline fw-semibold hover:underline"
								style={{ color: "#0d6efd" }}
								state={{ from: location.state?.from }}
							>
								Register
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login