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
import Header from "../../../components/dashboardComponent/Header";
import LeftsideNavbar from "../../../components/dashboardComponent/LeftsideNavbar";
import { IoIosAddCircleOutline } from "react-icons/io";

const initialJourneys = [
  {
    id: 1,
    type: "Adventure",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=48&h=48",
    vipAirportPickup: "Included",
    premiumHotel: "Yes",
    cityTourWithModel: "Available",
    returnTicket: "Round trip",
    dinnerWithModelInfo: "Gala Dinner",
  },
  {
    id: 2,
    type: "Safari",
    imageUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=48&h=48",
    vipAirportPickup: "Not Included",
    premiumHotel: "Standard Room",
    cityTourWithModel: "Not Available",
    returnTicket: "One way",
    dinnerWithModelInfo: "N/A",
  },
  {
    id: 3,
    type: "City Tour",
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48",
    vipAirportPickup: "Included",
    premiumHotel: "Luxury Suite",
    cityTourWithModel: "Available",
    returnTicket: "Round trip",
    dinnerWithModelInfo: "Private Dinner",
  },
];

export default function GoldenWinner() {
  const [journeys, setJourneys] = useState(initialJourneys);
  const [editId, setEditId] = useState(null); // null means add new
  const [editData, setEditData] = useState({
    type: "",
    image: null,
    imageUrl: "",
    vipAirportPickup: "",
    premiumHotel: "",
    cityTourWithModel: "",
    returnTicket: "",
    dinnerWithModelInfo: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Open add new modal
  function onAddNew() {
    setEditId(null);
    setEditData({
      type: "",
      image: null,
      imageUrl: "",
      vipAirportPickup: "",
      premiumHotel: "",
      cityTourWithModel: "",
      returnTicket: "",
      dinnerWithModelInfo: "",
    });
    setIsEditModalOpen(true);
  }

  // Open edit modal with data
  function onEdit(row) {
    setEditId(row.id);
    setEditData({
      type: row.type,
      image: null,
      imageUrl: row.imageUrl || "",
      vipAirportPickup: row.vipAirportPickup || "",
      premiumHotel: row.premiumHotel || "",
      cityTourWithModel: row.cityTourWithModel || "",
      returnTicket: row.returnTicket || "",
      dinnerWithModelInfo: row.dinnerWithModelInfo || "",
    });
    setIsEditModalOpen(true);
  }

  // Close edit modal and reset
  function onCancelEdit() {
    setIsEditModalOpen(false);
    setEditData({
      type: "",
      image: null,
      imageUrl: "",
      vipAirportPickup: "",
      premiumHotel: "",
      cityTourWithModel: "",
      returnTicket: "",
      dinnerWithModelInfo: "",
    });
    setEditId(null);
  }

  // Confirm edit or add
  function onConfirmEdit() {
    if (editId === null) {
      const newId = journeys.length ? Math.max(...journeys.map((j) => j.id)) + 1 : 1;
      setJourneys([
        ...journeys,
        {
          id: newId,
          ...editData,
        },
      ]);
    } else {
      setJourneys(
        journeys.map((j) =>
          j.id === editId ? { ...j, ...editData } : j
        )
      );
    }
    onCancelEdit();
  }

  // Image upload + preview
  function onImgChange(e) {
    const file = e.target.files[0];
    if (file && file.size < 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (evt) =>
        setEditData((prev) => ({ ...prev, image: file, imageUrl: evt.target.result }));
      reader.readAsDataURL(file);
    } else {
      alert("Max image size: 1MB");
    }
  }

  // Open delete modal
  function onDelete(row) {
    setDeleteId(row.id);
    setIsDeleteModalOpen(true);
  }

  // Confirm delete in modal
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
          <h1 className="text-3xl font-bold text-black mb-6">Journey</h1>
          <div className="flex justify-start items-center px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 max-w-36 mb-2 gap-1">
            <IoIosAddCircleOutline className="w-5 h-5" />
            <button onClick={onAddNew} className="text-end">
              Add Field
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="min-w-full border text-sm bg-white rounded shadow overflow-x-auto">
              <thead>
                <tr className="bg-gray-100 text-xs md:text-sm">
                  <th className="p-2 md:p-3 text-left">Type</th>
                  <th className="p-2 md:p-3 text-left">Image</th>
                  <th className="p-2 md:p-3 text-left">VIP Airport Pickup</th>
                  <th className="p-2 md:p-3 text-left">Premium Luxury Hotel</th>
                  <th className="p-2 md:p-3 text-left">City Tour with Model</th>
                  <th className="p-2 md:p-3 text-left">Re-Turn Ticket</th>
                  <th className="p-2 md:p-3 text-left">Dinner with Model Info</th>
                  <th className="p-2 md:p-3 text-left">Edit</th>
                  <th className="p-2 md:p-3 text-left">Delete</th>
                </tr>
              </thead>
              <tbody>
                {journeys.map((row) => (
                  <tr key={row.id} className="border-t hover:bg-gray-50 text-xs md:text-sm">
                    <td className="p-2 md:p-3">{row.type}</td>
                    <td className="p-2 md:p-3">
                      {row.imageUrl && (
                        <img
                          src={row.imageUrl}
                          alt={row.type}
                          className="md:w-12 md:h-12 w-10 h-10 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="p-2 md:p-3 truncate max-w-[120px]">{row.vipAirportPickup}</td>
                    <td className="p-2 md:p-3 truncate max-w-[120px]">{row.premiumHotel}</td>
                    <td className="p-2 md:p-3 truncate max-w-[120px]">{row.cityTourWithModel}</td>
                    <td className="p-2 md:p-3 truncate max-w-[120px]">{row.returnTicket}</td>
                    <td className="p-2 md:p-3 truncate max-w-[120px]">{row.dinnerWithModelInfo}</td>
                    <td className="p-2 md:p-3 space-x-1">
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-600 hover:underline bg-yellow-100 px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-2 md:p-3 space-x-1">
                      <button
                        onClick={() => onDelete(row)}
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

          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg p-3 md:p-6 md:w-full w-[90%] max-w-3xl relative max-h-[90vh] overflow-auto">
                <button
                  onClick={onCancelEdit}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
                  aria-label="Close edit form"
                >
                  ×
                </button>
                <h2 className="text-xl font-semibold mb-4">
                  {editId === null ? "Add Journey" : "Edit Journey"}
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onConfirmEdit();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block mb-1 font-medium">Type</label>
                    <input
                      type="text"
                      value={editData.type}
                      onChange={(e) => setEditData((prev) => ({ ...prev, type: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Image</label>
                    {editData.imageUrl && (
                      <img
                        src={editData.imageUrl}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded mb-2"
                      />
                    )}
                    <input type="file" accept="image/*" onChange={onImgChange} />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">VIP Airport Pickup</label>
                    <input
                      type="text"
                      value={editData.vipAirportPickup}
                      onChange={(e) => setEditData((prev) => ({ ...prev, vipAirportPickup: e.target.value }))}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Premium Luxury Hotel</label>
                    <input
                      type="text"
                      value={editData.premiumHotel}
                      onChange={(e) => setEditData((prev) => ({ ...prev, premiumHotel: e.target.value }))}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">City Tour with Model</label>
                    <input
                      type="text"
                      value={editData.cityTourWithModel}
                      onChange={(e) => setEditData((prev) => ({ ...prev, cityTourWithModel: e.target.value }))}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Re-Turn Ticket</label>
                    <input
                      type="text"
                      value={editData.returnTicket}
                      onChange={(e) => setEditData((prev) => ({ ...prev, returnTicket: e.target.value }))}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Dinner with Model Info</label>
                    <input
                      type="text"
                      value={editData.dinnerWithModelInfo}
                      onChange={(e) => setEditData((prev) => ({ ...prev, dinnerWithModelInfo: e.target.value }))}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Content</label>
                    <textarea
                      value={editData.content}
                      onChange={(e) => setEditData((prev) => ({ ...prev, content: e.target.value }))}
                      rows={4}
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
                <p className="mb-6">Are you sure you want to delete this journey section?</p>
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
