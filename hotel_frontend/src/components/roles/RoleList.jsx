import React, { useEffect, useState } from "react";
import {
  getAllRoles,
  createRole,
  deleteRole,
  removeAllUsersFromRole,
  removeUserFromRole,
  assignUserToRole,
} from "../utils/ApiFunctions";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [newRoleName, setNewRoleName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [userInputs, setUserInputs] = useState({}); // { roleId: userId }
  const [message, setMessage] = useState(""); // for assign/remove messages

  // ✅ Fetch all roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getAllRoles();
        setRoles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  // ✅ Create new role
  const handleCreateRole = async (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    try {
      const response = await createRole({ name: newRoleName });
      setSuccessMsg(`✅ ${response}`);
      setNewRoleName("");
      const updatedRoles = await getAllRoles();
      setRoles(updatedRoles);
      
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  // ✅ Delete role
  const handleDeleteRole = async (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await deleteRole(roleId);
        setRoles(roles.filter((r) => r.id !== roleId));
        setSuccessMsg("✅ Role deleted successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        setError(err.message);
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  // ✅ Remove all users from a role
  const handleRemoveAllUsers = async (roleId) => {
    if (window.confirm("Remove all users from this role?")) {
      try {
        await removeAllUsersFromRole(roleId);
        setSuccessMsg("✅ All users removed from role successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        setError(err.message);
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  // ✅ Remove specific user from role
  const handleRemoveUser = async (roleId) => {
    const userId = userInputs[roleId];
    if (!userId) return alert("Enter a user ID first.");
    try {
      await removeUserFromRole(userId, roleId);
      setMessage(`✅ User ${userId} removed from role successfully!`);
      setUserInputs({ ...userInputs, [roleId]: "" });
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // ✅ Assign specific user to role
  const handleAssignUser = async (roleId) => {
    const userId = userInputs[roleId];
    if (!userId) return alert("Enter a user ID first.");
    try {
      await assignUserToRole(userId, roleId);
      setMessage(`✅ User ${userId} assigned to role successfully!`);
      setUserInputs({ ...userInputs, [roleId]: "" });
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <h3 className="text-lg font-semibold text-gray-900">Manage Roles</h3>
        </div>
        <div className="text-muted">Total Roles: {roles.length}</div>
      </div>

      {/* ✅ Show messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success fade show">{successMsg}</div>}
      {message && <div className="alert alert-info fade show">{message}</div>}

      {/* Create Role Form */}
     <form onSubmit={handleCreateRole} className="mb-4 d-flex gap-2 align-items-center">
  <input
    type="text"
    className="form-control form-control-sm p-3"
    placeholder="Enter new role name"
    value={newRoleName}
    onChange={(e) => setNewRoleName(e.target.value)}
    style={{
      width: "1020px",
      fontSize: "18px", // makes input text larger
      padding: "14px",  // increases height a bit
    }}
  />
  <button
    type="submit"
    className="btn bg-green-500 rounded-2 p-3 fw-medium"
    style={{ width: "150px" }}
  >
    Create Role
  </button>
</form>

<style>
  {`
  input::placeholder {
    font-size: 18px; /* Increase placeholder size */
    color: #888;     /* Optional: make it a bit darker */
  }
  `}
</style>


      {/* Roles Table */}
      {loading ? (
        <div className="text-center py-4">
          <p>Loading roles...</p>
        </div>
      ) : roles.length === 0 ? (
        <div className="text-center py-4">
          <p>No roles available.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped rounded-3 overflow-hidden">
            <thead className="table-dark">
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Role Name</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td className="text-center align-middle">{role.id}</td>
                  <td className="text-center align-middle">{role.name}</td>
                  <td className="align-middle">
                    <div className="d-flex justify-content-between align-items-center">
                      {/* Search Input - Left Side */}
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control form-control-sm w"
                          placeholder="Enter user ID"
                          value={userInputs[role.id] || ""}
                          onChange={(e) =>
                            setUserInputs({ ...userInputs, [role.id]: e.target.value })
                          }
                          style={{ width: "710px" }}
                        />
                      </div>
                      
                      {/* All Buttons - Right Side */}
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleAssignUser(role.id)}
                        >
                          Assign
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleRemoveUser(role.id)}
                        >
                          Remove
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleRemoveAllUsers(role.id)}
                        >
                          Remove All
                        </button>
                      </div>
                    </div>
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

export default RoleList;