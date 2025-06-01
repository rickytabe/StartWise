
import { 
  FaTwitter, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h3 className="text-2xl font-bold ml-3">StartWise</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Transforming careers through personalized mentorship. 
              Connecting learners with industry experts to achieve 
              professional growth and success.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  Find a Mentor
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  Become a Mentor
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  Internships
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  Career Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  Webinars
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  Learning Paths
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="text-blue-600 mr-2 text-xs" />
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-600 mt-1 mr-3" />
                <span className="text-gray-400">
                  Buea, Cameroon<br />
                  Molyko Junction
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-blue-600 mr-3" />
                <span className="text-gray-400">(+237) 671353341</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-600 mr-3" />
                <span className="text-gray-400">info@startwise.com</span>
              </li>
            </ul>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get the latest updates and career tips
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 flex-grow"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 w-0.5 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                 
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MentorConnect. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;