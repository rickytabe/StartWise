import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaBrain } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Mentors", href: "/explore-mentors" },
    { label: "AI Mentor", href: "/ai-mentor" },
    { label: "Internships", href: "/internships" },
    {label: "Pricing", href: "/pricing" },
  ];

  const dashboardLink = {
    label: "Dashboard",
    href: "/mentee_dashboard/profile",
  };

  return (
    <nav className=" fixed w-full bg-white shadow-sm z-100">
      <div className="flex justify-between items-center p-4 md:px-8">
        {/* Animated Logo */}
        <div className="flex items-center space-x-2">
          <FaBrain className="text-blue-600 text-2xl" />
          <div className="text-xl font-bold flex space-x-[2px]">
            <span className="animate-pulse" style={{ animationDelay: "0s" }}>
              S
            </span>
            <span className="animate-pulse" style={{ animationDelay: "0.1s" }}>
              t
            </span>
            <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>
              a
            </span>
            <span className="animate-pulse" style={{ animationDelay: "0.3s" }}>
              r
            </span>
            <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>
              t
            </span>
            <span
              className="animate-pulse text-blue-600"
              style={{ animationDelay: "0.5s" }}
            >
              W
            </span>
            <span
              className="animate-pulse text-blue-600"
              style={{ animationDelay: "0.6s" }}
            >
              i
            </span>
            <span
              className="animate-pulse text-blue-600"
              style={{ animationDelay: "0.7s" }}
            >
              s
            </span>
            <span
              className="animate-pulse text-blue-600"
              style={{ animationDelay: "0.8s" }}
            >
              e
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-8">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.href}
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 font-semibold relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="h-6 w-px bg-gray-300" /> {/* Vertical separator */}
          <NavLink
            to={dashboardLink.href}
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? "text-blue-600 font-semibold relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-blue-600"
                  : "text-gray-800 hover:text-blue-600"
              }`
            }
          >
            {dashboardLink.label}
          </NavLink>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowLoginDropdown(!showLoginDropdown)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Login
            </button>

            {/* Login Dropdown */}
            {showLoginDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                <Link
                  to="/login/mentee"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowLoginDropdown(false)}
                >
                  As Mentee
                </Link>
                <Link
                  to="/login/mentor"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowLoginDropdown(false)}
                >
                  As Mentor
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/explore-mentors"
            className="px-6 py-3 bg-black text-white rounded-md flex items-center justify-center hover:bg-blue-500 transition-colors"
          >
            Find your mentor
            <span className="ml-2 animate-bounce">→</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Slides from top */}
      {isMenuOpen && (
        <div
          className="md:hidden bg-white absolute top-0 left-0 w-full h-50vw z-50 animate-slideIn"
          style={{ animation: "slideIn 0.3s ease-out" }}
        >
          <button
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <IoMdClose className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center pt-24 space-y-8">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.href}
                className={({ isActive }) =>
                  `text-2xl transition-colors ${
                    isActive
                      ? "text-blue-600 font-semibold relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-blue-600"
                      : "text-gray-800 hover:text-blue-600"
                  }`
                }
                onClick={toggleMenu}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="w-32 h-px bg-gray-300 my-2" />{" "}
            {/* Horizontal separator */}
            <NavLink
              to={dashboardLink.href}
              className={({ isActive }) =>
                `text-2xl transition-colors ${
                  isActive
                    ? "text-blue-600 font-semibold relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`
              }
              onClick={toggleMenu}
            >
              {dashboardLink.label}
            </NavLink>
            {/* Mobile Menu Login Buttons */}
            <div className="flex flex-col space-y-4 w-64">
              <div className="relative w-full">
                <button
                  className="w-full px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                >
                  Login
                </button>

                {showLoginDropdown && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                    <Link
                      to="/login/mentee"
                      className="block px-4 py-3 text-center text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setShowLoginDropdown(false);
                        toggleMenu();
                      }}
                    >
                      As Mentee
                    </Link>
                    <Link
                      to="/login/mentor"
                      className="block px-4 py-3 text-center text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setShowLoginDropdown(false);
                        toggleMenu();
                      }}
                    >
                      As Mentor
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/explore-mentors"
                className="px-6 py-3 bg-black text-white rounded-md flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                Find your mentor
                <span className="ml-2 animate-bounce">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
