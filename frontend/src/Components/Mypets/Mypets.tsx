import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit3, Trash2, PlusCircle } from "lucide-react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Context/constant";

interface Pet {
  _id: string;
  name: string;
  picture: string;
  species: string;
  breed: string;
  age: number;
  sex: string;
  vaccinations_status: string;
  last_vaccination_date: Date;
  health_status: string;
}

export default function Mypets() {
  const user_id = localStorage.getItem("user_id");
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchPets() {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/mypets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      });
      const data = await response.json();
      if (response.ok) {
        setPets(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch pets.");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPets();
  }, [user_id]);

  async function deletePet(id: string) {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/pets/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchPets();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete pet.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Spin size="large" fullscreen />
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Pets</h1>
          <button
            onClick={() => navigate("/newpet")}
            title="Add New Pet"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Pet
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <img
                src={pet.picture}
                alt={pet.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {pet.name}
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Species:</span>{" "}
                    {pet.species}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Breed:</span> {pet.breed}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Age:</span> {pet.age},{" "}
                    <span className="font-semibold">Sex:</span> {pet.sex}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Health Status:</span>{" "}
                    {pet.health_status}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Vaccination Status:</span>{" "}
                    {pet.vaccinations_status}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Last Vaccination:</span>{" "}
                    {new Date(pet.last_vaccination_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => navigate(`/editpet/${pet._id}`)}
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-all"
                  >
                    <Edit3 className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deletePet(pet._id)}
                    className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
