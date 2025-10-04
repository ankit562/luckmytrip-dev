import React, { useEffect, useState } from "react";
import Header from "../../components/dashboardComponent/Header";
import LeftsideNavbar from "../../components/dashboardComponent/LeftsideNavbar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchProfile,
  getAllProfile,
  deleteUser,
  UpdateProfile,
  signupUser
} from "../../features/auth/authUserSlice";
import toast from "react-hot-toast";

export default function Client() {
  const dispatch = useDispatch();
  const {
    user,
    loading: authLoading,
    isInitialized,
    users,
    loading,
    error,
  } = useSelector((state) => state.auth);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    password: "",   // ✅ required for signup
    phone: "",
    address: "",
    ticket: "",
    role: "client",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (isInitialized && !user && !authLoading) {
      dispatch(fetchProfile());
    }
  }, [isInitialized, user, authLoading, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getAllProfile());
    }
  }, [user, dispatch]);

  // Filter for clients only
  const clientUsers = users?.filter((u) => u.role === "client") || [];

  // Open Add Modal
  const onAddNew = () => {
    setEditId(null);
    setEditData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      ticket: "",
      role: "", // ✅ added
    });

    setIsEditModalOpen(true);
  };

  // Open Edit Modal and populate data
  const onEdit = (client) => {
    setEditId(client._id);
    setEditData({
      fullname: client.fullName || "",
      email: client.email || "",
      phone: client.phone || "",
      address: client.address || "",
      ticket: client.ticket || "",
      role: client.role || "client", // ✅ added
    });
    setIsEditModalOpen(true);
  };


  // Close modal & reset
  const onCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      ticket: "",
      role: "", 
    });

    setEditId(null);
  };

  // Handle input field change
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit add or update
  const onConfirmEdit = async () => {
    try {
      if (editId === null) { 

        await dispatch(signupUser(editData)).unwrap();
        toast.success("Client added successfully!");
        // As createUser thunk is not provided, you can implement similarly
      } else {
        ;
        await dispatch(UpdateProfile({ id: editId, userData: editData })).unwrap();

        toast.success("Client updated successfully!");
      }
      onCancelEdit();
      dispatch(getAllProfile());
      console.log(user)
    } catch (err) {
      toast("Failed to save: " + err.message);
    }
  };

  // Open delete modal
  const onDelete = (client) => {
    setDeleteId(client._id);
    setIsDeleteModalOpen(true);
  };

  // Cancel delete modal
  const cancelDelete = () => {
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await dispatch(deleteUser(deleteId)).unwrap();
      cancelDelete();
      dispatch(getAllProfile());
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftsideNavbar user={user} />
        <main className="flex flex-col md:px-10 px-4 py-8 bg-blue-50 min-h-0 w-full">
          <h1 className="text-xl md:text-3xl font-bold text-black mb-6">Client Information</h1>

          <div
            className="flex justify-start items-center px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 md:max-w-36 max-w-32 mb-2 gap-1 cursor-pointer"
            onClick={onAddNew}
          >
            <IoIosAddCircleOutline className="w-5 h-5" />
            <span className="text-sm md:text-base">Add Field</span>
          </div>

          {loading ? (
            <p>Loading clients...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : clientUsers.length === 0 ? (
            <p>No data</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="min-w-full border text-sm bg-white rounded shadow overflow-x-auto">
                <thead>
                  <tr className="bg-gray-100 text-sm md:text-base">
                    <th className="p-3 text-left">Fullname</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone No.</th>
                    <th className="p-3 text-left">Address</th>
                    <th className="p-3 text-left">Tickets</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Edit</th>
                    <th className="p-3 text-left">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {clientUsers.map((c) => (
                    <tr key={c._id} className="border-t hover:bg-gray-50">
                      <td className="md:p-3 p-2">{c.fullName}</td>
                      <td className="md:p-3 p-2">{c.email}</td>
                      <td className="md:p-3 p-2">{c.phone}</td>
                      <td className="md:p-3 p-2">{c.address}</td>
                      <td className="md:p-3 p-2">{c.ticket}</td>
                      <td className="md:p-3 p-2">{c.role}</td>

                      <td className="p-3 space-x-1">
                        <button
                          onClick={() => onEdit(c)}
                          className="text-blue-600 hover:underline bg-yellow-100 px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="p-3 space-x-1">
                        <button
                          onClick={() => onDelete(c)}
                          className="text-red-600 hover:underline bg-red-100 px-2 py-1 rounded"
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

          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg p-6 md:w-full w-[90%] max-w-md relative">
                <button
                  onClick={onCancelEdit}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
                  aria-label="Close edit form"
                >
                  ×
                </button>
                <h2 className="text-xl font-semibold mb-4">
                  {editId === null ? "Add Client" : "Edit Client"}
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onConfirmEdit();
                  }}
                  className="space-y-4"
                >
                  {/* Auto-generated input fields */}
                  {["fullName", "email", "phone", "address", "ticket"].map((field) => (
                    <div key={field}>
                      <label className="block mb-1 font-medium">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        name={field}
                        type={
                          field === "email"
                            ? "email"
                            : field === "ticket"
                              ? "number"
                              : "text"
                        }
                        value={editData[field]}
                        onChange={onInputChange}
                        min={field === "tickets" ? 0 : undefined}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  ))}
                  {editId === null && (
                    <div>
                      <label className="block mb-1 font-medium">Password</label>
                      <input
                        name="password"
                        type="password"
                        value={editData.password}
                        onChange={onInputChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  )}

                  {/* ✅ Add this Role Select field here */}
                  <div>
                    <label className="block mb-1 font-medium">Role</label>
                    <select
                      name="role"
                      value={editData.role || ""}
                      onChange={onInputChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select a role</option>
                      <option value="superadmin">superadmin</option>
                      <option value="admin">admin</option>
                      <option value="content-creator">content-creator</option>
                      <option value="client">client</option>
                    </select>
                  </div>

                  {/* Submit / Cancel buttons */}
                  <div className="flex justify-end space-x-3">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      {editId === null ? "Add" : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={onCancelEdit}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg md:p-6 p-3 md:w-full w-[90%] max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Delete Confirmation</h2>
                <p className="mb-6">Are you sure you want to delete this client?</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
