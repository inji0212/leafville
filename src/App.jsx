import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Square from "./pages/Square.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/square" element={<Square />} />
    </Routes>
  );
}
