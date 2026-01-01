import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../utils/ApiFunctions";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Delete user
  const handleDeleteUser = async (email) => {
    if (window.confirm(`Are you sure you want to delete user ${email}?`)) {
      try {
        await deleteUser(email);
        setUsers(users.filter((u) => u.email !== email));
        setSuccessMsg(`✅ User ${email} deleted successfully!`);

        // ⏳ Automatically clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);

      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <h3 className="text-lg font-semibold text-gray-900">Manage Users</h3>
        </div>
        <div className="text-muted">Total Users: {users.length}</div>
      </div>

      {/* ✅ Show messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success fade show">{successMsg}</div>}

      {loading ? (
        <div className="text-center py-4">
          <p>Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-4">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped rounded-3 overflow-hidden">
            <thead className="table-dark">
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="text-center align-middle">{user.id}</td>
                  <td className="text-center align-middle">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="text-center align-middle">{user.email}</td>
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(user.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
  