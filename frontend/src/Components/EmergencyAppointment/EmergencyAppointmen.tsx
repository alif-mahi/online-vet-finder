import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../Context/constant";
import { ChevronUp, ChevronDown } from "lucide-react"; // Icons for minimize/expand

interface User {
  _id: string;
  name: string;
  address: string;
}

interface Vet {
  name: string;
  location: string;
  specialization: string;
}

export default function EmergencyAppointment() {
  const [user, setUser] = useState<User | null>(null);
  const [vet, setVet] = useState<Vet | null>(null); // Store found vet
  const [noVet, setNoVet] = useState<string | null>(null); // No vet found message
  const [isVetInfoExpanded, setIsVetInfoExpanded] = useState(true); // Control vet info visibility
  const [isTipsExpanded, setIsTipsExpanded] = useState(true); // Control tips visibility
  const user_id = localStorage.getItem("user_id");

  async function fetchUser() {
    const response = await fetch(`${BASE_URL}/api/users/${user_id}`);
    const data = await response.json();
    if (response.ok) {
      setUser(data);
    } else {
      toast.error(data.message);
    }
  }

  async function handleEmergencyAppointment() {
    if (!user || !user.address) {
      toast.error("User address not available");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/vets/emergency?address=${encodeURIComponent(
          user.address
        )}`
      );
      const data = await response.json();

      if (response.ok) {
        setVet(data.vets[0]); // Set the first matched vet
        setNoVet(null); // Clear the no-vet message
      } else {
        setVet(null); // Clear any previously found vet
        setNoVet(data.message); // Show no-vet message or tips
      }
    } catch (error) {
      console.error("Error fetching emergency info:", error);
      toast.error("Failed to fetch emergency appointment info");
    }
  }

  useEffect(() => {
    fetchUser();
  }, [user_id]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Emergency Appointment
        </h1>

        {user ? (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">Name:</p>
              <p className="text-gray-600">{user.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">Address:</p>
              <p className="text-gray-600">{user.address}</p>
            </div>

            <button
              onClick={handleEmergencyAppointment}
              className="w-full py-3 px-4 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all"
            >
              Find Emergency Vet
            </button>

            {vet && (
              <div className="mt-6 border border-gray-200 rounded-lg bg-gray-50">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => setIsVetInfoExpanded(!isVetInfoExpanded)}
                >
                  <h2 className="text-xl font-bold text-blue-700">
                    Emergency Vet Found
                  </h2>
                  <button className="text-gray-600 hover:text-blue-700">
                    {isVetInfoExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {isVetInfoExpanded && (
                  <div className="p-4 pt-0 space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Name:</span> {vet.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Location:</span>{" "}
                      {vet.location}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Specialization:</span>{" "}
                      {vet.specialization}
                    </p>
                  </div>
                )}
              </div>
            )}

            {noVet && (
              <div className="mt-6 border border-gray-200 rounded-lg bg-gray-50">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => setIsTipsExpanded(!isTipsExpanded)}
                >
                  <h2 className="text-xl font-bold text-red-600">
                    No Vets Found in Your Location
                  </h2>
                  <button className="text-gray-600 hover:text-blue-700">
                    {isTipsExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {isTipsExpanded && (
                  <div className="p-4 pt-0">
                    <p className="text-gray-600">{noVet}</p>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-blue-700 mb-2">
                        Emergency Care Tips:
                      </h3>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Stay calm and assess the situation.</li>
                        <li>
                          Contact an emergency vet or animal hospital
                          immediately.
                        </li>
                        <li>
                          Keep your pet warm and transport them carefully.
                        </li>
                        <li>
                          If necessary, perform first aid on your pet until help
                          arrives.
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-blue-700 mb-2">
                        Emergency Hotlines in Bangladesh:
                      </h3>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Animal Emergency Services: 01900-00000</li>
                        <li>Pet Care Emergency Line: 01800-11111</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
}
