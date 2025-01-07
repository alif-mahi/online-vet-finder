import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import { toast } from "react-hot-toast";
import { Star, Send } from "lucide-react";
import { BASE_URL } from "../../../../Context/constant";

export default function Rate() {
  const { vet } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !review) {
      toast.error("Please provide both a rating and a review.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vet, user: userId, rating, review }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Rating submitted successfully!");
        navigate(`/vet-profile/${vet}`);
      } else {
        toast.error(data.message || "Failed to submit rating.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Rate Your Experience
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Section */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-4">
              Your Rating
            </label>
            <div className="flex items-center justify-center space-x-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <button
                  title="Rate"
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  onMouseEnter={() => setHoverRating(index + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-all duration-200"
                >
                  <Star
                    size={28}
                    className={`${
                      (hoverRating || rating) > index
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } hover:text-yellow-400`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Section */}
          <div>
            <label
              htmlFor="review"
              className="block text-lg font-medium text-gray-700 mb-4"
            >
              Your Review
            </label>
            <textarea
              id="review"
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Write your review here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit Review"}
            <Send className="inline ml-2" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
