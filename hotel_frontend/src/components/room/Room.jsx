import React, { useEffect, useState } from "react"
import { getAllRooms } from "../utils/ApiFunctions"
import RoomCard from "./RoomCard"
import { Col, Container, Row } from "react-bootstrap"
import RoomFilter from "../common/RoomFilter"
import RoomPaginator from "../common/RoomPaginator"
import TouristRecommendations from "../common/TouristRecommendations"

const Room = () => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [roomsPerPage] = useState(6)
	const [filteredData, setFilteredData] = useState([{ id: "" }])
	const [selectedCity, setSelectedCity] = useState(null) // Track selected city for tourist recommendations

	useEffect(() => {
		setIsLoading(true)
		getAllRooms()
			.then((data) => {
				setData(data)
				setFilteredData(data)
				// Set initial city from first room if available
				if (data && data.length > 0 && data[0].city) {
					setSelectedCity(data[0].city)
				}
				setIsLoading(false)
			})
			.catch((error) => {
				setError(error.message)
				setIsLoading(false)
			})
	}, [])
	
	if (isLoading) {
		return <div>Loading rooms.....</div>
	}
	if (error) {
		return <div className=" text-danger">Error : {error}</div>
	}

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	// Get unique cities from available rooms
	const getUniqueCities = () => {
		const cities = filteredData
			.filter(room => room.city)
			.map(room => room.city)
		return [...new Set(cities)] // Remove duplicates
	}

	const uniqueCities = getUniqueCities()

	const totalPages = Math.ceil(filteredData.length / roomsPerPage)

	const renderRooms = () => {
		const startIndex = (currentPage - 1) * roomsPerPage
		const endIndex = startIndex + roomsPerPage
		return filteredData
			.slice(startIndex, endIndex)
			.map((room) => <RoomCard key={room.id} room={room} />)
	}

	return (
		<Container>
			<Row>
				<Col md={6} className="mb-3 mb-md-0">
					<RoomFilter data={data} setFilteredData={setFilteredData} />
				</Col>

				<Col md={6} className="d-flex align-items-center justify-content-end">
					<RoomPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>

			<Row>{renderRooms()}</Row>

			<Row>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<RoomPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>

			{/* Tourist Recommendations Section - Dynamic based on room city */}
			{selectedCity && uniqueCities.length > 0 && (
				<Row className="mt-5 pt-5">
					<Col lg={12}>
						<div className="mb-4">
							<h2 className="text-center mb-4">
								🗺️ Explore Attractions in {selectedCity}
							</h2>
							
							{/* City selector if multiple cities available */}
							{uniqueCities.length > 1 && (
								<div className="text-center mb-4">
									{uniqueCities.map((city) => (
										<button
											key={city}
											onClick={() => setSelectedCity(city)}
											className={`btn me-2 ${
												selectedCity === city
													? 'btn-primary'
													: 'btn-outline-primary'
											}`}
										>
											{city}
										</button>
									))}
								</div>
							)}
						</div>
						
						{/* Display tourist places for selected city */}
						<TouristRecommendations city={selectedCity} />
					</Col>
				</Row>
			)}
		</Container>
	)
}

export default Room
