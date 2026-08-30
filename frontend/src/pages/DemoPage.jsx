import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

const DemoPage = () => {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const dummyQuestions = [
    {
      question: "What are the main differences between `let`, `const`, and `var` in JavaScript?",
      answer: "- **var**: Function-scoped, can be redeclared and updated. Hoisted and initialized with undefined.\n- **let**: Block-scoped, cannot be redeclared but can be updated. Hoisted but not initialized (temporal dead zone).\n- **const**: Block-scoped, cannot be redeclared or updated. Points to the same reference, but object properties can be modified.\n\n**Best practice**: Use `const` by default, `let` when you need reassignment, avoid `var` in modern JavaScript.",
    },
    {
      question: "Explain the concept of closures in JavaScript with an example.",
      answer: "A **closure** is a function that has access to variables from its outer (enclosing) function scope, even after that function has returned.\n\n```javascript\nfunction outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}\nconst counter = outer();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\n```\n\nHere, `inner()` has access to `count` because of the closure. This is useful for data privacy and creating function factories.",
    },
    {
      question: "What is the Virtual DOM in React and how does it improve performance?",
      answer: "The **Virtual DOM** is an in-memory representation of the real DOM. React uses it to:\n\n1. **Batch updates**: Changes are first applied to the Virtual DOM\n2. **Diffing**: React compares the new Virtual DOM with the previous one\n3. **Reconciliation**: Only changed elements are updated in the real DOM\n\nThis approach minimizes expensive DOM operations, resulting in better performance. React's reconciliation algorithm uses a diffing strategy to efficiently identify which parts need updating.",
    },
    {
      question: "What is RESTful API design and its core principles?",
      answer: "**REST (Representational State Transfer)** is an architectural style for designing networked applications.\n\n**Core Principles:**\n- **Client-Server**: Separation of concerns\n- **Statelessness**: Each request contains all necessary info\n- **Uniform Interface**: Standard HTTP methods (GET, POST, PUT, DELETE)\n- **Resource-Based**: Data represented as resources with unique URIs\n- **Cacheable**: Responses should be cacheable when appropriate\n- **Layered System**: Architecture can be composed of layers\n\n**Example:**\n- `GET /api/users` - Retrieve all users\n- `POST /api/users` - Create a new user\n- `PUT /api/users/1` - Update user with ID 1\n- `DELETE /api/users/1` - Delete user with ID 1",
    },
    {
      question: "What are Promises and how do they help with asynchronous code?",
      answer: "A **Promise** represents the eventual completion (or failure) of an asynchronous operation.\n\n**States:**\n- **Pending**: Initial state, operation hasn't completed\n- **Fulfilled**: Operation completed successfully (resolved)\n- **Rejected**: Operation failed\n\n```javascript\nconst promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Success!'), 1000);\n});\n\npromise\n  .then(result => console.log(result))\n  .catch(error => console.log(error));\n```\n\nPromises enable cleaner async code compared to callbacks and form the basis for async/await.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="w-full bg-white/10 backdrop-blur-md min-h-screen relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12 flex justify-between items-start gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Interview Questions Demo
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Explore sample interview questions and AI-generated answers to see how our platform works. Click any question to see the detailed answer.
              </p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all duration-200 hover:scale-[1.02] shadow-md whitespace-nowrap"
            >
              Try it Now
            </button>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {dummyQuestions.map((q, i) => (
              <div
                key={i}
                onClick={() =>
                  setExpandedIndex(expandedIndex === i ? null : i)
                }
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-sky-200"
              >
                {/* Question Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg leading-relaxed">
                      <span className="text-sky-500 font-bold mr-3">{i + 1}.</span>
                      {q.question}
                    </h3>
                  </div>
                  <span className="text-xl text-gray-400 shrink-0 mt-1">
                    {expandedIndex === i ? "▼" : "▶"}
                  </span>
                </div>

                {/* Answer */}
                {expandedIndex === i && (
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <div className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none">
                      {q.answer.split("\n").map((line, idx) => (
                        <p key={idx} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-linear-to-r from-sky-50 to-blue-50 rounded-2xl p-8 text-center border border-sky-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Master Your Interviews?
            </h2>
            <p className="text-gray-600 mb-6">
              Get personalized questions, AI-powered answers, and track your progress with our intelligent interview prep platform.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all duration-200 hover:scale-[1.02] shadow-md"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;