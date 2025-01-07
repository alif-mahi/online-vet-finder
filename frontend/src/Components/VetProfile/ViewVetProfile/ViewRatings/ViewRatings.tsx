import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Star } from "lucide-react";
import { BASE_URL } from "../../../../Context/constant";

interface Rating {
  user: { name: string; email: string };
  rating: number;
  review: string;
  createdAt: string;
}

export default function ViewRatings() {
  const { vet } = useParams();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRatings() {
      try {
        const response = await fetch(`${BASE_URL}/api/ratings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vet }),
        });

        const data = await response.json();

        if (response.ok) {
          setRatings(data);
        } else {
          toast.error(data.message || "Failed to fetch ratings.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching ratings.");
      } finally {
        setLoading(false);
      }
    }

    fetchRatings();
  }, [vet]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <p className="text-lg text-gray-600">Loading ratings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          Go Back
        </button>
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Ratings & Reviews
        </h1>
        {ratings.length === 0 ? (
          <p className="text-center text-gray-600">No ratings available.</p>
        ) : (
          <div className="space-y-6">
            {ratings.map((rating, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-400 transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      {rating.user.name}
                    </p>
                    <p className="text-sm text-gray-600">{rating.user.email}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={20}
                      className={`${
                        starIndex < rating.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-gray-800">{rating.review}</p>
                <p className="mt-4 text-sm text-gray-500">
                  {new Date(rating.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
