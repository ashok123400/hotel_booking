import axios from "axios"

export const api = axios.create({
	baseURL: "http://localhost:9192"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

/* This function adds a new room room to the database */
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData()
  formData.append("photo", photo)
  formData.append("roomType", roomType)
  formData.append("roomPrice", roomPrice)

  const token = localStorage.getItem("token")

  const response = await api.post("/rooms/add/new-room", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Let Axios automatically set multipart/form-data
    },
  })

  if (response.status === 201) {
    return true
  } else {
    return false
  }
}


/* This function gets all room types from thee database */
export async function getRoomTypes() {
	try {
		const response = await api.get("/rooms/room/types")
		return response.data
	} catch (error) {
		throw new Error("Error fetching room types")
	}
}
/* This function gets all rooms from the database */
export async function getAllRooms() {
	try {
		const result = await api.get("/rooms/all-rooms")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}
}

/* This function deletes a room by the Id */
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}
}
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  if (roomData.roomType) formData.append("roomType", roomData.roomType);
  if (roomData.roomPrice) formData.append("roomPrice", roomData.roomPrice);
  if (roomData.photo) formData.append("photo", roomData.photo);

  const token = localStorage.getItem("token"); // your JWT token

  return await api.put(`/rooms/update/${roomId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`, // important!
    },
  });
}

/* This funcction gets a room by the id */
export async function getRoomById(roomId) {
	try {
		const result = await api.get(`/rooms/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

/* This function saves a new booking to the databse */
export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking room : ${error.message}`)
		}
	}
}

/* This function gets alll bokings from the database */
export async function getBookingsByUserEmail(email, token) {
    try {
        const response = await api.get(`/bookings/user/${email}/bookings`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error fetching bookings by user email: " + error.message);
    }
}

export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`, {
			headers: getHeader()   // <-- add this
		})
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`, {
			headers: getHeader()   // <-- add this
		})
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}

/* This function gets all availavle rooms from the database with a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}

/* This function register a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}

/* This function login a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}

export async function getAllRoles() {
  try {
    const response = await api.get("/roles/all-roles")
    return response.data
  } catch (error) {
    throw new Error("Error fetching roles: " + error.message)
  }
}

// ✅ 2. Create a new role
export async function createRole(roleData) {
  try {
    const response = await api.post("/roles/create-new-role", roleData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error("Role already exists");
    }
    throw new Error("Error creating role: " + error.message);
  }
}

// ✅ 3. Delete a role by ID
export async function deleteRole(roleId) {
  try {
    const response = await api.delete(`/roles/delete/${roleId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting role: " + error.message);
  }
}

// ✅ 4. Remove all users from a role
export async function removeAllUsersFromRole(roleId) {
  try {
    const response = await api.post(`/roles/remove-all-users-from-role/${roleId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error removing users from role: " + error.message);
  }
}

// ✅ 5. Remove a specific user from a role
export async function removeUserFromRole(userId, roleId) {
  try {
    const response = await api.post(`/roles/remove-user-from-role`, null, {
      params: { userId, roleId },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error removing user from role: " + error.message);
  }
}

// ✅ 6. Assign a user to a role
export async function assignUserToRole(userId, roleId) {
  try {
    const response = await api.post(`/roles/assign-user-to-role`, null, {
      params: { userId, roleId },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error assigning user to role: " + error.message);
  }
}

export async function getAllUsers() {
  try {
    const response = await api.get("/users/all");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
}
 
/* This function registers a new admin */
export async function registerAdmin(registration) {
	try {
		const response = await api.post("/auth/register-admin", registration);
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data);
		} else {
			throw new Error(`Admin registration error: ${error.message}`);
		}
	}
}
