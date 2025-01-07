import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { BASE_URL } from "../../Context/constant";

interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
}

export interface Vet {
  _id: string;
  name: string;
  location: string;
  specialization: string;
  certifications: string[];
  createdAt: Date;
  user: User;
}

export default function VetProfile() {
  const { vetId } = useAuth();
  const [vet, setVet] = useState<Vet | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchVet() {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/vets/${vetId}`);
      const data = await response.json();
      if (response.ok) {
        setVet(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch vet information");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchVet();
  }, [vetId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Vet Profile
        </h1>
        {vet ? (
          <div className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                <img
                  src="/vet.png" // Static image path
                  alt="Vet Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Vet Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Name:
              </h2>
              <p className="text-lg text-gray-600">{vet.name}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Location:
              </h2>
              <p className="text-lg text-gray-600">{vet.location}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Specialization:
              </h2>
              <p className="text-lg text-gray-600">{vet.specialization}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Certifications:
              </h2>
              <ul className="list-disc list-inside text-lg text-gray-600">
                {vet.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Created At:
              </h2>
              <p className="text-lg text-gray-600">
                {new Date(vet.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-600 text-center">Vet not found</p>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col lg:flex-row gap-4 justify-end">
          <Link
            to="/vet-profile/manage"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all text-center"
          >
            Manage Service Information
          </Link>
          <Link
            to="/vet-profile/article"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all text-center"
          >
            Article
          </Link>
        </div>
      </div>
    </div>
  );
}
