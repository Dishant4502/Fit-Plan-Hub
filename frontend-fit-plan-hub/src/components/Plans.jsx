import { Check } from "lucide-react"

export default function Plans() {

  // 🔐 Subscription check
  const isSubscribed = localStorage.getItem("isSubscribed") === "true"

  const plans = [
    {
      name: "Basic",
      trainer: "Sarah Johnson",
      price: "Rs29",
      period: "month",
      description: "Perfect for beginners starting their fitness journey",
      features: [
        "Access to 100+ basic plans",
        "Follow up to 3 trainers",
        "Community support",
        "Weekly progress tracking",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Pro",
      trainer: "Mike Chen",
      price: "Rs59",
      period: "month",
      description: "For serious fitness enthusiasts",
      features: [
        "Access to 500+ plans",
        "Follow unlimited trainers",
        "Priority support",
        "Daily progress tracking",
        "Video consultations",
        "Nutrition guidance",
        "Custom workout plans",
      ],
      popular: true,
    },
    {
      name: "Elite",
      trainer: "Emily Rodriguez",
      price: "Rs99",
      period: "month",
      description: "Ultimate package for transformation",
      features: [
        "Access to all premium plans",
        "1-on-1 trainer sessions",
        "24/7 priority support",
        "Real-time tracking",
        "Personalized meal plans",
        "Monthly body analysis",
        "Exclusive community",
        "Supplement guidance",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Choose Your Plan</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Select the perfect plan for your fitness journey
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-900 rounded-lg p-8 relative Rs{
                plan.popular ? "ring-2 ring-purple-500 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              {/* Always Visible */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-400 mb-2">
                  Trainer: <span className="text-purple-400">{plan.trainer}</span>
                </p>
                <div className="flex justify-center items-baseline">
                  <span className="text-5xl font-bold text-purple-500">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
              </div>

              {/* 🔓 Subscribed Users Only */}
              {isSubscribed ? (
                <>
                  <p className="text-gray-400 text-sm mb-6 text-center">
                    {plan.description}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check
                          className="text-purple-500 mr-3 mt-1"
                          size={20}
                        />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-bold transition Rs{
                      plan.popular
                        ? "bg-purple-500 hover:bg-purple-600"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    Get Started
                  </button>
                </>
              ) : (
                /* 🔒 Non-Subscriber Message */
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500 mb-4">
                    Subscribe to view full plan details
                  </p>
                  <button className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg font-bold">
                    Subscribe Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
