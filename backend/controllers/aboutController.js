export const getAboutUs = (req, res) => {
  res.json({
    success: true,
    message: "About Us - Ayurveda Academy",
    data: {
      title: "About Ayurveda Academy",
      description: "We are dedicated to providing authentic Ayurvedic education and wellness solutions.",
      mission: "To promote traditional Ayurvedic knowledge and practices for modern wellness.",
      vision: "Creating a healthier world through ancient wisdom and modern science."
    }
  });
};