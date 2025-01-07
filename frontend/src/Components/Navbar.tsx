import { useNavigate } from "react-router-dom";
import {
  Menu,
  Home,
  User2,
  Phone,
  Briefcase,
  LogOut,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { userId, vetId, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-white flex items-center">
          VetFinder
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/"
            className="text-white hover:text-gray-200 flex items-center transition duration-300"
          >
            <Home className="mr-2" /> Home
          </a>
          {userId && (
            <a
              href="/profile"
              className="text-white hover:text-gray-200 flex items-center transition duration-300"
            >
              <User2 className="mr-2" /> Profile
            </a>
          )}
          {vetId && (
            <a
              href="/vet-profile"
              className="text-white hover:text-gray-200 flex items-center transition duration-300"
            >
              <Briefcase className="mr-2" /> Vet Profile
            </a>
          )}
          <a
            href="/contact"
            className="text-white hover:text-gray-200 flex items-center transition duration-300"
          >
            <Phone className="mr-2" /> Contact
          </a>
          <button
            onClick={() => navigate("/search")}
            className="text-white hover:text-gray-200 flex items-center transition duration-300"
          >
            <Search className="mr-2" /> Search
          </button>
        </div>

        {/* Desktop Login/Logout Button */}
        <div className="hidden md:block">
          {userId ? (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 flex items-center transition duration-300"
            >
              <LogOut className="mr-2" />
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-100 transition duration-300"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          title="Toggle Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-3 p-4">
            <li>
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 flex items-center transition duration-300"
              >
                <Home className="mr-2" />
                Home
              </a>
            </li>
            {userId && (
              <li>
                <a
                  href="/profile"
                  className="text-gray-700 hover:text-blue-600 flex items-center transition duration-300"
                >
                  <User2 className="mr-2" />
                  Profile
                </a>
              </li>
            )}
            {vetId && (
              <li>
                <a
                  href="/vet-profile"
                  className="text-gray-700 hover:text-blue-600 flex items-center transition duration-300"
                >
                  <Briefcase className="mr-2" />
                  Vet Profile
                </a>
              </li>
            )}
            <li>
              <a
                href="/contact"
                className="text-gray-700 hover:text-blue-600 flex items-center transition duration-300"
              >
                <Phone className="mr-2" />
                Contact
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/search");
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center justify-center transition duration-300"
              >
                <Search className="mr-2" />
                Search
              </button>
            </li>
            <li>
              {userId ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                    navigate("/login");
                  }}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 flex items-center justify-center transition duration-300"
                >
                  <LogOut className="mr-2" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center justify-center transition duration-300"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
