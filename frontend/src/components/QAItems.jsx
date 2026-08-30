import { useState } from "react";
import ReactMarkdown from "react-markdown";

const QAItem = ({ item, onPin, index }) => {
  const [open, setOpen] = useState(false);
  const questionText =
    item.question || item.q || item.text || "Untitled Question";
  const answerText =
    item.answer || item.a || item.explanation || "No answer yet";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4 transition-all duration-200 hover:shadow-md hover:border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        {/* Question */}
        <h3
          className="font-medium text-gray-800 cursor-pointer flex items-center gap-2 leading-relaxed"
          onClick={() => setOpen(!open)}
        >
          {" "}
          {/* Number + Question */}
          <span>
            <span className="text-sky-500 font-semibold mr-2">
              {index + 1}.
            </span>
            {questionText}
          </span>
        </h3>

        {/* Arrow Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-sky-500 text-lg transition-transform duration-200 hover:scale-110"
        >
          {open ? "▼" : "▶"}
        </button>

        {/* // Pin Button
        <button
          onClick={() => onPin?.(item._id)}
          className="text-lg hover:scale-110 transition-transform"
        >
          {item.isPinned ? "📌" : "📍"}
        </button> */}
      </div>

      {/* Answer */}
      <div
        className={`grid transition-all duration-300 ${
          open
            ? "grid-rows-[1fr] opacity-100 mt-3"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown>{answerText}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAItem;
