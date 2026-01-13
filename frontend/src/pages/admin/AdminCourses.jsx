import { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import Modal from "../../components/Modal";
import AddCourseForm from "../../components/forms/AddCourseForm";
import { useAdminCourses } from "../../hooks/useCourses";
import { FullScreenLoader } from "../../components/Loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminCourses = () => {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [deleteCourseId, setDeleteCourseId] = useState(null);

  const [editingCourse, setEditingCourse] = useState(null);
  const { courses, loading, error, createCourse, deleteCourse, updateCourse } =
    useAdminCourses();

  if (loading) return <FullScreenLoader />;
  if (error)
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;

  const publishedCourses = courses.filter(
    (c) => c.status === "published"
  ).length;
  const draftCourses = courses.filter((c) => c.status === "draft").length;
  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);

  const handleCreateCourse = async (courseData) => {
    try {
      await createCourse(courseData);
      setShowAddCourseModal(false);
      toast.success("New course added successfully.");
    } catch (err) {
      toast.error("Failed to create course.");
      console.error("Failed to create course:", err);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowEditCourseModal(true);
  };

  const handleUpdateCourse = async (courseData) => {
    try {
      await updateCourse(editingCourse._id, courseData);
      setShowEditCourseModal(false);
      setEditingCourse(null);
      toast.success("Course updated successfully.");
    } catch (err) {
      toast.error("Failed to update course.");
      console.error("Failed to update course:", err);
    }
  };

  const handleToggleStatus = async (courseId, currentStatus) => {
    try {
      const newStatus = currentStatus === "published" ? "draft" : "published";
      await updateCourse(courseId, { status: newStatus });
      toast.info(`Course is now ${newStatus}.`);
    } catch (err) {
      toast.error("Failed to update course status.");
      console.error("Failed to update course status:", err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      // await deleteCourse(deleteCourseId);
      toast.promise(deleteCourse(deleteCourseId), {
        loading: "Deleting course...",
        success: "Course deleted successfully",
        error: "Failed to delete course",
      });
      setDeleteCourseId(null);
    } catch (err) {
      toast.error("Failed to delete course.");
      console.error("Failed to delete course:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Course Management
          </h2>
          <p className="text-gray-600">Create, edit and manage all courses</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddCourseModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add New Course</span>
        </button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-3xl font-bold text-gray-900">
                {courses.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-3xl font-bold text-green-600">
                {publishedCourses}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Draft</p>
              <p className="text-3xl font-bold text-yellow-600">
                {draftCourses}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Students
              </p>
              <p className="text-3xl font-bold text-purple-600">
                {totalStudents}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
      </div>
      {/* Courses Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Courses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Course
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Course ID
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Price
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Students
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Status
                </th>
                {/* <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Created
                </th> */}
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">📖</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {course.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                      {course._id}
                    </code>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    ₹{course.price?.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{course.students}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        course.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Course"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleToggleStatus(course._id, course.status)
                        }
                        className={`p-2 rounded-lg transition-colors ${
                          course.status === "published"
                            ? "text-orange-600 hover:bg-orange-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                        title={
                          course.status === "published"
                            ? "Unpublish"
                            : "Publish"
                        }
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={() => setDeleteCourseId(course._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Course"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Course?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. The course{" "}
                              <strong>{course.title}</strong> will be
                              permanently removed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => setDeleteCourseId(null)}
                            >
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                              onClick={handleConfirmDelete}
                              disabled={!deleteCourseId}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Course Modal */}
      <Modal
        isOpen={showAddCourseModal}
        onClose={() => setShowAddCourseModal(false)}
        title="Add New Course"
        size="lg"
      >
        <AddCourseForm
          onSubmit={handleCreateCourse}
          onCancel={() => setShowAddCourseModal(false)}
        />
      </Modal>

      {/* Edit Course Modal */}
      <Modal
        isOpen={showEditCourseModal}
        onClose={() => {
          setShowEditCourseModal(false);
          setEditingCourse(null);
        }}
        title="Edit Course"
        size="lg"
      >
        <AddCourseForm
          initialData={editingCourse}
          onSubmit={handleUpdateCourse}
          onCancel={() => {
            setShowEditCourseModal(false);
            setEditingCourse(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default AdminCourses;
