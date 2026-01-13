export const uploadThumbnail = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "vidyapeeth");

  const response = await fetch(process.env.VITE_CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();
  return data.secure_url; // 🔥 Store this in MongoDB
};
