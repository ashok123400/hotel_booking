import MainHeader from "../layout/MainHeader"
import HotelService from "../common/HotelService"
import RoomCarousel from "../common/RoomCarousel"
import { useLocation, Link } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"


const Home = () => {
	const location = useLocation()
	const message = location.state && location.state.message
	const { user } = useAuth()

	// Extract role name
	const userRole = user?.roles ? user.roles.toString().toUpperCase() : null

	return (
		<section>
			<>
					<MainHeader />
					<div className="container">
						{/* You can include RoomSearch if needed */}
						<RoomCarousel />
						<HotelService />
					</div>
				</>

			{/* 🌟 ADMIN SECTION */}
			
		</section>
	)
}

export default Home
