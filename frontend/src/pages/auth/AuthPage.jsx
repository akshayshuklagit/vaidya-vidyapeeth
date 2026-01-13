import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { showSuccess, showError } from "../../utils/toast";

import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { DotsLoader } from "../../components/Loader";
import api from "../../utils/api";
import {
  signupWithEmail,
  loginWithEmail,
  loginWithGoogle,
  logoutFirebase,
} from "../../utils/firebaseAuthService";
import { Spinner } from "@/components/ui/spinner";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="  min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 px-4">
      <div className="absolute top-3 left-14 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 group xl:hidden">
          {/* LOGO CIRCLE */}
          <div className="w-12 h-12 ">
            <img src="./vidhyapeeth_logo.webp" alt="logo" />
          </div>

          {/* BRAND NAME */}
          <span
            className="text-white text-lg font-semibold tracking-wide
                     group-hover:opacity-90 transition"
          >
            Vaidya Vidyapeeth
          </span>
        </Link>
      </div>
      <div className="w-full max-w-5xl bg-white/20 backdrop-blur-md   rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* LEFT INFO PANEL */}
        <div className="hidden md:flex flex-col justify-between p-12 text-white bg-gradient-to-br from-blue-600/20 to-indigo-600/20">
          <center>
            {" "}
            <div className="h-15 w-18 items-center justify-center">
              <img src="./vidhyapeeth_logo.webp"></img>
            </div>
          </center>
          <div>
            <h2 className="text-3xl font-semibold leading-tight">
              Learn Ayurveda <br /> The Authentic Way 🌿
            </h2>
            <p className="mt-4 text-white/70">
              Live classes, expert notes and certified courses — all in one
              place.
            </p>
          </div>
          <div className="mt-4 space-y-6">
            <div className="flex gap-4">
              <div className="w-1 rounded-full bg-white/40"></div>
              <div>
                <p className="font-medium">Learn</p>
                <p className="text-sm text-white/70">
                  Structured Ayurveda courses designed by experts
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1 rounded-full bg-white/40"></div>
              <div>
                <p className="font-medium">Practice</p>
                <p className="text-sm text-white/70">
                  Live classes, notes & practical guidance
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1 rounded-full bg-white/40"></div>
              <div>
                <p className="font-medium">Grow</p>
                <p className="text-sm text-white/70">
                  Certifications & lifelong learning
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-xl text-sm">
            Trusted by 1000+ learners across India
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="p-8 md:p-12 text-white">
          <div className="absolute top-6 right-6">
            <Link
              to="/"
              className="flex items-center gap-2 
               px-4 py-2 rounded-full 
               bg-white/10 text-white/80 text-xs backdrop-blur 
               hover:bg-white/30 transition"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Home
            </Link>
          </div>

          {/* TOGGLE */}
          <div className="flex bg-white/10 rounded-full p-1 mb-8 w-fit">
            <ToggleBtn
              active={mode === "login"}
              onClick={() => setMode("login")}
            >
              Login
            </ToggleBtn>
            <ToggleBtn
              active={mode === "signup"}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </ToggleBtn>
          </div>

          {/* FORM ANIMATION */}
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <AuthForm
                  title="Welcome Back 👋"
                  subtitle="Continue your learning journey in Ayurveda"
                  button="Login"
                />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.4 }}
              >
                <AuthForm
                  title="Create Account ✨"
                  subtitle=""
                  button="Sign Up"
                  showName
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ToggleBtn({ active, children, ...props }) {
  return (
    <button
      {...props}
      className={`px-6 py-2 rounded-full text-sm font-medium transition
        ${
          active ? "bg-blue-600 text-white" : "text-white/70 hover:text-white"
        }`}
    >
      {children}
    </button>
  );
}

function AuthForm({ title, subtitle, button, showName = false }) {
  const { login, resyncUser } = useAuth();
  const navigate = useNavigate();

  const getAuthError = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/email-already-in-use":
        return "This email is already registered. Please login.";

      case "auth/weak-password":
        return "Password must be at least 6 characters.";

      case "auth/user-not-found":
        return "No account found with this email.";

      case "auth/wrong-password":
        return "Incorrect password. Try again.";

      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";

      default:
        return "Authentication failed. Please try again.";
    }
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = button === "Login";

  const { auth, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!auth?.user?.role) return;

    if (auth.user.role === "admin") {
      showSuccess("Logged in as admin");
      navigate("/admin", { replace: true });
    } else if (auth.user.role === "student") {
      showSuccess(`Authentication successful welcome ${auth.user.name}`);
      navigate("/", { replace: true });
    }
  }, [auth, authLoading, navigate]);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const userCred = isLogin
        ? await loginWithEmail(form.email, form.password)
        : await signupWithEmail(form.email, form.password);

      const firebaseUser = userCred.user;
      const idToken = await firebaseUser.getIdToken();

      let userFromBackend;

      // 🔐 Backend sync
      let res;
      try {
        res = await api.post("/auth/sync-user", {
          token: idToken,
          name: form.name,
        });
        userFromBackend = res?.data?.data?.user || res?.data?.user;

        if (!userFromBackend) {
          throw new Error("User data missing from backend");
        }
      } catch (syncErr) {
        // If backend sync is disabled or fails, fall back to using Firebase user info
        console.warn(
          "User sync failed, falling back to firebase user:",
          syncErr
        );
        userFromBackend = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || form.name,
          role: "student",
        };
      }

      login({
        token: idToken,
        user: userFromBackend,
      });
    } catch (err) {
      showError("Authentication failed.");
      setError(getAuthError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const userCred = await loginWithGoogle();
      const firebaseUser = userCred.user;
      const idToken = await firebaseUser.getIdToken();
      let userData;

      try {
        const res = await api.post("/auth/sync-user", {
          token: idToken,
          name: firebaseUser.displayName,
        });
        userData = res.data.data.user;
      } catch {
        userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          role: "student",
        };
      }

      login({
        token: idToken,
        user: userData,
      });
      resyncUser();
    } catch (err) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold mb-1">{title}</h3>
      <p className="text-white/60 mb-8">{subtitle}</p>
      {showName && (
        <Input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}
      <Input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-5 py-4 rounded-xl 
               bg-white/20 text-white placeholder-white/60 
               outline-none border border-white/10 
               focus:border-blue-500 transition pr-12"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 
               text-white/60 hover:text-white transition"
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {isLogin && (
        <div className="flex items-center justify-between mt-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-blue-500"
            />
            Remember me
          </label>

          <button
            type="button"
            className="text-blue-200 hover:text-white transition"
          >
            <Link to="/forgot-password">Forgot password?</Link>
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-400/30 px-4 py-3 text-sm text-red-200">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center"
      >
        {loading ? <Spinner /> : button}
      </button>
      <div className="mt-6">
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-gray-800 font-medium hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full mb-4 px-5 py-4 rounded-xl bg-white/20 placeholder-white/60 outline-none border border-white/10 focus:border-blue-500 transition"
    />
  );
}

function Social({ src, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
    >
      <img src={src} alt="icon" className="w-5" />
    </div>
  );
}
