import { useState } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "Inaguration", name: "Inaguration" },
    { id: "classes", name: "Classes" },
    { id: "events", name: "Events" },
  ];

  const galleryImages = [
    {
      id: 0,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768240031/mixedlogo_qlqb01.jpg",
      alt: "Vidyapeeth-inaguration",
      category: "herbs",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 1,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239352/WhatsApp_Image_2026-01-01_at_7.10.18_PM_yocvr2.jpg",
      alt: "Vidyapeeth-inaguration",
      category: "herbs",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239352/WhatsApp_Image_2026-01-01_at_7.10.18_PM_1_dmxgmf.jpg",
      alt: "Vidya-peeth inaguration",
      category: "classes",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239352/WhatsApp_Image_2026-01-01_at_7.09.53_PM_yyeet9.jpg",
      alt: "Vidya-peeth inaguration",
      category: "events",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239352/WhatsApp_Image_2026-01-01_at_7.10.09_PM_atyxec.jpg",
      alt: "Vidya-peeth inaguration",
      category: "herbs",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239353/WhatsApp_Image_2026-01-01_at_7.10.14_PM_ozxjp3.jpg",
      alt: "Vidya-peeth inaguration",
      category: "certificates",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239353/WhatsApp_Image_2026-01-01_at_7.10.13_PM_vwwcm1.jpg",
      alt: "Vidya-peeth inaguration",
      category: "classes",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 7,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239353/WhatsApp_Image_2026-01-01_at_7.09.52_PM_kpq8v6.jpg",
      alt: "Vidya-peeth inaguration",
      category: "herbs",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 8,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239353/WhatsApp_Image_2026-01-01_at_7.10.16_PM_ie0sjx.jpg",
      alt: "Vidya-peeth inaguration",
      category: "certificates",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239353/WhatsApp_Image_2026-01-01_at_7.10.16_PM_ie0sjx.jpg",
      alt: "Vidya-peeth inaguration",
      category: "events",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239353/WhatsApp_Image_2026-01-01_at_7.10.12_PM_ticdru.jpg",
      alt: "Vidya-peeth inaguration",
      category: "events",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239354/WhatsApp_Image_2026-01-01_at_7.10.11_PM_nwvigb.jpg",
      alt: "Vidya-peeth inaguration",
      category: "events",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239354/WhatsApp_Image_2026-01-01_at_7.09.49_PM_tu338m.jpg",
      alt: "Vidya-peeth inaguration",
      category: "events",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239354/WhatsApp_Image_2026-01-01_at_7.09.48_PM_jyio7n.jpg",
      alt: "Vidya-peeth inaguration",
      category: "events",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239354/WhatsApp_Image_2026-01-01_at_7.09.44_PM_ep3gm9.jpg",
      alt: "Vidya-peeth inaguration",
      category: "events",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239354/WhatsApp_Image_2026-01-01_at_7.09.45_PM_nhcgfx.jpg",
      alt: "Vidya-peeth inaguration",
      category: "events",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239354/WhatsApp_Image_2026-01-01_at_7.09.43_PM_fkrxd5.jpg",
      alt: "Vidya-peeth inaguration",
      category: "events",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239354/WhatsApp_Image_2026-01-01_at_7.09.46_PM_uqzwf4.jpg",
      alt: "Vidya-peeth inaguration",
      category: "events",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239355/WhatsApp_Image_2026-01-01_at_7.09.42_PM_sjhmjq.jpg",
      alt: "Vidya-peeth inaguration",
      category: "events",
      title: "Vidya-peeth inaguration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239355/WhatsApp_Image_2026-01-01_at_7.09.37_PM_f8utka.jpg",
      alt: "Cultural event",
      category: "events",
      title: "Cultural Celebration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239355/WhatsApp_Image_2026-01-01_at_7.09.40_PM_yhdvzz.jpg",
      alt: "Cultural event",
      category: "events",
      title: "Cultural Celebration",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dqmataouk/image/upload/v1768239355/WhatsApp_Image_2026-01-01_at_7.09.32_PM_vnsobr.jpg",
      alt: "Cultural event",
      category: "events",
      title: "Cultural Celebration",
    },
  ];

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our journey through images - from traditional herbs to
            modern learning experiences
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-600">{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
