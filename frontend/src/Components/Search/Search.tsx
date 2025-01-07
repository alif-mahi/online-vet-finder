import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { BASE_URL } from "../../Context/constant";

interface Service {
  _id: string;
  name: string;
  description: string;
  cost: number;
  vet: {
    _id: string;
    name: string;
    location: string;
  };
}

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const { vetId } = useAuth();

  const handleSearch = async () => {
    if (!searchText.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/services/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchText }),
      });

      const data = await response.json();
      if (response.ok) {
        setServices(data);
      } else {
        toast.error(data.message || "Failed to fetch services.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex mb-8">
          <input
            type="text"
            placeholder="Search for services..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSearch}
            className="px-8 bg-indigo-600 text-white font-bold rounded-r-lg hover:bg-indigo-700 transition-all flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        {services.length > 0 ? (
          <div className="space-y-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {service.name}
                </h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to={
                    service.vet._id === vetId
                      ? "/vet-profile"
                      : `/vet-profile/${service.vet._id}`
                  }
                  className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-all"
                >
                  <span className="mr-2">${service.cost}</span>
                  <span className="text-gray-500">•</span>
                  <span className="ml-2">
                    {service.vet.name} ({service.vet.location})
                  </span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-gray-500 text-center mt-12 text-lg">
              No services found. Try another search term.
            </p>
          )
        )}
      </div>
    </div>
  );
}
