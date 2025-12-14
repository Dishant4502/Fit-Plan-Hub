"use client"

import { useState, useEffect } from "react"
import api from "../../api/axios"



export default function TrainerDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
  })

  // Stats for the trainer
  
  const [followersCount, setFollowersCount] = useState(0)
  const [trainerProfile, setTrainerProfile] = useState({
    name: "",
    specialization: ""
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCreatePlan = (e) => {
    e.preventDefault()
    ;(async () => {
      try {
        setLoading(true)
        setError("")
        const token = localStorage.getItem("token")
        const { data } = await api.post(
          "/plans",
          {
            title: formData.title,
            description: formData.description,
            price: Number.parseFloat(formData.price),
            duration: formData.duration,
          },
          { headers: { Authorization: token } }
        )
        setPlans((p) => [data, ...p])
        setFormData({ title: "", description: "", price: "", duration: "" })
        setShowCreateModal(false)
      } catch (err) {
        setError(err.response?.data?.message || "Failed to create plan")
      } finally {
        setLoading(false)
      }
    })()
  }

  const handleEditPlan = (plan) => {
    setEditingPlan(plan)
    setFormData({
      title: plan.title,
      description: plan.description,
      price: plan.price.toString(),
      duration: plan.duration,
    })
    setShowCreateModal(true)
  }

  const handleUpdatePlan = (e) => {
    e.preventDefault()
    ;(async () => {
      try {
        setLoading(true)
        setError("")
        const token = localStorage.getItem("token")
        const { data } = await api.put(
          `/plans/${editingPlan._id || editingPlan.id}`,
          {
            title: formData.title,
            description: formData.description,
            price: Number.parseFloat(formData.price),
            duration: formData.duration,
          },
          { headers: { Authorization: token } }
        )
        setPlans((prev) => prev.map((pl) => (pl._id === data._id || pl.id === data._id ? data : pl)))
        setFormData({ title: "", description: "", price: "", duration: "" })
        setShowCreateModal(false)
        setEditingPlan(null)
      } catch (err) {
        setError(err.response?.data?.message || "Failed to update plan")
      } finally {
        setLoading(false)
      }
    })()
  }

  const handleDeletePlan = (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return

    ;(async () => {
      try {
        setLoading(true)
        setError("")
        const token = localStorage.getItem("token")
        await api.delete(`/plans/${id}`, { headers: { Authorization: token } })
        setPlans((prev) => prev.filter((plan) => plan._id !== id && plan.id !== id))
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete plan")
      } finally {
        setLoading(false)
      }
    })()
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        setError("")
        const token = localStorage.getItem("token")
        const [{ data: plansData }, { data: followersData }] = await Promise.all([
          api.get("/plans/mine", { headers: { Authorization: token } }),
          api.get("/users/followers/me", { headers: { Authorization: token } })
        ])
        setPlans(plansData)
        setFollowersCount(followersData.length)
        
        // Fetch profile data separately
        try {
          const { data: profileData } = await api.get("/auth/profile", { headers: { Authorization: token } })
          setTrainerProfile({
            name: profileData.name,
            specialization: profileData.specialization || ""
          })
        } catch (profileErr) {
          console.error("Profile fetch error:", profileErr)
          // Continue without profile data
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load plans")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleCloseModal = () => {
    setShowCreateModal(false)
    setEditingPlan(null)
    setFormData({ title: "", description: "", price: "", duration: "" })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      

      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Trainer Dashboard</h1>
          <p className="text-gray-400">Manage your fitness plans and track your progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">Total Plans</div>
            <div className="text-3xl font-bold text-purple-500">{plans.length}</div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">Followers</div>
            <div className="text-3xl font-bold text-purple-500">{followersCount}</div>
          </div>
          

        </div>

        {/* Create Plan Button */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Fitness Plans</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            + Create New Plan
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div key={plan._id || plan.id} className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{plan.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Price:</span>
                  <span className="font-semibold text-purple-500">Rs{plan.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span className="font-semibold">{plan.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Students:</span>
                  <span className="font-semibold">{plan.students}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditPlan(plan)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlan(plan._id || plan.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trainer Profile Section */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
          <h2 className="text-2xl font-bold mb-6">Trainer Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <div className="text-gray-400 text-sm mb-1">Name</div>
                <div className="text-lg font-semibold">{trainerProfile.name}</div>
              </div>
              <div className="mb-4">
                <div className="text-gray-400 text-sm mb-1">Specialization</div>
                <div className="text-lg font-semibold">{trainerProfile.specialization}</div>
              </div>
             
            </div>
            <div>
              <div className="mb-4">
                <div className="text-gray-400 text-sm mb-1">Total Followers</div>
                <div className="text-lg font-semibold text-purple-500">{followersCount}</div>
              </div>
              <div className="mb-4">
                <div className="text-gray-400 text-sm mb-1">Active Plans</div>
                <div className="text-lg font-semibold text-purple-500">{plans.length}</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-8 border border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingPlan ? "Edit Plan" : "Create New Plan"}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white text-2xl">
                ×
              </button>
            </div>
            <form onSubmit={editingPlan ? handleUpdatePlan : handleCreatePlan}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="e.g., Weight Loss Program"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="Describe your fitness plan in detail..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (Rs)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="99.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="e.g., 12 weeks, 3 months"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {editingPlan ? "Update Plan" : "Create Plan"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
    </div>
  )
}
