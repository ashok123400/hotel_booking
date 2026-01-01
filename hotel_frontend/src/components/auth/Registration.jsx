import React, { useState } from "react"
import { registerUser } from "../utils/ApiFunctions"
import { Link, useNavigate } from "react-router-dom"
import hotellogin from "../../assets/images/hotellogin.jpg"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Registration = () => {
	const [registration, setRegistration] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: ""
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [validationErrors, setValidationErrors] = useState({})
	const [passwordStrength, setPasswordStrength] = useState(0)
	const navigate = useNavigate()

	const calculatePasswordStrength = (password) => {
		let strength = 0
		if (password.length >= 6) strength += 1
		if (password.length >= 8) strength += 1
		if (/[A-Z]/.test(password)) strength += 1
		if (/[0-9]/.test(password)) strength += 1
		if (/[^A-Za-z0-9]/.test(password)) strength += 1
		return strength
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setRegistration({ ...registration, [name]: value })

		if (name === "password") {
			setPasswordStrength(calculatePasswordStrength(value))
		}

		if (validationErrors[name]) {
			setValidationErrors((prev) => ({
				...prev,
				[name]: "",
			}))
		}
	}

	const validateForm = () => {
		const errors = {}

		if (!registration.firstName.trim()) {
			errors.firstName = "First name is required"
		} else if (registration.firstName.trim().length < 2) {
			errors.firstName = "First name must be at least 2 characters"
		}

		if (!registration.lastName.trim()) {
			errors.lastName = "Last name is required"
		} else if (registration.lastName.trim().length < 2) {
			errors.lastName = "Last name must be at least 2 characters"
		}

		if (!registration.email) {
			errors.email = "Email is required"
		} else if (!/\S+@\S+\.\S+/.test(registration.email)) {
			errors.email = "Email is invalid"
		}

		if (!registration.password) {
			errors.password = "Password is required"
		} else if (registration.password.length < 6) {
			errors.password = "Password must be at least 6 characters"
		}

		if (!registration.confirmPassword) {
			errors.confirmPassword = "Please confirm your password"
		} else if (registration.password !== registration.confirmPassword) {
			errors.confirmPassword = "Passwords do not match"
		}

		setValidationErrors(errors)
		return Object.keys(errors).length === 0
	}

	const handleRegistration = async (e) => {
		e.preventDefault()

		if (!validateForm()) return

		try {
			const result = await registerUser(registration)
			setSuccessMessage(result)
			setErrorMessage("")
			setRegistration({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" })
			setPasswordStrength(0)
			
			// Navigate to login page after 2 seconds
			setTimeout(() => {
				navigate("/login")
			}, 2000)
			
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error: ${error.message}`)
		}
		setTimeout(() => {
			setErrorMessage("")
			setSuccessMessage("")
		}, 5000)
	}

	const getPasswordStrengthColor = () => {
		switch (passwordStrength) {
			case 0:
			case 1:
				return "text-red-500"
			case 2:
			case 3:
				return "text-yellow-500"
			case 4:
			case 5:
				return "text-green-500"
			default:
				return "text-gray-500"
		}
	}

	const getPasswordStrengthText = () => {
		switch (passwordStrength) {
			case 0:
			case 1:
				return "Weak"
			case 2:
			case 3:
				return "Medium"
			case 4:
			case 5:
				return "Strong"
			default:
				return ""
		}
	}

	const getProgressBarColor = () => {
		switch (passwordStrength) {
			case 0:
			case 1:
				return "bg-red-500"
			case 2:
			case 3:
				return "bg-yellow-500"
			case 4:
			case 5:
				return "bg-green-500"
			default:
				return "bg-gray-500"
		}
	}

	return (
		<div className="flex min-h-screen">
			{/* Left Side - Form Section */}
			<div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md mx-auto">
				<div className="w-full max-w-md p-8 mx-auto">
					{/* Brand Logo */}
					<div className="text-center">
						<h1 className="text-2xl font-bold text-blue-600 no-underline">
							Hotel Booking
						</h1>
					</div>

					{/* Title */}
					<h2 className="text-center font-bold text-2xl mb-1 mt-6">Create Account</h2>
					<p className="text-center text-gray-600 mb-6">
						Fill in your details to get started
					</p>

					{/* Error Message */}
					{errorMessage && (
						<div
							className="rounded mb-4 p-2"
							style={{
								backgroundColor: "rgba(220, 53, 69, 0.1)",
								border: "1px solid rgba(220, 53, 69, 0.3)",
								color: "#dc3545",
							}}
						>
							{errorMessage}
						</div>
					)}

					{/* Success Message */}
					{successMessage && (
						<div
							className="rounded mb-4 p-2"
							style={{
								backgroundColor: "rgba(25, 135, 84, 0.1)",
								border: "1px solid rgba(25, 135, 84, 0.3)",
								color: "#198754",
							}}
						>
							{successMessage}
						</div>
					)}

					{/* Form */}
					<form onSubmit={handleRegistration} className="text-left">
						{/* Name Fields in Two Columns */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
							<div>
								<label className="form-label font-semibold text-gray-700 block mb-2">
									First Name
								</label>
								<input
									name="firstName"
									placeholder="First name"
									value={registration.firstName}
									onChange={handleInputChange}
									className={`w-full p-2 border rounded ${
										validationErrors.firstName ? "border-red-500" : "border-gray-300"
									}`}
								/>
								{validationErrors.firstName && (
									<div className="text-red-500 text-sm mt-1 text-left">
										{validationErrors.firstName}
									</div>
								)}
							</div>
							<div>
								<label className="form-label font-semibold text-gray-700 block mb-2">
									Last Name
								</label>
								<input
									name="lastName"
									placeholder="Last name"
									value={registration.lastName}
									onChange={handleInputChange}
									className={`w-full p-2 border rounded ${
										validationErrors.lastName ? "border-red-500" : "border-gray-300"
									}`}
								/>
								{validationErrors.lastName && (
									<div className="text-red-500 text-sm mt-1 text-left">
										{validationErrors.lastName}
									</div>
								)}
							</div>
						</div>

						{/* Email */}
						<div className="mb-4">
							<label className="form-label font-semibold text-gray-700 block mb-2">
								Email Address
							</label>
							<input
								type="email"
								name="email"
								placeholder="Enter your email address"
								value={registration.email}
								onChange={handleInputChange}
								className={`w-full p-2 border rounded ${
									validationErrors.email ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{validationErrors.email && (
								<div className="text-red-500 text-sm mt-1 text-left">
									{validationErrors.email}
								</div>
							)}
						</div>

						{/* Password */}
						<div className="mb-4">
							<label className="form-label font-semibold text-gray-700 block mb-2">
								Password
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="Create a password"
									value={registration.password}
									onChange={handleInputChange}
									className={`w-full p-2 border rounded pr-12 ${
										validationErrors.password ? "border-red-500" : "border-gray-300"
									}`}
								/>
								<button
									type="button"
									className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3 text-gray-500"
									onClick={() => setShowPassword(!showPassword)}
									style={{ zIndex: 5 }}
								>
									{showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
								</button>
								{validationErrors.password && (
									<div className="text-red-500 text-sm mt-1 text-left">
										{validationErrors.password}
									</div>
								)}
							</div>

							{/* Password Strength Meter */}
							{registration.password && (
								<div className="mt-2">
									<div className="w-full bg-gray-200 rounded-full h-1.5">
										<div
											className={`h-1.5 rounded-full ${getProgressBarColor()}`}
											style={{ width: `${(passwordStrength / 5) * 100}%` }}
										></div>
									</div>
									<div className="text-gray-600 text-sm mt-1 text-left">
										Password strength:{" "}
										<span className={`${getPasswordStrengthColor()} font-medium`}>
											{getPasswordStrengthText()}
										</span>
									</div>
								</div>
							)}
						</div>

						{/* Confirm Password */}
						<div className="mb-6">
							<label className="form-label font-semibold text-gray-700 block mb-2">
								Confirm Password
							</label>
							<div className="relative">
								<input
									type={showConfirmPassword ? "text" : "password"}
									name="confirmPassword"
									placeholder="Confirm your password"
									value={registration.confirmPassword}
									onChange={handleInputChange}
									className={`w-full p-2 border rounded pr-12 ${
										validationErrors.confirmPassword ? "border-red-500" : "border-gray-300"
									}`}
								/>
								<button
									type="button"
									className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3 text-gray-500"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									style={{ zIndex: 5 }}
								>
									{showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
								</button>
								{validationErrors.confirmPassword && (
									<div className="text-red-500 text-sm mt-1 text-left">
										{validationErrors.confirmPassword}
									</div>
								)}
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-gray-800 text-white p-2 rounded  hover:bg-gray-900 transition-colors text-lg"
						>
							Register
						</button>
					</form>

					{/* Login Link */}
					<p className="text-center text-gray-600 mt-6 mb-0">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-blue-600 font-medium no-underline hover:underline"
						>
							Login here
						</Link>
					</p>
				</div>
			</div>

			{/* Right Side - Image Section */}
			<div
				className="hidden md:block md:w-1/2 relative overflow-hidden"
				style={{
					backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fit=crop&w=1200&q=80')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					minHeight: "100vh"
				}}
			>
				{/* Overlay Content */}
				<div
					className="absolute bottom-0 left-0 p-8 text-white"
					style={{ zIndex: 10 }}
				>
					<h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
					<p className="text-white/90 text-lg leading-relaxed max-w-md">
						Trusted by travelers worldwide for exceptional hotel experiences.
					</p>
				</div>
				{/* Gradient Overlay */}
				<div
					className="absolute top-0 left-0 w-full h-full"
					style={{
						background: "linear-gradient(transparent 60%, rgba(0,0,0,0.7))",
						zIndex: 1,
					}}
				/>
			</div>
		</div>
	)
}

export default Registration