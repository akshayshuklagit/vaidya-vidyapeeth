import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firebase.js";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Loader from "../../components/Loader.jsx";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) return;

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("If an account exists, a reset link has been sent 📩");
    } catch {
      setMessage("If an account exists, a reset link has been sent 📩");
    } finally {
      setLoading(false);
    }
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      {/* 🌿 Top Logo */}
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex items-center gap-3 text-white group">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center shadow-md group-hover:scale-105 transition">
            🌿
          </div>
          <span className="text-lg font-semibold tracking-wide">
            Ayurveda Vidyapeeth
          </span>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl text-white w-full max-w-md shadow-2xl">
        {/* Small logo inside card */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
            🔐
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-center">
          Reset Password
        </h2>
        <p className="text-sm text-white/70 text-center mb-6">
          Enter your registered email to receive a reset link
        </p>

        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 rounded-lg bg-white/20 outline-none mb-4 placeholder-white/60"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium flex justify-center items-center"
        >
          {loading ? <Loader /> : "Send reset link"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-center text-white/80">{message}</p>
        )}

        {/* Back link */}
        <Link
          to="/authpage"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-200 hover:text-white transition"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
}
