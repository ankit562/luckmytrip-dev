import React, { useState } from "react";
import { Home, Search, ShoppingCart, Bell, User, ChevronDown, LogOut, Users, FileText, Settings, BarChart3, MenuIcon } from 'lucide-react';
import Header from '../../../components/dashboardComponent/Header';
import LeftsideNavbar from '../../../components/dashboardComponent/LeftsideNavbar';

export default function SuperAdmin() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editAdminData, setEditAdminData] = useState(null);

  // Simulated admins data
  const [admins, setAdmins] = useState([
    { id: 1, name: "Super Admin", email: "superadmin@example.com", type: "SUPERADMIN", phone: "1234567890", address: "N/A" },
    { id: 2, name: "Admin User", email: "admin@example.com", type: "ADMIN", phone: "0987654321", address: "N/A" },
    { id: 3, name: "Admin User", email: "admin@example.com", type: "ADMIN", phone: "0987654321", address: "N/A" },
    { id: 4, name: "Admin User", email: "admin@example.com", type: "ADMIN", phone: "0987654321", address: "N/A" }
  ]);

  const handleEditClick = (admin) => {
    setEditAdminData(admin);
    setShowEditModal(true);
  };

  const handleDeleteClick = (admin) => {
    setEditAdminData(admin);
    setShowDeleteModal(true);
  };

  // Add new admin
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAdmin = {
      id: Date.now(),
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"), // captured password on add
      type: formData.get("type"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };
    setAdmins((prev) => [...prev, newAdmin]);
    setShowAddModal(false);
  };

  // Update admin
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedAdmin = {
      id: editAdminData.id,
      name: formData.get("name"),
      email: formData.get("email"),
      type: formData.get("type"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };

    const password = formData.get("password");
    if (password) {
      updatedAdmin.password = password; // update password only if provided
    } else {
      updatedAdmin.password = editAdminData.password; // keep old password if no change
    }

    setAdmins((prev) => prev.map(adm => (adm.id === updatedAdmin.id ? updatedAdmin : adm)));
    setShowEditModal(false);
  };

  // Delete admin
  const handleDeleteConfirm = () => {
    setAdmins((prev) => prev.filter(adm => adm.id !== editAdminData.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftsideNavbar />
        <main className="flex flex-col md:px-10 px-1 py-8 bg-blue-50 min-h-0 w-full">
          <section className="bg-white rounded-xl shadow md:p-6 md:m-6 p-1 m-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-2xl font-semibold">Super Admin</h2>
              <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-sm md:text-base text-white 
              font-semibold px-3 md:px-6 py-1 md:py-2 rounded-lg hover:bg-blue-700 transition">
                Add
              </button>
            </div>
            {/* Responsive grid */}
            <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
              {admins.map(admin => (
                <div key={admin.id} className="bg-white rounded-lg border p-1 md:p-5 flex items-center gap-5">
                  <div className="md:w-12 md:h-12 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm md:text-lg font-bold">
                    {admin.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="md:text-lg text-sm font-bold mb-0.5">{admin.name}</div>
                    <div className="text-gray-600 mb-2 text-xs md:text-sm">{admin.email}</div>
                    <div className="text-gray-600 mb-2 text-xs md:text-sm">{admin.address}</div>
                    <span className={`inline-block px-1.5 md:px-3 py-[2px] md:py-1 rounded-lg text-xs font-semibold ${admin.type === "SUPERADMIN" ? "bg-purple-200 text-purple-700" : "bg-blue-200 text-blue-700"}`}>
                      {admin.type}
                    </span>
                  </div>
                  <div className="flex gap-3 ml-auto">
                    <span
                      className="text-blue-600 font-medium cursor-pointer hover:underline text-xs md:text-sm lg:text-lg"
                      onClick={() => handleEditClick(admin)}
                    >
                      Edit
                    </span>
                    <span
                      className="text-red-500 font-medium cursor-pointer hover:underline  text-xs md:text-sm lg:text-lg"
                      onClick={() => handleDeleteClick(admin)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Add Admin Modal */}
          {showAddModal && (
            <Modal title="Add Super Admin" onClose={() => setShowAddModal(false)}>
              <AdminForm onSubmit={handleAddSubmit} />
            </Modal>
          )}

          {/* Edit Admin Modal */}
          {showEditModal && editAdminData && (
            <Modal title="Edit Super Admin" onClose={() => setShowEditModal(false)}>
              <AdminForm onSubmit={handleEditSubmit} admin={editAdminData} />
            </Modal>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && editAdminData && (
            <Modal title="Confirm Delete" onClose={() => setShowDeleteModal(false)}>
              <p>Are you sure you want to delete {editAdminData.name}?</p>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

// Modal Component (Unchanged)
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow max-w-lg w-full p-6 relative">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          &#10005;
        </button>
        {children}
      </div>
    </div>
  );
}

// AdminForm with Password Field included
function AdminForm({ onSubmit, admin }) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 font-semibold" htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          defaultValue={admin?.name || ""}
          type="text"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          defaultValue={admin?.email || ""}
          type="email"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required={!admin}
          placeholder={admin ? "Leave blank to keep existing password" : ""}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          defaultValue={admin?.address || ""}
          type="text"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          defaultValue={admin?.type || "ADMIN"}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="ADMIN">Admin</option>
          <option value="SUPERADMIN">Super Admin</option>
          <option value="Content-Creator">Content Creator</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="phone">Phone No.</label>
        <input
          id="phone"
          name="phone"
          defaultValue={admin?.phone || ""}
          type="tel"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="md:col-span-2 text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
