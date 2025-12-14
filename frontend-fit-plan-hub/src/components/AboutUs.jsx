

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About Fit Plan Hub</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your ultimate platform connecting fitness enthusiasts with certified trainers to achieve amazing results
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-purple-500">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              We believe everyone deserves access to quality fitness guidance. Fit Plan Hub bridges the gap between
              certified trainers and fitness enthusiasts, making professional training accessible, affordable, and
              effective for everyone.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-purple-500">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              To create a global community where fitness transformation is achievable for everyone through expert
              guidance, personalized plans, and continuous support from certified professionals.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-500 mb-2">500+</div>
            <div className="text-gray-400">Certified Trainers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-500 mb-2">10K+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-500 mb-2">1000+</div>
            <div className="text-gray-400">Fitness Plans</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-500 mb-2">50K+</div>
            <div className="text-gray-400">Transformations</div>
          </div>
        </div>

        
      </div>
    </div>
  )
}
