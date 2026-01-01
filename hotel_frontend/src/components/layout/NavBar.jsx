import React, { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import Logout from "../auth/Logout"
import { useAuth } from "../auth/AuthProvider"

const NavBar = () => {
	const [showAccount, setShowAccount] = useState(false)

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}
	const { user } = useAuth()
	const isLoggedIn = localStorage.getItem("token")
	const userRole = localStorage.getItem("userRole")
	const userName = localStorage.getItem("userName") || "User"

	// Determine circle icon based on user role
	const getAccountIcon = () => {
		if (isLoggedIn && userRole === "ROLE_ADMIN") {
			return (
				<div className="account-circle admin-circle me-2">
					<span className="circle-letter">A</span>
				</div>
			)
		} else if (isLoggedIn) {
			return (
				<div className="account-circle user-circle me-2">
					<span className="circle-letter">U</span>
				</div>
			)
		} else {
			return (
				<i className="fas fa-user-circle me-2" style={{ fontSize: "1.2rem" }}></i>
			)
		}
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white px-5 shadow-sm sticky-top border-b border-gray-100">
			<div className="container-fluid">
				{/* Brand Logo */}
				<Link to={"/"} className="navbar-brand fw-bold">
					<span className="hotel-color text-3xl font-light tracking-tight">
						Jolly Hotel
					</span>
				</Link>

				{/* Navigation Links */}
				<div className="d-flex align-items-center">
					<ul className="navbar-nav d-flex flex-row align-items-center">
						{/* Navigation Items */}
						<li className="nav-item me-6">
							<NavLink 
								className="nav-link fw-medium" 
								to={"/browse-all-rooms"}
								style={({ isActive }) => ({
									color: isActive ? "#f59e0b" : "#374151",
									textDecoration: 'none',
									fontSize: '1rem'
								})}
							>
								Browse Rooms
							</NavLink>
						</li>

						{isLoggedIn && userRole === "ROLE_ADMIN" && (
							<li className="nav-item me-6">
								<NavLink 
									className="nav-link fw-medium" 
									to={"/admin"}
									style={({ isActive }) => ({
										color: isActive ? "#f59e0b" : "#374151",
										textDecoration: 'none',
										fontSize: '1rem'
									})}
								>
									Admin
								</NavLink>
							</li>
						)}

						<li className="nav-item me-6">
							<NavLink 
								className="nav-link fw-medium" 
								to={"/find-booking"}
								style={({ isActive }) => ({
									color: isActive ? "#f59e0b" : "#374151",
									textDecoration: 'none',
									fontSize: '1rem'
								})}
							>
								Find Booking
							</NavLink>
						</li>

						{/* Account Section */}
						{isLoggedIn ? (
							// Logged In - Dropdown
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle d-flex align-items-center"
									href="#"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded={showAccount}
									onClick={handleAccountClick}
									style={{ 
										textDecoration: "none",
										color: "#374151",
										fontWeight: "500",
										fontSize: '1rem'
									}}
								>
									{getAccountIcon()}
									{(isLoggedIn && userRole === "ROLE_ADMIN") ? "Admin" : userName || "User"}
								</a>

								<ul 
									className={`dropdown-menu dropdown-menu-end ${showAccount ? "show" : ""}`}
									style={{ 
										minWidth: "200px",
										border: "none",
										boxShadow: "0 10px 25px rgba(245, 158, 11, 0.15)",
										borderRadius: "12px",
										overflow: "hidden"
									}}
								>
									<li>
										<div className="dropdown-header text-gray-800 px-4 py-3 bg-amber-50">
											<strong className="text-sm">
												Welcome, {user.sub} 
											</strong>
										</div>
									</li>
									<li><hr className="dropdown-divider my-0" /></li>
									<li className="px-2 py-1">
										<Logout />
									</li>
								</ul>
							</li>
						) : (
							// Not Logged In - Sign In Button
							<li className="nav-item">
								<Link 
									className="btn px-5 py-2 fw-semibold transition-all duration-300 transform hover:-translate-y-0.5"
									to={"/login"}
									style={{
										background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
										border: "none",
										borderRadius: "8px",
										color: "white",
										textDecoration: "none",
										boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
										fontSize: '1rem'
									}}
								>
									Sign In
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>

			{/* Add some custom styles */}
			<style jsx>{`
				.hotel-color {
					background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}
				
				.dropdown-menu {
					border: 1px solid rgba(245, 158, 11, 0.1) !important;
				}
				
				.dropdown-item {
					transition: all 0.3s ease;
					padding: 0.75rem 1rem;
				}
				
				.dropdown-item:hover {
					background-color: #fef3c7;
					color: #d97706;
				}

				.btn:hover {
					box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4) !important;
					transform: translateY(-1px);
				}

				.nav-link {
					position: relative;
				}

				.nav-link:not(.dropdown-toggle)::after {
					content: '';
					position: absolute;
					width: 0;
					height: 2px;
					bottom: -2px;
					left: 0;
					
					transition: width 0.3s ease;
				}

				.nav-link:not(.dropdown-toggle):hover::after {
					width: 100%;
				}

				/* Account Circle Styles - Hover removed */
				.account-circle {
					width: 36px;
					height: 36px;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: bold;
					font-size: 0.9rem;
					color: white;
					/* Removed transition and hover effects */
				}

				.admin-circle {
					background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
					box-shadow: 0 4px 8px rgba(220, 38, 38, 0.3);
				}

				.user-circle {
					background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
					box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
				}

				.circle-letter {
					font-size: 1rem;
					font-weight: 700;
				}

				/* Active state for nav items */
				.nav-link[style*="color: #f59e0b"]::after {
					width: 100%;
				}
			`}</style>
		</nav>
	)
}

export default NavBar