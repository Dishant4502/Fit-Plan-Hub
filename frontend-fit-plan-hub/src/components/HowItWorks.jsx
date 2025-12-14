const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your account as a trainer or fitness enthusiast",
    },
    {
      number: 2,
      title: "Browse Plans",
      description: "Explore hundreds of expertly-crafted fitness plans",
    },
    {
      number: 3,
      title: "Subscribe",
      description: "Subscribe to plans from certified trainers",
    },
    {
      number: 4,
      title: "Transform",
      description: "Follow your plan and achieve amazing results",
    },
  ]

  return (
    <section className="bg-black py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">How It Works</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Steps */}
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-4">
                <div className="shrink-0 w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Feature Card */}
          <div className="bg-gradient-to-br from-purple-400 to-purple-300 rounded-3xl p-12 md:p-16 flex flex-col items-center justify-center min-h-[400px]">
            <svg
              className="w-32 h-32 mb-8 text-purple-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <p className="text-purple-900 text-xl font-medium text-center">Your transformation starts here</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
