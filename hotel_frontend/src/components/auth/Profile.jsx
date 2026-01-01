import React, { useEffect, useState } from "react"
import { deleteUser, getBookingsByUserId, getUser } from "../utils/ApiFunctions"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { User, Mail, Calendar, Key, Trash2, Home, List, Settings, Shield, Clock, MapPin } from "lucide-react"

const Profile = () => {
	const [user, setUser] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [{ id: "", name: "" }]
	})

	const [bookings, setBookings] = useState([])
	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [activeTab, setActiveTab] = useState("profile")
	const navigate = useNavigate()

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				setUser(userData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchUser()
	}, [userId])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getBookingsByUserId(userId, token)
				setBookings(response)
			} catch (error) {
				console.error("Error fetching bookings:", error.message)
				setErrorMessage(error.message)
			}
		}

		fetchBookings()
	}, [userId])

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete your account? This action cannot be undone."
		)
		if (confirmed) {
			await deleteUser(userId)
				.then((response) => {
					setMessage(response.data)
					localStorage.removeItem("token")
					localStorage.removeItem("userId")
					localStorage.removeItem("userRole")
					navigate("/")
					window.location.reload()
				})
				.catch((error) => {
					setErrorMessage(error.data)
				})
		}
	}

	// Stats cards data
	

	const getColorClasses = (color) => {
		const colors = {
			blue: "from-blue-500 to-cyan-500",
			green: "from-green-500 to-emerald-500",
			amber: "from-amber-500 to-orange-500",
			purple: "from-purple-500 to-pink-500"
		}
		return colors[color] || colors.amber
	}

	return (
		<div className="min-h-screen bg-gray-50 py-6 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-6">
					<div className="relative inline-block">
						<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
							Account Dashboard
						</h1>
						<div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
					</div>
					<p className="text-gray-600 mt-4">
						Welcome back, {user.firstName}! Manage your account and bookings.
					</p>
				</div>

				{/* Alert Messages */}
				{errorMessage && (
					<div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg mb-4 shadow-sm">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<Shield className="h-5 w-5 text-red-400" />
							</div>
							<div className="ml-3">
								<p className="text-sm text-red-700">{errorMessage}</p>
							</div>
						</div>
					</div>
				)}
				{message && (
					<div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-lg mb-4 shadow-sm">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<Shield className="h-5 w-5 text-green-400" />
							</div>
							<div className="ml-3">
								<p className="text-sm text-green-700">{message}</p>
							</div>
						</div>
					</div>
				)}

				{user ? (
					<div className="flex flex-col lg:flex-row gap-6">
						{/* Sidebar */}
						<div className="lg:w-1/4">
							<div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
								{/* Profile Summary */}
								<div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-center">
									<div className="relative inline-block">
										<img
											src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
											alt="Profile"
											className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto"
										/>
										<div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
											<div className="bg-green-500 rounded-full p-1">
												<div className="w-3 h-3 rounded-full bg-green-400"></div>
											</div>
										</div>
									</div>
									<h2 className="text-xl font-bold text-white mt-4">{user.firstName} {user.lastName}</h2>
									<p className="text-amber-100">{user.email}</p>
									<div className="mt-3">
										<span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
											{user.roles[0]?.name.replace("ROLE_", "")} Member
										</span>
									</div>
								</div>

								{/* Navigation Tabs */}
								<nav className="p-4">
									<ul className="space-y-2">
										{[
											{ id: "profile", label: "Profile Info", icon: User },
											{ id: "bookings", label: "My Bookings", icon: Calendar },
											{ id: "security", label: "Security", icon: Shield }
										].map((tab) => (
											<li key={tab.id}>
												<button
													onClick={() => setActiveTab(tab.id)}
													className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
														activeTab === tab.id
															? "bg-amber-50 text-amber-700 border-l-4 border-amber-500"
															: "text-gray-600 hover:bg-gray-50"
													}`}
												>
													<tab.icon className="w-5 h-5" />
													<span className="font-medium">{tab.label}</span>
												</button>
											</li>
										))}
									</ul>
								</nav>
							</div>

							{/* Stats Cards */}
							
						</div>

						{/* Main Content */}
						<div className="lg:w-3/4">
							{/* Profile Information */}
							{activeTab === "profile" && (
								<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
									<div className="flex items-center gap-2 mb-4">
										<Settings className="w-5 h-5 text-amber-500" />
										<h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
									</div>
									
									<div className="grid md:grid-cols-2 gap-4">
										{[
											{ label: "User ID", value: user.id, icon: Key },
											{ label: "First Name", value: user.firstName, icon: User },
											{ label: "Last Name", value: user.lastName, icon: User },
											{ label: "Email Address", value: user.email, icon: Mail }
										].map((field, index) => (
											<div key={index} className="space-y-1">
												<label className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
													<field.icon className="w-3 h-3" />
													{field.label}
												</label>
												<div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
													<p className="text-gray-900 font-medium text-sm">{field.value}</p>
												</div>
											</div>
										))}
									</div>

									{/* Roles Section */}
									<div className="mt-4">
										<label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
											Account Roles
										</label>
										<div className="flex flex-wrap gap-1">
											{user.roles.map((role) => (
												<span
													key={role.id}
													className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1"
												>
													<Shield className="w-3 h-3" />
													{role.name.replace("ROLE_", "")}
												</span>
											))}
										</div>
									</div>
								</div>
							)}

							{/* Bookings */}
							{activeTab === "bookings" && (
								<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-2">
											<Calendar className="w-5 h-5 text-amber-500" />
											<h2 className="text-xl font-bold text-gray-900">Booking History</h2>
										</div>
										<span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-semibold">
											{bookings.length} bookings
										</span>
									</div>

									{bookings.length > 0 ? (
										<div className="space-y-3">
											{bookings.map((booking, index) => (
												<div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-amber-300 transition-all duration-200">
													<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
														<div className="flex-1">
															<div className="flex items-center gap-2 mb-2">
																<div className="bg-amber-500 rounded-lg p-1">
																	<MapPin className="w-3 h-3 text-white" />
																</div>
																<div>
																	<h3 className="font-semibold text-gray-900 text-sm">{booking.room.roomType}</h3>
																	<p className="text-xs text-gray-500">Room #{booking.room.id}</p>
																</div>
															</div>
															<div className="grid grid-cols-2 gap-3 text-xs">
																<div>
																	<p className="text-gray-500">Check-in</p>
																	<p className="font-medium text-gray-900">
																		{moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
																	</p>
																</div>
																<div>
																	<p className="text-gray-500">Check-out</p>
																	<p className="font-medium text-gray-900">
																		{moment(booking.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
																	</p>
																</div>
															</div>
														</div>
														<div className="text-right">
															<div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold inline-block mb-1">
																● On-going
															</div>
															<p className="text-xs text-gray-500">Confirmation</p>
															<p className="font-mono font-semibold text-gray-900 text-sm">{booking.bookingConfirmationCode}</p>
														</div>
													</div>
												</div>
											))}
										</div>
									) : (
										<div className="text-center py-8">
											<Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
											<h3 className="text-base font-semibold text-gray-900 mb-1">No bookings yet</h3>
											<p className="text-gray-500 text-sm mb-4">Start your journey with us by making your first reservation.</p>
											<button
												onClick={() => navigate("/browse-all-rooms")}
												className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 text-sm"
											>
												Browse Available Rooms
											</button>
										</div>
									)}
								</div>
							)}

							{/* Security Tab */}
							{activeTab === "security" && (
								<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
									<div className="flex items-center gap-2 mb-4">
										<Shield className="w-5 h-5 text-amber-500" />
										<h2 className="text-xl font-bold text-gray-900">Account Security</h2>
									</div>
									
									<div className="space-y-4">
										<div className="bg-red-50 border border-red-200 rounded-lg p-4">
											<div className="flex items-start gap-3">
												<div className="bg-red-100 rounded-lg p-2">
													<Trash2 className="w-5 h-5 text-red-600" />
												</div>
												<div className="flex-1">
													<h3 className="text-base font-semibold text-red-900 mb-1">Delete Account</h3>
													<p className="text-red-700 text-sm mb-3">
														Once you delete your account, there is no going back. Please be certain.
													</p>
													<button
														onClick={handleDeleteAccount}
														className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
													>
														Delete My Account
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Action Buttons */}
							<div className="flex flex-wrap gap-3 mt-4">
								<button
									onClick={() => navigate("/")}
									className="flex items-center gap-1 bg-white text-gray-700 border border-gray-300 hover:border-amber-300 hover:bg-amber-50 font-semibold px-4 py-2 rounded-lg transition-all duration-200 text-sm"
								>
									<Home className="w-3 h-3" />
									Back to Home
								</button>
								
								
							</div>
						</div>
					</div>
				) : (
					<div className="text-center py-12">
						<div className="animate-pulse">
							<div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-12 rounded-xl max-w-md mx-auto shadow-xl">
								<div className="text-xl font-semibold">Loading your dashboard...</div>
								<div className="mt-3 h-1 bg-amber-400 rounded-full w-3/4 mx-auto"></div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Profile