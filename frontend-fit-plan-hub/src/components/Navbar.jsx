import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  const navLinksVisitor = [
    { name: "Home", hash: "#hero" },
    { name: "About Us", hash: "#about" },
    { name: "Plans", hash: "#plans" },
    { name: "Trainers", hash: "#trainers" },
    { name: "Review", hash: "#reviews" },
  ]

  const userInitial = (() => {
    const name = localStorage.getItem("name") || localStorage.getItem("username")
    if (name && name.length) return name.charAt(0).toUpperCase()
    if (role && role.length) return role.charAt(0).toUpperCase()
    return "U"
  })()

  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("name")
    localStorage.removeItem("username")
    setIsOpen(false)
    navigate("/")
  }

  const handleScroll = (hash) => {
    if (!hash) return
    if (window.location.pathname !== "/") {
      navigate("/") // ensure landing page
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
      }, 150)
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const handleNavTo = (path, hash) => {
    if (hash) {
      // if hash targets landing page, reuse handleScroll
      if (hash.startsWith("#")) return handleScroll(hash)
    }

    if (window.location.pathname !== path) {
      navigate(path)
    } else if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
    }

    setIsOpen(false)
  }

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Fit Plan Hub
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {location.pathname === "/" ? (
            navLinksVisitor.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScroll(link.hash)}
                className="hover:text-gray-300 transition"
              >
                {link.name}
              </button>
            ))
          ) : (
            token && role === "trainer" && (
            <>
              <button onClick={() => handleNavTo("/trainer")} className="hover:text-gray-300">
                Home
              </button>
              <button onClick={() => handleNavTo("/trainer")} className="hover:text-gray-300">
                Plans
              </button>
              <button onClick={() => handleNavTo("/trainer")} className="hover:text-gray-300">
                Trainee
              </button>
            </>
            )
          )}

          {location.pathname !== "/" && token && role === "user" && (
            <>
              <button onClick={() => handleNavTo("/user")} className="hover:text-gray-300">
                Home
              </button>
              <button onClick={() => handleNavTo("/user")} className="hover:text-gray-300">
                Feed
              </button>
              <button onClick={() => handleScroll("#trainers")} className="hover:text-gray-300">
                Trainers
              </button>
              <button onClick={() => handleNavTo("/user")} className="hover:text-gray-300">
                My Plan
              </button>
            </>
          )}

          {location.pathname === "/" ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black"
              >
                Sign Up
              </Link>
            </div>
          ) : !token ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => (role === "trainer" ? navigate("/trainer") : navigate("/user"))}
                className="ml-4 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold"
                title="Profile"
              >
                {userInitial}
              </button>

              <button
                onClick={handleLogout}
                className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black"
                title="Logout"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 py-4 space-y-3 bg-black">
          {location.pathname === "/" &&
            navLinksVisitor.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScroll(link.hash)}
                className="block w-full text-left hover:text-gray-300"
              >
                {link.name}
              </button>
            ))}

          {location.pathname !== "/" && token && role === "trainer" && (
            <>
              <button onClick={() => handleNavTo("/trainer")} className="block w-full text-left">
                Home
              </button>
              <button onClick={() => handleNavTo("/trainer")} className="block w-full text-left">
                Plans
              </button>
              <button onClick={() => handleNavTo("/trainer")} className="block w-full text-left">
                Trainee
              </button>
            </>
          )}

          {location.pathname !== "/" && token && role === "user" && (
            <>
              <button onClick={() => handleNavTo("/user")} className="block w-full text-left">
                Home
              </button>
              <button onClick={() => handleNavTo("/user")} className="block w-full text-left">
                Feed
              </button>
              <button onClick={() => handleScroll("#trainers")} className="block w-full text-left">
                Trainers
              </button>
              <button onClick={() => handleNavTo("/user")} className="block w-full text-left">
                My Plan
              </button>
            </>
          )}

          {location.pathname === "/" ? (
            <>
              <Link to="/login" className="block border px-6 py-2 rounded-md text-center">
                Login
              </Link>
              <Link to="/signup" className="block border px-6 py-2 rounded-md text-center">
                Sign Up
              </Link>
            </>
          ) : !token ? (
            <>
              <Link to="/login" className="block border px-6 py-2 rounded-md text-center">
                Login
              </Link>
              <Link to="/signup" className="block border px-6 py-2 rounded-md text-center">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="mt-3 text-center">
              <button
                onClick={() => (role === "trainer" ? navigate("/trainer") : navigate("/user"))}
                className="mx-auto w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold"
              >
                {userInitial}
              </button>

              <button
                onClick={handleLogout}
                className="block mt-3 border px-6 py-2 rounded-md text-center mx-auto"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
