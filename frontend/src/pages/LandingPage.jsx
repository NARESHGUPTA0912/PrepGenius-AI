import { useNavigate } from "react-router-dom";
import { BsLightningChargeFill } from "react-icons/bs";
import { TbBrain, TbRocket, TbTrendingUp } from "react-icons/tb";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BsLightningChargeFill className="w-6 h-6" />,
      title: "AI-Generated Questions",
      description: "Get role-specific interview questions powered by advanced AI",
    },
    {
      icon: <TbBrain className="w-6 h-6" />,
      title: "Smart Expansions",
      description: "Expand your answers with AI-powered insights and explanations",
    },
    {
      icon: <TbRocket className="w-6 h-6" />,
      title: "Fast Learning",
      description: "Master concepts faster with intelligent personalized guidance",
    },
    {
      icon: <TbTrendingUp className="w-6 h-6" />,
      title: "Track Progress",
      description: "Monitor your interview preparation journey with detailed stats",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create a Session",
      description: "Set your role and experience level",
    },
    {
      number: "02",
      title: "Generate Questions",
      description: "AI creates personalized interview questions",
    },
    {
      number: "03",
      title: "Expand Answers",
      description: "Get detailed explanations for each question",
    },
    {
      number: "04",
      title: "Master & Interview",
      description: "Ace your interview with confidence",
    },
  ];

  return (
    <div className=" bg-white/10 backdrop-blur-md min-h-screen relative overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-sky-200 opacity-15 blur-3xl top-10 left-10 rounded-full" />
        <div className="absolute w-96 h-96 bg-sky-300 opacity-15 blur-3xl bottom-20 right-10 rounded-full" />
        <div className="absolute w-96 h-96 bg-sky-100 opacity-10 blur-3xl top-1/2 left-1/2 rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 text-center py-20 md:py-32">
        <div className="max-w-4xl">
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Welcome to an Ace Interviews with{" "}
            <span className="bg-linear-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
              PrepGenius 
            </span>{" "}
            AI-Powered Learning
          </h1>

          {/* Subtext */}
          <p className="text-gray-600 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Generate role-specific questions, expand answers, and master concepts faster with intelligent AI assistance. Perfect for frontend, backend, and full-stack roles.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg"
            >
              Get Started Free
            </button>

            <button
              onClick={() => navigate("/demo")}
              className="px-8 py-3 rounded-lg border-2 border-sky-500 text-sky-600 font-semibold hover:bg-sky-50 transition-all duration-200"
            >
              View Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="text-gray-500 text-sm">
            <p>✨ Join 1000+ professionals preparing for interviews</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
          <p className="text-gray-600 text-lg">Everything you need to ace your interview</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-sky-200"
            >
              <div className="text-sky-500 mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg">Simple 4-step process to interview mastery</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-linear-to-r from-sky-400 to-transparent" />
              )}

              {/* Step Card */}
              <div className="relative z-10 bg-white rounded-xl border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-linear-to-r from-sky-50 to-blue-50 rounded-3xl p-12 border border-sky-100">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-sky-600 mb-2">500+</p>
              <p className="text-gray-700">Interview Questions</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-sky-600 mb-2">50+</p>
              <p className="text-gray-700">Job Roles</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-sky-600 mb-2">1000+</p>
              <p className="text-gray-700">Users Prepared</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Ready to Land Your Dream Role?
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Start preparing for success today with AI-powered interview prep
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-10 py-4 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg text-lg"
        >
          Start Your Free Preparation
        </button>
      </div>

      {/* Footer CTA */}
      <div className="bg-white/40 backdrop-blur-md border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600 mb-4">Have questions? Check out our demo first</p>
          <button
            onClick={() => navigate("/demo")}
            className="text-sky-600 font-semibold hover:text-sky-700 transition"
          >
            Explore Demo →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;