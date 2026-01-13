# Vaidya Vidyapeeth - Ayurveda Learning Platform

## 🌿 Project Overview

Vaidya Vidyapeeth is a comprehensive online learning platform for Ayurvedic education, featuring courses, resources, and community features for students and instructors.

## 🏗️ Architecture

```
ayurveda-academy/
├── frontend/          # React.js Frontend
├── backend/           # Node.js Backend API
└── README.md         # This file
```

## 🚀 Tech Stack

### Frontend

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Routing**: React Router DOM
- **State Management**: Context API
- **Authentication**: Firebase Auth

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (recommended)
- **Authentication**: Firebase Admin SDK
- **File Storage**: Firebase Storage (recommended)

## 📊 Database Models

### 1. User Model

```javascript
{
  _id: ObjectId,
  uid: String,              // Firebase UID
  email: String,
  name: String,
  role: String,             // 'student' | 'admin'
  avatar: String,           // URL
  phone: String,
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String
  },
  preferences: {
    language: String,       // 'en' | 'hi'
    notifications: Boolean,
    newsletter: Boolean
  },
  profile: {
    bio: String,
    experience: String,
    specialization: [String],
    qualifications: [String]
  },
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean
}
```

### 2. Course Model

```javascript
{
  _id: ObjectId,
  title: String,
  sanskritName: String,
  slug: String,
  description: String,
  category: String,         // 'Foundation' | 'Therapy' | 'Herbalism' | 'Nutrition' | 'Clinical'
  level: String,            // 'Beginner' | 'Intermediate' | 'Advanced'
  duration: String,         // '8 weeks'
  price: Number,
  originalPrice: Number,
  currency: String,         // 'INR'
  instructor: {
    id: ObjectId,
    name: String,
    title: String,
    avatar: String
  },
  thumbnail: String,        // URL
  icon: String,             // Emoji
  features: [String],
  syllabus: [{
    module: String,
    topics: [String],
    duration: String
  }],
  resources: [{
    type: String,           // 'video' | 'pdf' | 'audio' | 'quiz'
    title: String,
    url: String,
    duration: Number,       // in minutes
    isLocked: Boolean
  }],
  tags: [String],
  students: Number,         // enrolled count
  rating: {
    average: Number,
    count: Number
  },
  status: String,           // 'draft' | 'published' | 'archived'
  flags: {
    isBestSeller: Boolean,
    isNew: Boolean,
    hasCertificate: Boolean,
    hasLiveSessions: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Enrollment Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  courseId: ObjectId,
  enrollmentDate: Date,
  status: String,           // 'active' | 'completed' | 'paused' | 'cancelled'
  progress: {
    completedLessons: Number,
    totalLessons: Number,
    percentage: Number,
    lastAccessedLesson: ObjectId,
    timeSpent: Number       // in minutes
  },
  certificate: {
    issued: Boolean,
    issuedDate: Date,
    certificateUrl: String,
    grade: String
  },
  paymentId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Payment Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  courseId: ObjectId,
  amount: Number,
  currency: String,
  paymentMethod: String,    // 'card' | 'upi' | 'netbanking' | 'wallet'
  transactionId: String,
  gatewayResponse: Object,
  status: String,           // 'pending' | 'completed' | 'failed' | 'refunded'
  refund: {
    amount: Number,
    reason: String,
    processedDate: Date,
    refundId: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Blog Model

```javascript
{
  _id: ObjectId,
  title: String,
  slug: String,
  excerpt: String,
  content: String,          // HTML content
  author: {
    id: ObjectId,
    name: String,
    avatar: String
  },
  thumbnail: String,
  category: String,         // 'Fundamentals' | 'Nutrition' | 'Wellness' | 'Herbs' | 'Lifestyle'
  tags: [String],
  readTime: Number,         // in minutes
  status: String,           // 'draft' | 'published' | 'archived'
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  engagement: {
    views: Number,
    likes: Number,
    shares: Number
  },
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Notes/Resources Model

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  type: String,             // 'pdf' | 'video' | 'audio' | 'image' | 'document'
  fileUrl: String,
  fileSize: Number,         // in bytes
  category: String,
  tags: [String],
  courseId: ObjectId,       // optional, if linked to course
  uploadedBy: ObjectId,
  isPublic: Boolean,
  downloads: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Notification Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId,         // null for broadcast notifications
  title: String,
  message: String,
  type: String,             // 'info' | 'success' | 'warning' | 'error'
  category: String,         // 'course' | 'payment' | 'system' | 'announcement'
  data: Object,             // additional data
  isRead: Boolean,
  readAt: Date,
  createdAt: Date
}
```

### 8. Gallery Model

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  imageUrl: String,
  thumbnailUrl: String,
  category: String,         // 'herbs' | 'classes' | 'events' | 'certificates'
  tags: [String],
  uploadedBy: ObjectId,
  isPublic: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication APIs

```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
POST   /api/auth/forgot-password   # Password reset
POST   /api/auth/verify-token      # Token verification
POST   /api/auth/refresh-token     # Refresh JWT token
```

### User Management APIs

```
GET    /api/users/profile          # Get user profile
PUT    /api/users/profile          # Update user profile
GET    /api/users/dashboard        # Dashboard data
DELETE /api/users/account          # Delete account

