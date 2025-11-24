import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Plaza from "./pages/Plaza.jsx";
import { Menu } from "./components/Common/Menu.jsx";
import AuthModal from "./components/Modal/AuthModal.jsx";
import useUserStore from "./store/authState.js";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";

export default function App() {
  const [openAuth, setOpenAuth] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          nickname: user.displayName || "익명",
        });
      } else {
        clearUser();
      }
    });
    return () => unsubscribe();
  }, [clearUser, setUser]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Plaza" element={<Plaza />} />
      </Routes>

      <Menu onOpenAuthModal={() => setOpenAuth(true)} />
      <AuthModal isOpen={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
}
