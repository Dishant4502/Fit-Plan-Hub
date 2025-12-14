import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ✅ IMPORT IMAGES
import image1 from "../assets/image1.jpeg"
import image2 from "../assets/image2.png"
import image3 from "../assets/image3.jpeg"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { image: image1 },
    {
      title: "TRANSFORM YOUR",
      subtitle: "BODY WITH",
      highlight: "EXPERT PLANS!",
      image: image2,
    },
    {
      title: "ACHIEVE YOUR",
      subtitle: "FITNESS",
      highlight: "GOALS TODAY!",
      image: image3,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 Rs{
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={`Slide Rs{index + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-6xl font-black italic">{slide.title}</h1>
              <h2 className="text-6xl font-black italic">{slide.subtitle}</h2>
              <h2 className="text-6xl font-black italic">{slide.highlight}</h2>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 z-10 bg-white/30 p-3 rounded-full"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev + 1) % slides.length)
        }
        className="absolute right-4 top-1/2 z-10 bg-white/30 p-3 rounded-full"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  )
}
