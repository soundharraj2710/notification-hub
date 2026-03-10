import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ToastContainer from "./components/ToastContainer";
import { ToastProvider } from "./context/ToastContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
