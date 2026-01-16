import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import api from "../../utils/api";
import { showSuccess, showError } from "../../utils/toast";
import RichTextEditor from "../../components/RichTextEditor";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Fundamentals",
    tags: "",
    status: "draft",
  });
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs/admin/all");
      setBlogs(res.data.data);
    } catch (error) {
      showError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("excerpt", formData.excerpt);
    data.append("content", formData.content);
    data.append("category", formData.category);
    data.append("tags", JSON.stringify(formData.tags.split(",").map(t => t.trim())));
    data.append("status", formData.status);
    if (thumbnail) data.append("thumbnail", thumbnail);

    try {
      if (editingBlog) {
        await api.put(`/blogs/admin/${editingBlog._id}`, data);
        showSuccess("Blog updated successfully");
      } else {
        await api.post("/blogs/admin", data);
        showSuccess("Blog created successfully");
      }
      setShowModal(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      showError(error.response?.data?.error || "Failed to save blog");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;
    try {
      await api.delete(`/blogs/admin/${id}`);
      showSuccess("Blog deleted");
      fetchBlogs();
    } catch (error) {
      showError("Failed to delete blog");
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags.join(", "),
      status: blog.status,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Fundamentals",
      tags: "",
      status: "draft",
    });
    setThumbnail(null);
    setEditingBlog(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          New Blog
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="px-6 py-4">{blog.title}</td>
                <td className="px-6 py-4">{blog.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4">{blog.views}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => handleEdit(blog)} className="text-blue-600 hover:text-blue-800">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-800">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold mb-4">{editingBlog ? "Edit Blog" : "Create Blog"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="2"
                  maxLength="200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(html) => setFormData({ ...formData, content: html })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option>Fundamentals</option>
                    <option>Nutrition</option>
                    <option>Wellness</option>
                    <option>Herbs</option>
                    <option>Lifestyle</option>
                    <option>Diagnosis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Ayurveda, Health, Wellness"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingBlog ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
