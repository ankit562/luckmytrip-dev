import {
  Home,
  Search,
  ShoppingCart,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Users,
  FileText,
  Settings,
  BarChart3,
  MenuIcon,
  Plus,
} from "lucide-react";
import React, { useState } from "react";
import Header from "../../components/dashboardComponent/Header";
import LeftsideNavbar from "../../components/dashboardComponent/LeftsideNavbar";
import { IoIosAddCircleOutline } from "react-icons/io";

const initialJourneys = [
  {
    id: 1,
    fullname: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "123 Main St, City",
    isActive: "Active",
    tickets: 100,
  },
  {
    id: 2,
    fullname: "Jane Smith",
    email: "jane@example.com",
    phone: "0987654321",
    address: "456 Oak Ave, Town",
    isActive: "Notactive",
    tickets: 50,
  },
];

export default function Client() {
  const [journeys, setJourneys] = useState(initialJourneys);
  const [editId, setEditId] = useState(null); // null means add new
  const [editData, setEditData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    isActive: "Active",
    tickets: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Open add new modal
  function onAddNew() {
    setEditId(null);
    setEditData({
      fullname: "",
      email: "",
      phone: "",
      address: "",
      isActive: "Active",
      tickets: "",
    });
    setIsEditModalOpen(true);
  }

  // Open edit modal with data
  function onEdit(row) {
    setEditId(row.id);
    setEditData({
      fullname: row.fullname,
      email: row.email,
      phone: row.phone,
      address: row.address,
      isActive: row.isActive,
      tickets: row.tickets,
    });
    setIsEditModalOpen(true);
  }

  // Close edit modal and reset
  function onCancelEdit() {
    setIsEditModalOpen(false);
    setEditData({
      fullname: "",
      email: "",
      phone: "",
      address: "",
      isActive: "Active",
      tickets: "",
    });
    setEditId(null);
  }

  // Confirm edit or add
  function onConfirmEdit() {
    if (editId === null) {
      // Add new
      const newId = journeys.length ? Math.max(...journeys.map((j) => j.id)) + 1 : 1;
      setJourneys([
        ...journeys,
        {
          id: newId,
          fullname: editData.fullname,
          email: editData.email,
          phone: editData.phone,
          address: editData.address,
          isActive: editData.isActive,
          tickets: editData.tickets,
        },
      ]);
    } else {
      // Update existing
      setJourneys(
        journeys.map((j) =>
          j.id === editId
            ? {
                ...j,
                fullname: editData.fullname,
                email: editData.email,
                phone: editData.phone,
                address: editData.address,
                isActive: editData.isActive,
                tickets: editData.tickets,
              }
            : j
        )
      );
    }
    onCancelEdit();
  }

  // Input change handler
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Open delete modal
  function onDelete(row) {
    setDeleteId(row.id);
    setIsDeleteModalOpen(true);
  }

  // Confirm delete
  function confirmDelete() {
    setJourneys(journeys.filter((j) => j.id !== deleteId));
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  }

  // Cancel delete modal
  function cancelDelete() {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftsideNavbar />

        <main className="flex flex-col md:px-10 px-4 py-8 bg-blue-50 min-h-0 w-full">
          <h1 className="text-3xl font-bold text-black mb-6">Trip Information</h1>
          <div className="flex justify-start items-center px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 max-w-36 mb-2 gap-1 cursor-pointer" onClick={onAddNew}>
            <IoIosAddCircleOutline className="w-5 h-5" />
            <span>Add Field</span>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="min-w-full border text-sm bg-white rounded shadow overflow-x-auto">
              <thead>
                <tr className="bg-gray-100 text-sm md:text-base">
                  <th className="p-3 text-left">Fullname</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone No.</th>
                  <th className="p-3 text-left">Address</th>
                  <th className="p-3 text-left">Is Active</th>
                  <th className="p-3 text-left">Tickets</th>
                  <th className="p-3 text-left">Edit</th>
                  <th className="p-3 text-left">Delete</th>
                </tr>
              </thead>
              <tbody>
                {journeys.map((row) => (
                  <tr key={row.id} className="border-t hover:bg-gray-50">
                    <td className="md:p-3 p-2">{row.fullname}</td>
                    <td className="md:p-3 p-2">{row.email}</td>
                    <td className="md:p-3 p-2">{row.phone}</td>
                    <td className="md:p-3 p-2">{row.address}</td>
                    <td className="md:p-3 p-2">{row.isActive}</td>
                    <td className="md:p-3 p-2">{row.tickets}</td>
                    <td className="p-3 space-x-1">
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-600 hover:underline bg-yellow-100 px-2 py-1"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-3 space-x-1 ">
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-600 hover:underline bg-red-100 px-2 py-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg p-3 md:p-6 md:w-full w-[90%] max-w-md relative">
                <button
                  onClick={onCancelEdit}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
                  aria-label="Close edit form"
                >
                  ×
                </button>
                <h2 className="text-xl font-semibold mb-4">
                  {editId === null ? "Add Trip Info" : "Edit Trip Info"}
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onConfirmEdit();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block mb-1 font-medium">Fullname</label>
                    <input
                      type="text"
                      name="fullname"
                      value={editData.fullname}
                      onChange={onInputChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={onInputChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Phone No.</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={onInputChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={editData.address}
                      onChange={onInputChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Is Active</label>
                    <select
                      name="isActive"
                      value={editData.isActive}
                      onChange={onInputChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="Active">Active</option>
                      <option value="Notactive">Notactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Tickets</label>
                    <input
                      type="number"
                      name="tickets"
                      value={editData.tickets}
                      onChange={onInputChange}
                      required
                      min={0}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
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

          {/* Delete Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg md:p-6 p-3 md:w-full w-[90%] max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Delete Confirmation</h2>
                <p className="mb-6">Are you sure you want to delete this journey?</p>
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
