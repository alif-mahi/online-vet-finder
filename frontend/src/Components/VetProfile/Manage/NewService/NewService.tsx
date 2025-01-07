import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../../Context/constant";

export default function NewService() {
  const vet_id = localStorage.getItem("vet_id") || "";
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.cost) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, vet: vet_id }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Service added successfully!");
        setFormData({
          name: "",
          description: "",
          cost: "",
        });
      } else {
        toast.error(data.message || "Failed to add service.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
          Add New Service
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Service Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter service name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Provide a brief description"
              required
            />
          </div>

          {/* Cost */}
          <div>
            <label
              htmlFor="cost"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Cost ($)
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter service cost"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row gap-4 justify-end">
            <Link
              to="/vet-profile/manage"
              className="w-full lg:w-auto px-6 py-3 text-lg font-semibold bg-gray-400 text-white rounded-lg shadow-lg hover:bg-gray-500 transition-all text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`w-full lg:w-auto px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Service
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
