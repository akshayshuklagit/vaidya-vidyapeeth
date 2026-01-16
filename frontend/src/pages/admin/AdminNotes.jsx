import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  PlusIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../components/Modal";
import AddNoteForm from "../../components/forms/AddNoteForm";

const AdminNotes = () => {
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const resources = [];
  const NOTES_ENABLED = false;

  if (!NOTES_ENABLED) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <span className="text-6xl">📝</span>
        <h2 className="text-2xl font-semibold text-gray-900">
          Notes module not enabled yet
        </h2>
        <p className="text-gray-600 max-w-md">
          Notes management features will be available Later
        </p>

        <button
          disabled
          className="mt-4 bg-gray-300 text-gray-600 px-6 py-2 rounded-lg cursor-not-allowed"
        >
          Upload New Notes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Notes & Resources Management
          </h2>
          <p className="text-gray-600">Upload and manage course materials</p>
        </div>
        <button
          onClick={() => setShowAddNoteModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Upload Resource</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Resources
              </p>
              <p className="text-3xl font-bold text-gray-900">48</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Downloads
              </p>
              <p className="text-3xl font-bold text-green-600">2,847</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-3xl font-bold text-purple-600">156 MB</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💾</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-yellow-600">12</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ArrowUpTrayIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Upload New Resource
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drop files here or click to upload
          </p>
          <p className="text-gray-600 mb-4">
            Support for PDF, DOC, PPT files up to 10MB
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Choose Files
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Course</option>
              <option>Fundamentals of Ayurveda</option>
              <option>Panchakarma Therapy</option>
              <option>Herbal Medicine</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resource Type
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>PDF Document</option>
              <option>Presentation</option>
              <option>Worksheet</option>
              <option>Reference Material</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Resources</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Resource
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Course
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Type
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Size
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Downloads
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Uploaded
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr
                  key={resource.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <DocumentTextIcon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {resource.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {resource.course}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{resource.type}</td>
                  <td className="py-4 px-6 text-gray-600">{resource.size}</td>
                  <td className="py-4 px-6 text-gray-600">
                    {resource.downloads}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {resource.uploaded}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Note Modal */}
      <Modal
        isOpen={showAddNoteModal}
        onClose={() => setShowAddNoteModal(false)}
        title="Add New Resource"
        size="md"
      >
        <AddNoteForm
          onSubmit={(noteData) => {
            console.log("New note:", noteData);
            setShowAddNoteModal(false);
          }}
          onCancel={() => setShowAddNoteModal(false)}
        />
      </Modal>
    </div>
  );
};

export default AdminNotes;
