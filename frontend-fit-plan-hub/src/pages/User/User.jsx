"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../api/axios"

export default function User() {
  const [activeTab, setActiveTab] = useState("all-plans")
  const [subscribedPlans, setSubscribedPlans] = useState([])
  const [followedTrainers, setFollowedTrainers] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedTrainerProfile, setSelectedTrainerProfile] = useState(null)
  const [allPlans, setAllPlans] = useState([])
  const [plansLoading, setPlansLoading] = useState(false)
  const [plansError, setPlansError] = useState(null)

  // Real data: trainers derived from plans in DB
  const [trainers, setTrainers] = useState([])
  const [trainersLoading, setTrainersLoading] = useState(false)
  const [trainersError, setTrainersError] = useState(null)

  useEffect(() => {
    const fetchPlans = async () => {
      setPlansLoading(true)
      setPlansError(null)
      try {
        const res = await api.get("/plans")
        const mapped = res.data.map((p) => ({
          id: p._id,
          title: p.title,
          trainer: p.trainer?.name || "Unknown",
          trainerId: p.trainer?._id || p.trainer,
          price: p.price,
          duration: p.duration,
          description: p.description,
          fullDetails: p.fullDetails || "",
        }))
        setAllPlans(mapped)
        // derive trainers from plans
        try {
          setTrainersLoading(true)
          const map = {}
          mapped.forEach((p) => {
            const id = p.trainerId
            if (!id) return
            if (!map[id]) map[id] = { id, name: p.trainer, plans: 0 }
            map[id].plans += 1
          })
          const trainersArr = Object.values(map)
          // fetch followers count for each trainer (best-effort)
          await Promise.all(
            trainersArr.map(async (t) => {
              try {
                const r = await api.get(`/users/followers/${t.id}`)
                t.followers = Array.isArray(r.data) ? r.data.length : 0
              } catch (e) {
                t.followers = 0
              }
            }),
          )
          setTrainers(trainersArr)
        } catch (e) {
          setTrainersError(e?.response?.data?.message || e.message)
        } finally {
          setTrainersLoading(false)
        }
      } catch (err) {
        setPlansError(err?.response?.data?.message || err.message)
      } finally {
        setPlansLoading(false)
      }
    }

    fetchPlans()
  }, [])

  // fetch trainers the current user is following (if authenticated)
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await api.get("/users/following")
        const ids = res.data.map((t) => t._id || t.id)
        setFollowedTrainers(ids)
      } catch (e) {
        // not authenticated or no following - ignore
      }
    }

    fetchFollowing()
  }, [])

  const toggleFollow = async (trainerId) => {
    try {
      if (followedTrainers.includes(trainerId)) {
        await api.post(`/users/unfollow/${trainerId}`)
        setFollowedTrainers((prev) => prev.filter((id) => id !== trainerId))
      } else {
        await api.post(`/users/follow/${trainerId}`)
        setFollowedTrainers((prev) => [...prev, trainerId])
      }
    } catch (err) {
      console.error("follow/unfollow error:", err?.response?.data || err.message)
      setFollowedTrainers((prev) =>
        prev.includes(trainerId) ? prev.filter((id) => id !== trainerId) : [...prev, trainerId],
      )
    }
  }

  const openPlanDetails = (plan) => {
    setSelectedPlan(plan)
  }

  const closePlanDetails = () => {
    setSelectedPlan(null)
  }

  const handleSubscribe = (plan) => {
    setShowPaymentModal(true)
    setSelectedPlan(plan)
  }

  const processPayment = () => {
    if (selectedPlan) {
      setSubscribedPlans((prev) => [...prev, selectedPlan.id])
      setShowPaymentModal(false)
      setSelectedPlan(null)
      ;(async () => {
        try {
          await api.post(`/subscriptions/subscribe/${selectedPlan.id}`)
        } catch (err) {
          console.error("subscribe error:", err?.response?.data || err.message)
        }
      })()
      alert("Payment successful! You now have full access to this plan.")
    }
  }

  const openTrainerProfile = (trainerId) => {
    const trainer = trainers.find((t) => String(t.id) === String(trainerId))
    setSelectedTrainerProfile(trainer)
  }

  const closeTrainerProfile = () => {
    setSelectedTrainerProfile(null)
  }

  const isSubscribed = (planId) => subscribedPlans.includes(planId)

  const displayPlans = allPlans

  const filteredPlans =
    activeTab === "all-plans"
      ? displayPlans
      : activeTab === "my-feed"
        ? displayPlans.filter((plan) => followedTrainers.includes(plan.trainerId))
        : displayPlans.filter((plan) => subscribedPlans.includes(plan.id))

  return (
    <div className="min-h-screen bg-black text-white">
     
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome Back, Learner!</h1>
          <p className="text-gray-400">Explore plans, follow trainers, and achieve your fitness goals.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-gray-400 text-sm mb-2">Subscribed Plans</h3>
            <p className="text-3xl font-bold text-purple-500">{subscribedPlans.length}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-gray-400 text-sm mb-2">Following Trainers</h3>
            <p className="text-3xl font-bold text-purple-500">{followedTrainers.length}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-gray-400 text-sm mb-2">Available Plans</h3>
            <p className="text-3xl font-bold text-purple-500">{displayPlans.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-4 border-b border-gray-800">
            <button
              onClick={() => setActiveTab("all-plans")}
              className={`px-4 py-3 font-medium transition ${
                activeTab === "all-plans"
                  ? "text-purple-500 border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All Plans
            </button>
            <button
              onClick={() => setActiveTab("my-feed")}
              className={`px-4 py-3 font-medium transition ${
                activeTab === "my-feed"
                  ? "text-purple-500 border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              My Feed
            </button>
            <button
              onClick={() => setActiveTab("subscribed")}
              className={`px-4 py-3 font-medium transition ${
                activeTab === "subscribed"
                  ? "text-purple-500 border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Subscribed
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                    <button
                      onClick={() => openTrainerProfile(plan.trainerId)}
                      className="text-purple-400 hover:text-purple-300 text-sm transition"
                    >
                      by {plan.trainer}
                    </button>
                  </div>
                  {isSubscribed(plan.id) && (
                    <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">Subscribed</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-purple-500">Rs{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.duration}</span>
                </div>
                <div className="flex gap-2">
                  {isSubscribed(plan.id) ? (
                    <button
                      onClick={() => openPlanDetails(plan)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
                    >
                      View Full Details
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => openPlanDetails(plan)}
                        className="flex-1 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleSubscribe(plan)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
                      >
                        Subscribe
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trainers Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Discover Trainers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{trainer.name}</h3>
                    <p className="text-purple-400 text-sm">{trainer.specialty}</p>
                  </div>
                  <button
                    onClick={() => toggleFollow(trainer.id)}
                    className={`px-4 py-2 rounded-lg transition ${
                      followedTrainers.includes(trainer.id)
                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {followedTrainers.includes(trainer.id) ? "Following" : "Follow"}
                  </button>
                </div>
                <div className="flex gap-4 text-sm text-gray-400 mb-4">
                  <span>{trainer.followers} Followers</span>
                  <span>{trainer.plans} Plans</span>
                </div>
                <button
                  onClick={() => openTrainerProfile(trainer.id)}
                  className="w-full bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Details Modal */}
      {selectedPlan && !showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedPlan.title}</h2>
                  <p className="text-purple-400">by {selectedPlan.trainer}</p>
                </div>
                <button onClick={closePlanDetails} className="text-gray-400 hover:text-white text-2xl transition">
                  ×
                </button>
              </div>
              <div className="mb-6">
                <p className="text-gray-400 mb-4">{selectedPlan.description}</p>
                {isSubscribed(selectedPlan.id) ? (
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-purple-400">Full Plan Details:</h3>
                    <p className="text-gray-300">{selectedPlan.fullDetails}</p>
                  </div>
                ) : (
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 mb-4">Subscribe to view full plan details and access all features.</p>
                    <button
                      onClick={() => handleSubscribe(selectedPlan)}
                      className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition"
                    >
                      Subscribe for Rs{selectedPlan.price}
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-purple-400 font-bold text-xl">Rs{selectedPlan.price}</span>
                <span className="text-gray-400">{selectedPlan.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
            <div className="mb-6">
              <p className="text-gray-400 mb-2">Plan: {selectedPlan.title}</p>
              <p className="text-gray-400 mb-4">Amount: Rs{selectedPlan.price}</p>
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-400 mb-2">This is a simulated payment</p>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-2"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg"
                  />
                  <input type="text" placeholder="CVV" className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                className="flex-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trainer Profile Modal */}
      {selectedTrainerProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedTrainerProfile.name}</h2>
                  <p className="text-purple-400 text-lg">{selectedTrainerProfile.specialty}</p>
                </div>
                <button onClick={closeTrainerProfile} className="text-gray-400 hover:text-white text-2xl transition">
                  ×
                </button>
              </div>
              <div className="flex gap-6 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Followers</p>
                  <p className="text-2xl font-bold">{selectedTrainerProfile.followers}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Plans</p>
                  <p className="text-2xl font-bold">{selectedTrainerProfile.plans}</p>
                </div>
              </div>
              <button
                onClick={() => toggleFollow(selectedTrainerProfile.id)}
                className={`w-full mb-6 px-6 py-3 rounded-lg transition ${
                  followedTrainers.includes(selectedTrainerProfile.id)
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {followedTrainers.includes(selectedTrainerProfile.id) ? "Unfollow" : "Follow"}
              </button>
              <div>
                <h3 className="text-xl font-bold mb-4">Plans by {selectedTrainerProfile.name}</h3>
                <div className="grid gap-4">
                  {allPlans
                    .filter((plan) => plan.trainerId === selectedTrainerProfile.id)
                    .map((plan) => (
                      <div key={plan.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold">{plan.title}</h4>
                          {isSubscribed(plan.id) && (
                            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">Subscribed</span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{plan.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-purple-400 font-bold">Rs{plan.price}</span>
                          <button
                            onClick={() => {
                              closeTrainerProfile()
                              openPlanDetails(plan)
                            }}
                            className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-lg text-sm transition"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
