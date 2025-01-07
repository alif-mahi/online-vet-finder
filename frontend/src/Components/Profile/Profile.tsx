import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../Context/constant";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
}

export default function Profile() {
  const user_id = localStorage.getItem("user_id");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  async function fetchProfile() {
    const response = await fetch(`${BASE_URL}/api/users/${user_id}`);
    const data = await response.json();
    if (response.ok) {
      setUser(data);
    } else {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [user_id]);

  return (
    <div className="min-h-screen-no-nav flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <img
            src="user.jpg" // Replace with your fixed image path
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Profile</h1>
        </div>

        {user ? (
          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">Name:</p>
              <p className="text-gray-600">{user.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">Email:</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">Address:</p>
              <p className="text-gray-600">{user.address}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">Joined:</p>
              <p className="text-gray-600">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 space-y-4">
              <button
                onClick={() => navigate("/mypets")}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all"
              >
                My Pets
              </button>
              <button
                onClick={() => navigate("/emergency-appointment")}
                className="w-full py-3 px-4 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all"
              >
                Find Emergency Appointment
              </button>
              <button
                onClick={() => navigate("/appointment-history")}
                className="w-full py-3 px-4 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
              >
                View Appointment History
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
}
