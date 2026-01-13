import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth as firebaseAuth } from "../utils/firebase";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("auth")) || null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser) => {
        if (!firebaseUser) {
          setAuth(null);
          localStorage.removeItem("auth");
          setLoading(false);
          return;
        }

        // 🔐 Refresh token only (DO NOT touch user)
        const token = await firebaseUser.getIdToken();

        setAuth((prev) => {
          if (!prev) return prev;

          const updated = { ...prev, token };
          localStorage.setItem("auth", JSON.stringify(updated));
          return updated;
        });

        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const login = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  };

  const logout = async () => {
    await signOut(firebaseAuth);
    localStorage.removeItem("auth");
    setAuth(null);
  };
  const updateUser = (user) => {
    setAuth((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, user };
      localStorage.setItem("auth", JSON.stringify(updated));
      return updated;
    });
  };

  const resyncUser = async () => {
    try {
      const token = await firebaseAuth.currentUser?.getIdToken();
      if (!token) return;

      const res = await api.post("/auth/sync-user", { token });
      const freshUser = res?.data?.data?.user || res?.data?.user;

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
