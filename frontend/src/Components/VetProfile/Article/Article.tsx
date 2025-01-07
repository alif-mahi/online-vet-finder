import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PlusCircle, Trash2 } from "lucide-react";
import { Spin } from "antd";
import { useAuth } from "../../../Context/AuthContext";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../Context/constant";

interface Article {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Article() {
  const { vetId: vet } = useAuth();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchArticles() {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/articles/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vet }),
      });

      const data = await response.json();

      if (response.ok) {
        setArticles(data);
      } else {
        toast.error(data.message || "Failed to fetch articles.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching articles.");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchArticles();
  }, [vet]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleAddArticle(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error("Both title and content are required.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, vet }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Article added successfully!");
        setFormData({ title: "", content: "" });
        fetchArticles();
      } else {
        toast.error(data.message || "Failed to add article.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }

  async function handleDeleteArticle(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/api/articles`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Article deleted successfully!");
        fetchArticles();
      } else {
        toast.error(data.message || "Failed to delete article.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Add New Article Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
          <h1 className="text-2xl font-bold text-blue-700 mb-6">
            Add New Article
          </h1>
          <form onSubmit={handleAddArticle} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter article title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter article content"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Article
            </button>
          </form>
        </div>

        {/* Your Articles Section */}
        <div>
          <h1 className="text-2xl font-bold text-blue-700 mb-6">
            Your Articles
          </h1>
          {articles.length === 0 ? (
            <p className="text-center text-gray-600">No articles found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105"
                >
                  <Link
                    to={`/article/${article._id}`}
                    className="text-xl font-bold text-blue-700 mb-4 hover:underline"
                  >
                    {article.title}
                  </Link>
                  <p className="text-gray-600 mb-4">
                    {article.content.slice(0, 100)}
                    {article.content.length > 100 && "..."}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Published on:{" "}
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleDeleteArticle(article._id)}
                    className="w-full px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition-all flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
