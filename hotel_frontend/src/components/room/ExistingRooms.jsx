import React, { useEffect, useState } from "react"
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions"
import RoomFilter from "../common/RoomFilter"
import RoomPaginator from "../common/RoomPaginator"
import { FaEdit, FaEye, FaPlus, FaTrashAlt, FaHome } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

const ExistingRooms = () => {
	const [rooms, setRooms] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [roomsPerPage] = useState(8)
	const [loading, setLoading] = useState(true)
	const [filteredRooms, setFilteredRooms] = useState([])
	const [selectedRoomType, setSelectedRoomType] = useState("")
	const [error, setError] = useState("")
	const [successMsg, setSuccessMsg] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		fetchRooms()
	}, [])

	const fetchRooms = async () => {
		setLoading(true)
		try {
			const result = await getAllRooms()
			setRooms(result)
			setFilteredRooms(result)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (selectedRoomType === "") {
			setFilteredRooms(rooms)
		} else {
			const filtered = rooms.filter((room) => room.roomType === selectedRoomType)
			setFilteredRooms(filtered)
		}
		setCurrentPage(1)
	}, [rooms, selectedRoomType])

	const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const handleDelete = async (roomId) => {
		if (window.confirm(`Are you sure you want to delete room ${roomId}?`)) {
			try {
				const result = await deleteRoom(roomId)
				if (result === "") {
					setSuccessMsg(`✅ Room ${roomId} deleted successfully!`)
					fetchRooms()
				} else {
					setError(`❌ Error deleting room: ${result.message}`)
				}
			} catch (err) {
				setError(err.message)
			}
			setTimeout(() => {
				setSuccessMsg("")
				setError("")
			}, 3000)
		}
	}

	const calculateTotalPages = (filteredRooms, roomsPerPage) => {
		const totalRooms = filteredRooms.length
		return Math.ceil(totalRooms / roomsPerPage)
	}

	const indexOfLastRoom = currentPage * roomsPerPage
	const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
	const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

	return (
		<div className="container mt-4">
			{/* Header Section */}
			 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold text-gray-800">View All Bookings</h1>
							<p className="text-gray-600 mt-1">Manage all your Bookings in this inventory</p>
						</div>
				<div className="text-muted">Total Rooms: {filteredRooms.length}</div>
			</div>

			{/* Alert Messages */}
			{error && <div className="alert alert-danger">{error}</div>}
			{successMsg && <div className="alert alert-success fade show">{successMsg}</div>}

			{/* Controls Section */}
			<div className="row mb-4">
				<div className="col-md-6 d-flex align-items-center">
					<RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
				</div>
				<div className="col-md-6 d-flex justify-content-end align-items-center">
					<div className="d-flex gap-2">
						<Link 
							to={"/admin"} 
							className="btn btn-outline-primary btn-sm d-flex align-items-center px-3 py-2"
						>
							<FaHome className="me-2" />
							Home
						</Link>
						<Link 
							to={"/admin/add-room"} 
							className="btn btn-primary btn-sm d-flex align-items-center px-3 py-2 shadow-sm"
						>
							<FaPlus className="me-2" />
							Add Room
						</Link>
					</div>
				</div>
			</div>

			{/* Loading State */}
			{loading ? (
				<div className="text-center py-4">
					<p>Loading rooms...</p>
				</div>
			) : currentRooms.length === 0 ? (
				<div className="text-center py-4">
					<p>No rooms found.</p>
				</div>
			) : (
				<>
					{/* Rooms Table */}
					<div className="table-responsive">
						<table className="table table-bordered table-striped rounded-3 overflow-hidden">
							<thead className="table-dark">
								<tr>
									<th className="text-center">ID</th>
									<th className="text-center">Room Type</th>
									<th className="text-center">Room Price</th>
									<th className="text-center">Actions</th>
								</tr>
							</thead>
							<tbody>
								{currentRooms.map((room) => (
									<tr key={room.id}>
										<td className="text-center align-middle fw-bold text-primary">#{room.id}</td>
										<td className="text-center align-middle text-capitalize">
											{room.roomType}
										</td>
										<td className="text-center align-middle">
											<span className="fw-bold text-success">
  ₹{room.roomPrice}
</span>
											<span className="text-muted ms-1">/day</span>
										</td>
										<td className="text-center align-middle">
											<div className="d-flex justify-content-center gap-2">
												<Link 
													to={`/admin/edit-room/${room.id}`} 
													className="btn btn-warning btn-sm 	 d-flex align-items-center px-3 py-2 fw-medium shadow-sm"
												>
													<FaEdit className="me-2" />
													Edit
												</Link>
												<button
													className="btn btn-danger btn-sm d-flex align-items-center px-3 py-2 fw-medium shadow-sm"
													onClick={() => handleDelete(room.id)}>
													<FaTrashAlt className="me-2" />
													Delete
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					{filteredRooms.length > roomsPerPage && (
						<div className="d-flex justify-content-center mt-4">
							<RoomPaginator
								currentPage={currentPage}
								totalPages={calculateTotalPages(filteredRooms, roomsPerPage)}
								onPageChange={handlePaginationClick}
							/>
						</div>
					)}
				</>
			)}
		</div>
	)
} 

export default ExistingRooms