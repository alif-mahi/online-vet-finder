import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Trash2 } from "lucide-react";
import { BASE_URL } from "../../Context/constant";

interface Vet {
  _id: string;
  name: string;
}

interface Article {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  vet: Vet;
}

interface User {
  _id: string;
  name: string;
}

interface Comment {
  _id: string;
  user: User;
  article: string;
  content: string;
  createdAt: string;
}

export default function OneArticle() {
  const { article } = useParams();
  const { userId } = useAuth();
  const [articleData, setArticleData] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchArticle() {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/articles/getArticleById`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: article }),
      });

      const data = await response.json();

      if (response.ok) {
        setArticleData(data);
      } else {
        toast.error(data.message || "Failed to fetch article.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the article.");
    }
    setLoading(false);
  }

  async function fetchComments() {
    try {
      const response = await fetch(`${BASE_URL}/api/comments/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article }),
      });

      const data = await response.json();

      if (response.ok) {
        setComments(data);
      } else {
        toast.error(data.message || "Failed to fetch comments.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching comments.");
    }
  }

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();

    if (!commentContent) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userId,
          article,
          content: commentContent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Comment added successfully!");
        setCommentContent("");
        fetchComments();
      } else {
        toast.error(data.message || "Failed to add comment.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the comment.");
    }
  }

  async function handleDeleteComment(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/api/comments`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Comment deleted successfully!");
        fetchComments();
      } else {
        toast.error(data.message || "Failed to delete comment.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the comment.");
    }
  }

  useEffect(() => {
    fetchArticle();
    fetchComments();
  }, [article]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!articleData) {
    return (
      <div className="text-center text-gray-600">
        <p>Article not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Article Section */}
        <div className="bg-white shadow-xl rounded-xl p-8 border-l-8 border-blue-500 transform transition-all hover:shadow-2xl">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            {articleData.title}
          </h1>
          <p className="text-gray-700 leading-relaxed">{articleData.content}</p>
          <p className="mt-6 text-sm text-gray-500">
            Published by:{" "}
            <span className="font-semibold">{articleData.vet.name}</span> on{" "}
            {new Date(articleData.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Comments</h2>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="space-y-4">
            <textarea
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows={4}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write your comment here..."
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Add Comment
            </button>
          </form>

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-gray-600 text-center">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-400 transform transition-all hover:shadow-xl"
                >
                  <p className="text-gray-800 leading-relaxed">
                    {comment.content}
                  </p>
                  <p className="mt-4 text-sm text-gray-500">
                    - <span className="font-semibold">{comment.user.name}</span>{" "}
                    on {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                  {comment.user._id === userId && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="mt-4 text-sm text-red-500 hover:text-red-600 flex items-center transition-all"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
