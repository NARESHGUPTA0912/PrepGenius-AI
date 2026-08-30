import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer tracking-tight 
             bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-700 
             bg-clip-text text-transparent 
             hover:opacity-80 transition duration-300"
        ><span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent group-hover:opacity-80 transition">🚀 </span>
          PrepGenius AI
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Dashboard */}
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-700 border-l-black text-sm font-medium hover:text-black transition"
          >
            𝐃𝐚𝐬𝐡𝐛𝐨𝐚𝐫𝐝
          </button>

          {/* Divider */}
          <div className="h-5 w-px bg-gray-200" />

          {/* Logout */}
          <button
            onClick={logout}
            className="px-3 py-1.5 text-sm font-medium rounded-md bg-red-700 text-white hover:bg-red-600 transition-all duration-200"
          >
            𝐋𝐨𝐠𝐨𝐮𝐭
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
