"use client"

import { useState } from "react"
import { UserPlus, UserMinus, Star, Users } from "lucide-react"

export default function Trainee() {

  // 🔐 Auth check
  const isLoggedIn = !!localStorage.getItem("token")
  const userRole = localStorage.getItem("role") // expected: "user"

  // Mock trainer data
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Strength Training & HIIT",
      followers: 12500,
      rating: 4.9,
      experience: "8 years",
      image: "/female-fitness-trainer.jpg",
      isFollowing: false,
      bio: "Certified personal trainer specializing in strength building and high-intensity workouts",
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "Yoga & Flexibility",
      followers: 8300,
      rating: 4.8,
      experience: "6 years",
      image: "/male-yoga-instructor.jpg",
      isFollowing: false,
      bio: "Yoga instructor focused on mindfulness and flexibility for overall wellness",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      specialty: "Weight Loss & Cardio",
      followers: 15200,
      rating: 5.0,
      experience: "10 years",
      image: "/female-cardio-trainer.jpg",
      isFollowing: true,
      bio: "Weight loss expert helping clients achieve sustainable fitness transformations",
    },
  ])

  const handleFollowToggle = (trainerId) => {
    setTrainers((prev) =>
      prev.map((trainer) =>
        trainer.id === trainerId
          ? {
              ...trainer,
              isFollowing: !trainer.isFollowing,
              followers: trainer.isFollowing
                ? trainer.followers - 1
                : trainer.followers + 1,
            }
          : trainer
      )
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Meet Our Trainers</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connect with certified fitness professionals who will guide you through your transformation journey
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-all"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} />
                  <span className="text-sm font-bold">{trainer.rating}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{trainer.name}</h3>
                <p className="text-purple-500 font-semibold mb-3">
                  {trainer.specialty}
                </p>
                <p className="text-gray-400 text-sm mb-4">{trainer.bio}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{trainer.followers.toLocaleString()} followers</span>
                  </div>
                  <span>{trainer.experience}</span>
                </div>

                {/* 🔐 Follow Button (ONLY for logged-in users) */}
                {isLoggedIn && userRole === "user" && (
                  <button
                    onClick={() => handleFollowToggle(trainer.id)}
                    className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all Rs{
                      trainer.isFollowing
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-purple-500 hover:bg-purple-600"
                    }`}
                  >
                    {trainer.isFollowing ? (
                      <>
                        <UserMinus size={20} />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus size={20} />
                        Follow
                      </>
                    )}
                  </button>
                )}

                {/* 🔒 Message for non-logged users */}
                {!isLoggedIn && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Login as a user to follow trainers
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
