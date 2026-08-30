// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import QAItem from "../components/QAItems";
import EmptyState from "../components/EmptyState";
import ErrorBanner from "../components/ErrorBanner";
import GenerateButton from "../components/GenerateButton";
import SkeletonCard from "../components/SkeletonCard";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";

// Error message mapper for better user feedback
const getErrorMessage = (err) => {
  console.error("API Error:", err);

  if (err.response) {
    const status = err.response.status;
    const data = err.response.data;

    switch (status) {
      case 401:
        return "Session expired. Please login again.";
      case 403:
        return "You don't have permission to access this resource.";
      case 404:
        return "Session not found.";
      case 409:
        return data?.message || "Generation already in progress. Please wait...";
      case 429:
        return "Too many requests. Please wait a moment before trying again.";
      case 503:
        return "AI service is temporarily unavailable. Please try again in a few moments.";
      case 500:
        return data?.message || "Server error. Please try again.";
      default:
        return data?.message || data?.error || `Server error: ${status}`;
    }
  }

  if (err.request) {
    return "Cannot reach server. Please check your internet connection.";
  }

  return err.message || "Something went wrong. Please try again.";
};

const InterviewPrep = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [lastAttempt, setLastAttempt] = useState(0);

  const fetchQuestions = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get(API_PATHS.SESSION.GET_ONE(id));
      const session = res.data?.session;
      setSessionInfo(session);
      setQuestions(session?.questions || []);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }
      setFetchError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  const generateQuestions = async () => {
    // Prevent spam - 3 second cooldown between attempts
    const now = Date.now();
    if (now - lastAttempt < 3000) {
      toast.error("Please wait a moment before trying again.");
      return;
    }

    // Prevent multiple simultaneous requests
    if (generating) {
      return;
    }

    setGenerating(true);
    setLastAttempt(now);

    try {
      await axios.post(API_PATHS.AI.GENERATE_QUESTIONS, { sessionId: id });
      await fetchQuestions();
      toast.success("Questions generated successfully!");
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage, {
        duration: err.response?.status === 503 ? 8000 : 4000, // Longer display for 503
        style: {
          background: err.response?.status === 503 ? "#fef3c7" : undefined, // Yellow for 503
          color: err.response?.status === 503 ? "#92400e" : undefined,
        },
      });
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchQuestions();
  }, [fetchQuestions, id]);

  return (
    <div className="bg-white/10 backdrop-blur-md min-h-screen relative overflow-hidden">
      <Navbar />
      <Toaster
        position="top-center"
        toastOptions={{ className: "!text-sm !font-medium" }}
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            {sessionInfo && (
              <>
                <div className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold mb-3">
                  {sessionInfo.role}
                </div>
                <p className="text-sm text-gray-500 font-medium mb-2">
                  {sessionInfo.experience} experience
                </p>
              </>
            )}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Interview Questions
            </h1>
            {!loading && !fetchError && (
              <p className="text-gray-600">
                {questions.length > 0
                  ? `${questions.length} question${questions.length !== 1 ? "s" : ""} ready for practice`
                  : "Generate questions to get started"}
              </p>
            )}
          </div>

          <GenerateButton
            onClick={generateQuestions}
            generating={generating}
            loading={loading}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : fetchError ? (
          <ErrorBanner message={fetchError} onRetry={fetchQuestions} />
        ) : questions.length === 0 ? (
          <EmptyState
            onGenerate={generateQuestions}
            generating={generating}
          />
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6 p-4 bg-sky-50 rounded-lg border border-sky-200">
                <div className="text-sm font-semibold text-gray-700">
                  📊 Question Statistics
                </div>
                <div className="text-sm text-gray-600">
                  Showing {questions.length} question{questions.length !== 1 ? "s" : ""}
                </div>
              </div>
              {questions.map((q, index) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <QAItem key={q._id} item={q} index={index}/>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;
