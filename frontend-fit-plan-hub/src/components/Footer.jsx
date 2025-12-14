export default function Footer() {
    return (
      <footer className="bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="text-2xl font-bold text-white">Fit Plan Hub</div>
              <p className="text-gray-400 text-sm">
                Transform your fitness journey with expert trainers and personalized plans.
              </p>
            </div>
  
            {/* Quick Links */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-400">Home</span>
                </li>
                <li>
                  <span className="text-gray-400">About Us</span>
                </li>
                <li>
                  <span className="text-gray-400">Plans</span>
                </li>
                <li>
                  <span className="text-gray-400">Trainers</span>
                </li>
                <li>
                  <span className="text-gray-400">Reviews</span>
                </li>
              </ul>
            </div> */}
  
          
  
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <span>123 Fitness Street, Gym City, GC 12345</span>
                </li>
                <li>
                  <span>support@Fit Plan Hub.com</span>
                </li>
                <li>
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Fit Plan Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
  