import { useState } from "react";

function CreateContentForm({ onCancel, onSubmit, initialData }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    tickets: initialData?.tickets || "",
    drawDate: initialData?.drawDate || "",
    banner: null,
    category: initialData?.category || "Offers",
    status: initialData?.status || "Draft"
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setForm((prev) =>
      type === "file" ? { ...prev, [name]: files[0] } : { ...prev, [name]: value }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <input name="title" placeholder="Name" value={form.title} onChange={handleChange} required className="border rounded w-full px-2 py-1" />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border rounded w-full px-2 py-1" />
      <div className="grid grid-cols-2 gap-4">
        <input name="price" placeholder="Price (₹)" type="number" min="0" value={form.price} onChange={handleChange} required className="border rounded w-full px-2 py-1" />
        <input name="tickets" placeholder="Total Tickets" type="number" min="0" value={form.tickets} onChange={handleChange} required className="border rounded w-full px-2 py-1" />
      </div>
      <input name="drawDate" type="date" value={form.drawDate} onChange={handleChange} required className="border rounded w-full px-2 py-1" />
      <input name="banner" type="file" accept="image/*" onChange={handleChange} className="w-full" />
      <select name="category" value={form.category} onChange={handleChange} className="border rounded w-full px-2 py-1">
        <option>Offers</option>
        <option>Events</option>
        <option>Updates</option>
      </select>
      <select name="status" value={form.status} onChange={handleChange} className="border rounded w-full px-2 py-1">
        <option>Draft</option>
        <option>Published</option>
        <option>Archived</option>
      </select>
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-1 rounded border">Cancel</button>
        <button type="submit" className="bg-purple-600 text-white px-4 py-1 rounded">Submit</button>
      </div>
    </form>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow max-w-3xl w-full p-6 relative">
        <button
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &#10005;
        </button>
        {children}
      </div>
    </div>
  );
}

export default function MyContentEmpty() {
  const [contents, setContents] = useState([]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const [deleteModalData, setDeleteModalData] = useState(null);

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const openEditModal = (content) => setEditModalData(content);
  const closeEditModal = () => setEditModalData(null);

  const openDeleteModal = (content) => setDeleteModalData(content);
  const closeDeleteModal = () => setDeleteModalData(null);

  // Add content handler
  const handleCreateSubmit = (formData) => {
    const newContent = {
      id: Date.now(),
      ...formData,
      banner: formData.banner ? URL.createObjectURL(formData.banner) : null
    };
    setContents(prev => [newContent, ...prev]);
    closeCreateModal();
  };

  // Edit content handler
  const handleEditSubmit = (formData) => {
    setContents(prev =>
      prev.map(item =>
        item.id === editModalData.id
          ? { ...item, ...formData, banner: formData.banner ? URL.createObjectURL(formData.banner) : item.banner }
          : item
      )
    );
    closeEditModal();
  };

  // Delete content handler
  const handleDeleteConfirm = () => {
    setContents(prev => prev.filter(item => item.id !== deleteModalData.id));
    closeDeleteModal();
  };

  return (
    <section className="p-6 m-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className=" text-base md:text-2xl font-semibold">My Content</h2>
        <button
          onClick={openCreateModal}
          className="bg-purple-600 hover:bg-purple-700 text-white  text-xs md:text-lg font-medium md:px-6 md:py-2 px-3 py-1 rounded-lg transition"
        >
          Create New Content
        </button>
      </div>

      {contents.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[250px]">
          <span className="text-6xl mb-3" role="img" aria-label="file">📝</span>
          <p className="text-lg text-gray-600 mb-4 text-center">
            You haven't created any content yet
          </p>
          <button
            onClick={openCreateModal}
            className="bg-purple-600 hover:bg-purple-700 text-white  px-3 py-2 :md:px-6 md:py-2 rounded-lg  text-sm md:text-base font-semibold"
          >
            Create Your First Content
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {["Name", "Tickets", "Price", "Description", "Image", "Date", "Status", "Category", "Edit" , "Delete"].map(col => (
                  <th key={col} className="text-left p-3 border-b border-gray-300 whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contents.map(({ id, title, tickets, price, description, banner, drawDate, status, category }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-300">{title}</td>
                  <td className="p-3 border-b border-gray-300">{tickets}</td>
                  <td className="p-3 border-b border-gray-300">₹{price}</td>
                  <td className="p-3 border-b border-gray-300 max-w-xs truncate" title={description}>{description}</td>
                  <td className="p-3 border-b border-gray-300">
                    {banner ? (
                      <img src={banner} alt="banner" className="h-12 w-20 object-cover rounded" />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-3 border-b border-gray-300">{drawDate}</td>
                  <td className="p-3 border-b border-gray-300">{status}</td>
                  <td className="p-3 border-b border-gray-300">{category}</td>
                  <td className="p-3 border-b border-gray-300">

                    <button onClick={() => openEditModal(contents.find(c => c.id === id))} className="text-blue-600 ">Edit</button>
                    
                  </td>
                  <td className="p-3 border-b border-gray-300">
                     <button onClick={() => openDeleteModal(contents.find(c => c.id === id))} className="text-red-600 ">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Content Modal */}
      {createModalOpen && (
        <Modal onClose={closeCreateModal}>
          <CreateContentForm onSubmit={handleCreateSubmit} onCancel={closeCreateModal} />
        </Modal>
      )}

      {/* Edit Content Modal */}
      {editModalData && (
        <Modal onClose={closeEditModal}>
          <CreateContentForm initialData={editModalData} onSubmit={handleEditSubmit} onCancel={closeEditModal} />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalData && (
        <Modal onClose={closeDeleteModal}>
          <div>
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete "{deleteModalData.title}"?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={closeDeleteModal} className="px-4 py-2 rounded border hover:bg-gray-100">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