# Admin only
GET    /api/admin/users            # List all users
GET    /api/admin/users/:id        # Get user by ID
PUT    /api/admin/users/:id        # Update user
DELETE /api/admin/users/:id        # Delete user
POST   /api/admin/users/:id/role   # Change user role
```

### Course Management APIs

```
GET    /api/courses                # List courses (public)
GET    /api/courses/:id            # Get course details
GET    /api/courses/search         # Search courses
GET    /api/courses/categories     # Get categories

# Student APIs
GET    /api/student/courses        # Enrolled courses
POST   /api/student/enroll/:id     # Enroll in course
GET    /api/student/progress/:id   # Course progress
PUT    /api/student/progress/:id   # Update progress

# Admin APIs
POST   /api/admin/courses          # Create course
PUT    /api/admin/courses/:id      # Update course
DELETE /api/admin/courses/:id      # Delete course
GET    /api/admin/courses/stats    # Course statistics
```

### Payment APIs

```
POST   /api/payments/create        # Create payment intent
POST   /api/payments/verify        # Verify payment
GET    /api/payments/history       # Payment history
POST   /api/payments/refund        # Process refund

# Admin APIs
GET    /api/admin/payments         # All payments
GET    /api/admin/payments/stats   # Payment statistics
```

### Blog APIs

```
GET    /api/blog/posts             # List blog posts
GET    /api/blog/posts/:slug       # Get blog post
GET    /api/blog/categories        # Blog categories
GET    /api/blog/search            # Search posts

# Admin APIs
POST   /api/admin/blog             # Create post
PUT    /api/admin/blog/:id         # Update post
DELETE /api/admin/blog/:id         # Delete post
PUT    /api/admin/blog/:id/publish # Publish post
```

### Notes/Resources APIs

```
GET    /api/notes                  # List notes
GET    /api/notes/:id              # Get note details
POST   /api/notes/upload           # Upload note
DELETE /api/notes/:id              # Delete note

# Admin APIs
GET    /api/admin/notes            # All notes
PUT    /api/admin/notes/:id        # Update note
```

### Notification APIs

```
GET    /api/notifications          # User notifications
PUT    /api/notifications/:id/read # Mark as read
DELETE /api/notifications/:id      # Delete notification

# Admin APIs
POST   /api/admin/notifications    # Send notification
GET    /api/admin/notifications    # All notifications
```

### Gallery APIs

```
GET    /api/gallery                # List gallery items
GET    /api/gallery/:id            # Get gallery item
POST   /api/gallery/upload         # Upload image

# Admin APIs
PUT    /api/admin/gallery/:id      # Update gallery item
DELETE /api/admin/gallery/:id      # Delete gallery item
```

### Analytics APIs

```
GET    /api/admin/analytics/dashboard    # Dashboard stats
GET    /api/admin/analytics/users        # User analytics
GET    /api/admin/analytics/courses      # Course analytics
GET    /api/admin/analytics/revenue      # Revenue analytics
```

## 🔐 Authentication & Authorization

### Roles & Permissions

- **Student**: Course access, profile management, payments
- **Admin**: Full system access, user management, analytics, course creation

### Protected Routes

- `/dashboard/*` - Student authentication required
- `/admin/*` - Admin authentication required
- `/course-player/*` - Course enrollment required

## 🎨 Frontend Pages

### Public Pages

- `/` - Homepage
- `/courses` - Course listing
- `/courses/:id` - Course details
- `/blog` - Blog listing
- `/blog/:slug` - Blog post
- `/gallery` - Image gallery
- `/about` - About page
- `/faq` - FAQ page
- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms of service
- `/authpage` - Login/Register

### Student Dashboard

- `/dashboard` - Student dashboard
- `/dashboard/courses` - My courses
- `/dashboard/notes` - Notes & resources
- `/dashboard/payment` - Payment history
- `/dashboard/setting` - Account settings
- `/course-player/:id` - Course player

### Admin Dashboard

- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/courses` - Course management
- `/admin/notes` - Notes management
- `/admin/payments` - Payment management
- `/admin/blogs` - Blog management
- `/admin/notifications` - Notification management
- `/admin/settings` - System settings

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Firebase Project (for authentication)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ayurveda-academy
```

2. **Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

3. **Frontend Setup**

```bash
cd frontend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

### Environment Variables

#### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ayurveda-academy
JWT_SECRET=your-jwt-secret
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

#### Frontend (.env)

```
VITE_BACKEND_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_RAZORPAY_KEY_ID=your-razorpay-key
```

## 📱 Features

### Core Features

- ✅ User Authentication (Firebase)
- ✅ Course Management
- ✅ Payment Integration
- ✅ Blog System
- ✅ Gallery
- ✅ FAQ System
- ✅ Multi-language Support
- ✅ Responsive Design
- ✅ Admin Dashboard
- ✅ Student Dashboard

### Planned Features

- 🔄 Live Class Integration
- 🔄 Certificate Generation
- 🔄 Discussion Forums
- 🔄 Mobile App
- 🔄 Offline Content
- 🔄 Advanced Analytics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@vaidyavidyapeeth.com or create an issue in the repository.

---

**Vaidya Vidyapeeth** - Empowering lives through authentic Ayurvedic education 🌿
#   v a i d y a - v i d y a p e e t h  
 