import { useState, useEffect } from "react";

const AddCourseForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    sanskritName: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    price: "",
    originalPrice: "",
    instructor: { name: "", title: "" },
    icon: "",
    thumbnail: null,
    features: [""],
    syllabus: [{ module: "", topics: [""], duration: "" }],
    tags: [""],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        sanskritName: initialData.sanskritName || "",
        description: initialData.description || "",
        category: initialData.category || "",
        level: initialData.level || "",
        duration: initialData.duration || "",
        price: initialData.price || "",
        originalPrice: initialData.originalPrice || "",
        instructor: {
          name: initialData.instructor?.name || "",
          title: initialData.instructor?.title || "",
        },
        icon: initialData.icon || "",
        thumbnail: initialData.thumbnail || null,
        thumbnailPreview: initialData?.thumbnail?.url || "",

        features: initialData.features?.length ? initialData.features : [""],
        syllabus: initialData.syllabus?.length
          ? initialData.syllabus
          : [{ module: "", topics: [""], duration: "" }],
        tags: initialData.tags?.length ? initialData.tags : [""],
      });
    }
  }, [initialData]);

  const categories = [
    "Foundation",
    "Therapy",
    "Herbalism",
    "Nutrition",
    "Clinical",
  ];
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const addSyllabusModule = () => {
    setFormData((prev) => ({
      ...prev,
      syllabus: [...prev.syllabus, { module: "", topics: [""], duration: "" }],
    }));
  };

  const removeSyllabusModule = (index) => {
    setFormData((prev) => ({
      ...prev,
      syllabus: prev.syllabus.filter((_, i) => i !== index),
    }));
  };

  const updateSyllabusModule = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      syllabus: prev.syllabus.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addTopicToModule = (moduleIndex) => {
    setFormData((prev) => ({
      ...prev,
      syllabus: prev.syllabus.map((item, i) =>
        i === moduleIndex ? { ...item, topics: [...item.topics, ""] } : item
      ),
    }));
  };

  const removeTopicFromModule = (moduleIndex, topicIndex) => {
    setFormData((prev) => ({
      ...prev,
      syllabus: prev.syllabus.map((item, i) =>
        i === moduleIndex
          ? {
              ...item,
              topics: item.topics.filter((_, j) => j !== topicIndex),
            }
          : item
      ),
    }));
  };

  const updateModuleTopic = (moduleIndex, topicIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      syllabus: prev.syllabus.map((item, i) =>
        i === moduleIndex
          ? {
              ...item,
              topics: item.topics.map((topic, j) =>
                j === topicIndex ? value : topic
              ),
            }
          : item
      ),
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("category", formData.category);
    fd.append("level", formData.level);
    fd.append("duration", formData.duration);
    fd.append("price", formData.price);
    fd.append("originalPrice", formData.originalPrice);
    fd.append("icon", formData.icon);

    fd.append("instructor[name]", formData.instructor.name);
    fd.append("instructor[title]", formData.instructor.title);

    fd.append(
      "features",
      JSON.stringify(formData.features.filter((f) => f.trim()))
    );

    fd.append(
      "syllabus",
      JSON.stringify(
        formData.syllabus.map((m) => ({
          ...m,
          topics: m.topics.filter((t) => t.trim()),
        }))
      )
    );

    fd.append("tags", JSON.stringify(formData.tags.filter((t) => t.trim())));

    if (formData.thumbnail) {
      fd.append("thumbnail", formData.thumbnail);
    }

    onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Course Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Introduction to Ayurveda"
          />
        </div>

        <div>
          <label
            htmlFor="sanskritName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sanskrit Name
          </label>
          <input
            type="text"
            name="sanskritName"
            id="sanskritName"
            value={formData.sanskritName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="आयुर्वेद परिचय"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description *
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Course description..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category *
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Level *
          </label>
          <select
            name="level"
            id="level"
            value={formData.level}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Level</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Duration *
          </label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="8 weeks"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price (₹) *
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="4999"
          />
        </div>

        <div>
          <label
            htmlFor="originalPrice"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Original Price (₹)
          </label>
          <input
            type="number"
            name="originalPrice"
            id="originalPrice"
            value={formData.originalPrice}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="7999"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="instructor"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Instructor Name *
          </label>
          <input
            type="text"
            name="instructor"
            id="instructor"
            value={formData.instructor.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                instructor: { ...prev.instructor, name: e.target.value },
              }))
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Dr. Rajesh Sharma"
          />
        </div>

        <div>
          <label
            htmlFor="instructorTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Instructor Title
          </label>
          <input
            type="text"
            name="instructorTitle"
            id="instructorTitle"
            value={formData.instructor.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                instructor: { ...prev.instructor, title: e.target.value },
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ayurvedacharya"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="icon"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Course Icon (Emoji)
        </label>
        <input
          type="text"
          name="icon"
          id="icon"
          value={formData.icon}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="🌿"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Thumbnail
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            setFormData((prev) => ({
              ...prev,
              thumbnail: file,
              thumbnailPreview: URL.createObjectURL(file),
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        {formData.thumbnailPreview && (
          <img
            src={formData.thumbnailPreview}
            alt="Thumbnail Preview"
            className="mt-3 h-40 rounded-lg object-cover border"
          />
        )}
      </div>

      {/* Curriculum/Syllabus */}
      <div>
        <div className="block text-sm font-medium text-gray-700 mb-4">
          Course Curriculum
        </div>
        {formData.syllabus.map((module, moduleIndex) => (
          <div
            key={moduleIndex}
            className="border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">
                Module {moduleIndex + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeSyllabusModule(moduleIndex)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove Module
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Module Name *
                </label>
                <input
                  type="text"
                  value={module.module}
                  onChange={(e) =>
                    updateSyllabusModule(moduleIndex, "module", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Introduction to Ayurveda"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={module.duration}
                  onChange={(e) =>
                    updateSyllabusModule(
                      moduleIndex,
                      "duration",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2 weeks"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Topics</label>
              {module.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) =>
                      updateModuleTopic(moduleIndex, topicIndex, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Topic name..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeTopicFromModule(moduleIndex, topicIndex)
                    }
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addTopicToModule(moduleIndex)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                + Add Topic
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addSyllabusModule}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          + Add Module
        </button>
      </div>

      {/* Features */}
      <div>
        <div className="block text-sm font-medium text-gray-700 mb-2">
          Course Features
        </div>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <label htmlFor={`feature-${index}`} className="sr-only">
              Feature {index + 1}
            </label>
            <input
              type="text"
              name={`feature-${index}`}
              id={`feature-${index}`}
              value={feature}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "features")
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Course feature..."
            />
            <button
              type="button"
              onClick={() => removeArrayItem(index, "features")}
              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("features")}
          className="text-blue-600 hover:text-blue-700 text-sm"
        >
          + Add Feature
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {initialData ? "Update Course" : "Create Course"}
        </button>
      </div>
    </form>
  );
};

export default AddCourseForm;
