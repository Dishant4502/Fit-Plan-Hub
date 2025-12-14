import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
// HeroSection removed so Visitor is the landing page

import Visitor from "./pages/Visiter/Visiter"
import User from "./pages/User/User"
import Trainer from "./pages/Trainer/Trainer"
import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Visitor />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboards */}
        <Route path="/user" element={<User />} />
        <Route path="/trainer" element={<Trainer />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
