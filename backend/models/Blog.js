import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
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
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: String,
      avatar: String,
    },
    thumbnail: {
      url: String,
      public_id: String,
    },
    category: {
      type: String,
      required: true,
      enum: ["Fundamentals", "Nutrition", "Wellness", "Herbs", "Lifestyle", "Diagnosis"],
    },
    tags: [String],
    readTime: {
      type: Number,
      default: 5,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    views: {
      type: Number,
      default: 0,
    },
    publishedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
