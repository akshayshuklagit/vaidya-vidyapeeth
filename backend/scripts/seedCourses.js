import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

const sampleCourses = [
  {
    title: "Fundamentals of Ayurveda",
    slug: "fundamentals-of-ayurveda",
    description: "Learn the basic principles and concepts of Ayurveda",
    category: "Foundation",
    level: "Beginner",
    duration: "8 weeks",
    price: 2999,
    originalPrice: 4999,
    instructor: {
      name: "Dr. Rajesh Kumar",
      title: "Ayurveda Expert",
      avatar: ""
    },
    thumbnail: "",
    icon: "🌿",
    features: ["Video Lectures", "Study Materials", "Certificate"],
    tags: ["ayurveda", "basics", "health"],
    status: "published"
  },
  {
    title: "Panchakarma Therapy",
    slug: "panchakarma-therapy",
    description: "Complete guide to Panchakarma detoxification treatments",
    category: "Therapy",
    level: "Intermediate",
    duration: "12 weeks",
    price: 4999,
    originalPrice: 7999,
    instructor: {
      name: "Dr. Priya Sharma",
      title: "Panchakarma Specialist",
      avatar: ""
    },
    thumbnail: "",
    icon: "🧘",
    features: ["Practical Sessions", "Case Studies", "Certificate"],
    tags: ["panchakarma", "detox", "therapy"],
    status: "published"
  },
  {
    title: "Herbal Medicine Basics",
    slug: "herbal-medicine-basics",
    description: "Introduction to medicinal herbs and their applications",
    category: "Herbalism",
    level: "Beginner",
    duration: "6 weeks",
    price: 1999,
    originalPrice: 2999,
    instructor: {
      name: "Dr. Amit Singh",
      title: "Herbalist",
      avatar: ""
    },
    thumbnail: "",
    icon: "🌱",
    features: ["Herb Identification", "Preparation Methods", "Certificate"],
    tags: ["herbs", "medicine", "natural"],
    status: "published"
  }
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert sample courses
    const courses = await Course.insertMany(sampleCourses);
    console.log(`✅ Created ${courses.length} sample courses:`);
    
    courses.forEach(course => {
      console.log(`- ${course.title} (ID: ${course._id})`);
    });

    await mongoose.disconnect();
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedCourses();