import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useNavigate, useParams } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { FiHome, FiX, FiEdit } from "react-icons/fi";

const EditRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setRoom({ ...room, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRoom({ ...room, photo: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom({
          photo: null,
          roomType: roomData.roomType || "",
          roomPrice: roomData.roomPrice || "",
        });
        setImagePreview(roomData.photo || "");
      } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching room details");
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        setSuccessMessage("Room updated successfully!");
        const updatedRoom = await getRoomById(roomId);
        setRoom({
          photo: null,
          roomType: updatedRoom.roomType || "",
          roomPrice: updatedRoom.roomPrice || "",
        });
        setImagePreview(updatedRoom.photo || "");
        setErrorMessage("");
        setTimeout(() => {
          navigate("/admin/manage-rooms");
        }, 1000);
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 min-w-0 transition-all duration-300">
        {/* Main Content Container */}
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Edit Room</h1>
              <p className="text-gray-600 mt-1">Update room details</p>
            </div>
            <Link 
              to={"/admin/manage-rooms"} 
              className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <FiX className="mr-2" />
              Back to Rooms
            </Link>
          </div>

          {/* Alert Messages */}
          {successMessage && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errorMessage}
            </div>
          )}

          {/* Edit Room Form */}
          <div className="bg-white rounded-xl shadow-lg sm:p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
              <FiEdit className="mr-2 text-blue-600" />
              Edit Room Details
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Room Type */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Room Type</label>
                  <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-colors">
                    <div className="relative">
                      <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                      <div className="pl-10 pr-3 py-2.5">
                        <RoomTypeSelector
                          handleRoomInputChange={handleRoomInputChange}
                          newRoom={room}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Room Price */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Room Price (₹)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 text-base font-semibold">
                      ₹
                    </span>
                    <input
                      required
                      type="number"
                      name="roomPrice"
                      id="roomPrice"
                      value={room.roomPrice}
                      onChange={handleRoomInputChange}
                      placeholder="150.00"
                      min="0"
                      className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

              </div>

              {/* Room Photo */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Room Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    name="photo"
                    id="photo"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <label htmlFor="photo" className="cursor-pointer">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={
                            room.photo instanceof File
                              ? imagePreview
                              : `data:image/jpeg;base64,${imagePreview}`
                          }
                          alt="Room Preview"
                          className="mx-auto rounded-lg shadow-md"
                          style={{ 
                            maxWidth: "100%", 
                            maxHeight: "300px",
                            objectFit: "cover"
                          }}
                        />
                        <p className="text-sm text-green-600 font-medium">
                          ✅ Photo selected. Click to change.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <FiEdit className="text-2xl text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Change room photo
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/admin/manage-rooms")}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg flex items-center justify-center"
                >
                  <FiEdit className="mr-2" />
                  Update Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;