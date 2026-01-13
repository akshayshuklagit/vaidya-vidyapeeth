import mongoose from "mongoose";
import slugify from "slugify";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Foundation", "Therapy", "Herbalism", "Nutrition", "Clinical"],
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: Number,
    currency: {
      type: String,
      default: "INR",
    },
    instructor: {
      name: String,
      title: String,
      avatar: String,
    },
    thumbnail: {
      url: String,
      public_id: String,
    },
    icon: String,
    features: [String],
    syllabus: [
      {
        module: String,
        topics: [String],
        duration: String,
        videoId: String, // YouTube video ID only
      },
    ],
    tags: [String],
    students: {
      type: Number,
      default: 0,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    flags: {
      isBestSeller: {
        type: Boolean,
        default: false,
      },
      isNew: {
        type: Boolean,
        default: false,
      },
      hasCertificate: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  let baseSlug = slugify(this.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  // Ensure uniqueness
  while (
    await mongoose.models.Course.findOne({ slug, _id: { $ne: this._id } })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
  next();
});

export default mongoose.model("Course", courseSchema);
