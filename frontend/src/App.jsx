import { Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import StudentProtectedRoute from "./routes/StudentProtectedRoute";
import ScrollToTop from "./components/ScrolltoTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CoursesListing from "./pages/CoursesListing";
import CourseDetails from "./pages/CourseDetails";
import ForgotPassword from "./pages/auth/ForgotPassword";
import LiveClassroomLayout from "./layouts/LiveClassroomLayout";
import LiveClassroomPage from "./components/LiveClassroomPage";

import StudentDashboard from "./pages/student/StudentDashboard";
import CoursePlayer from "./pages/CoursePlayer";

import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import Checkout from "./pages/Checkout";
import AuthPage from "./pages/auth/AuthPage";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminBlogs from "./pages/admin/AdminBlogs";

import AdminNotes from "./pages/admin/AdminNotes";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminCourses from "./pages/admin/AdminCourses";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import StudentSettings from "./pages/student/StudentSettings";
import StudentCourses from "./pages/student/StudentCourses";
import StudentNotes from "./pages/student/StudentNotes";
import StudentLiveClasses from "./pages/student/StudentLiveClasses";
import AdminLiveClasses from "./pages/admin/AdminLiveClasses";
import WhatsAppChat from "./components/WhatsAppChat";
import BackToTop from "./components/BackToTop";
import { Toaster } from "sonner";
import LiveStream from "./pages/LiveStream";

function App() {
  const location = useLocation();
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/student/live") ||
    ["/authpage", "/forgot-password"].includes(location.pathname);

  return (
    <LanguageProvider>
      <NotificationProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          {!hideLayout && <Navbar />}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CoursesListing />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/authpage" element={<AuthPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/course-player/:id" element={<CoursePlayer />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route element={<AdminProtectedRoute />}>
                <Route
                  path="/admin"
                  element={
                    <DashboardLayout userRole="admin" title="Admin dashboard" />
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="courses" element={<AdminCourses />} />
                  <Route
                    path="notifications"
                    element={<AdminNotifications />}
                  />
                  <Route path="meetings" element={<AdminLiveClasses />} />
                  <Route path="blogs" element={<AdminBlogs />} />
                  <Route path="notes" element={<AdminNotes />} />
                  <Route path="payments" element={<AdminPayments />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Route>

              <Route element={<StudentProtectedRoute />}>
                <Route
                  path="/student/live/:meetingId"
                  element={
                    <LiveClassroomLayout>
                      <LiveClassroomPage />
                    </LiveClassroomLayout>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <DashboardLayout
                      userRole="student"
                      title="Student dashboard"
                    />
                  }
                >
                  <Route index element={<StudentDashboard />} />
                  <Route path="courses" element={<StudentCourses />} />
                  <Route path="live-classes" element={<StudentLiveClasses />} />
                  <Route path="notes" element={<StudentNotes />} />
                  <Route path="setting" element={<StudentSettings />} />
                </Route>
              </Route>
            </Routes>
          </main>
          {!hideLayout && <Footer />}

          {/* WhatsApp Chat - Show on all pages except admin/dashboard */}
          {!hideLayout && <WhatsAppChat />}

          {/* Back to Top - Show on all pages except admin/dashboard */}
          {!hideLayout && <BackToTop />}

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            expand={false}
            duration={2000}
            limit={1}
            visibleToasts={1}
          />
        </div>
      </NotificationProvider>
    </LanguageProvider>
  );
}

export default App;
