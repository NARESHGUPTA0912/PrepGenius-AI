import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { BsPlus } from "react-icons/bs";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [topicsToFocus, setTopicsToFocus] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions || []);
    } catch (error) {
      console.log(error.response);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to load sessions"
        );
      }
    } finally {
      setFetchLoading(false);
    }
  };

  const createSession = async () => {
    if (!role || !experience || !topicsToFocus) {
      toast.error("All fields are required");
      return;
    }

   // Convert topics string into array
    const topics = topicsToFocus
      .split(",")
      .map((topic) => topic.trim())
      .filter(Boolean);

    if (topics.length === 0) {
      toast.error("Please enter at least one topic");
      return;
    }

    setLoading(true);

    try {
       const res = await axiosInstance.post(
        API_PATHS.SESSION.CREATE,
        {
          role: role,
          experience: Number(experience),
          topicsToFocus: topics,
          description: ""
        }
      );
      toast.success("Session created successfully!");
      if (res.data.session) {
        setSessions((prev) => [res.data.session, ...prev]);
      } else {
        fetchSessions();
      }
      setRole("");
      setExperience("");
      setTopicsToFocus("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    fetchSessions();
  }, []);

  return (
    <div className=" bg-white/10 backdrop-blur-md min-h-screen relative overflow-hidden">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Manage your interview preparation sessions
          </p>
        </div>

        {/* Create Session Card */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Start New Session</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="Enter Role (e.g., Frontend Developer)"
              value={role}
              className="flex-1 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              onChange={(e) => setRole(e.target.value)}
            />

            <input
              placeholder="Experience (e.g., 2 yrs)"
              value={experience}
              className="w-full md:w-32 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              onChange={(e) => setExperience(e.target.value)}
            />
            
            <input
              placeholder="Topics to Focus"
              value={topicsToFocus}
              className="w-full md:w-64 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              onChange={(e) => setTopicsToFocus(e.target.value)}
            />

            <button
              onClick={createSession}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:scale-[1.02]"
              }`}
            >
              <BsPlus className="w-5 h-5" />
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>

        {/* Sessions List */}
        {fetchLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-t-sky-500 mb-4"></div>
            <p className="text-lg">Loading sessions...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-2xl text-gray-600 mb-2">📝</p>
            <p className="text-xl font-semibold text-gray-900 mb-2">No sessions yet</p>
            <p className="text-gray-600">Create your first session above to get started</p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Your Sessions ({sessions.length})
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    toast("Opening interview session...");
                    navigate(`/interview/${s.id}`);
                  }}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-sky-300 transition-all duration-200 cursor-pointer group hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="font-bold text-lg text-gray-900 group-hover:text-sky-600 transition">
                        {s.role}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {s.experience} experience
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Focus: {s.topicsToFocus || "General"}
                      </p>
                    </div>
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="mt-4 text-xs font-medium text-gray-400">
                    {s.questions?.length || 0} questions • Click to continue →
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
