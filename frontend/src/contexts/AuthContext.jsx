import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth as firebaseAuth } from "../utils/firebase";
import { showError } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("auth")) || null;
  });
  const [loading, setLoading] = useState(true);
  const [sessionExpiredHandled, setSessionExpiredHandled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser) => {
        // 🔴 DO NOT CLEAR AUTH HERE (backend handles session)
        if (!firebaseUser) {
          setLoading(false);
          return;
        }

        // 🔐 Only refresh Firebase token
        const token = await firebaseUser.getIdToken(true);

        setAuth((prev) => {
          if (!prev) return prev;

          const updated = {
            ...prev,
            token, // refresh token only
          };

          localStorage.setItem("auth", JSON.stringify(updated));
          return updated;
        });

        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (sessionExpiredHandled) return;
      
      setSessionExpiredHandled(true);
      showError("Session expired - logged in from another device");
      
      setTimeout(() => {
        logout().then(() => {
          window.location.href = "/";
        });
      }, 1000);
    };

    window.addEventListener("session-expired", handler);
    return () => window.removeEventListener("session-expired", handler);
  }, [sessionExpiredHandled]);

  const login = (data) => {
    // data must contain: user, token, sessionId
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  };

  const logout = async () => {
    try {
      // Call backend logout to clear sessionId
      await api.post('/auth/logout');
    } catch (error) {
      console.warn('Logout API failed:', error);
    } finally {
      // Always clear local state
      await signOut(firebaseAuth);
      localStorage.removeItem("auth");
      setAuth(null);
      setSessionExpiredHandled(false); // Reset flag
    }
  };

  const updateUser = (user) => {
    setAuth((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, user };
      localStorage.setItem("auth", JSON.stringify(updated));
      return updated;
    });
  };

  // 🔥 IMPORTANT: DO NOT call sync-user automatically
  const resyncUser = async () => {
    try {
      const token = await firebaseAuth.currentUser?.getIdToken();
      if (!token) return;

      const res = await api.post("/auth/sync-user", { token });

      const freshUser = res?.data?.data?.user;

      if (!freshUser) return;

      setAuth((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, user: freshUser };
        localStorage.setItem("auth", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.warn("User resync failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, loading, updateUser, resyncUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
