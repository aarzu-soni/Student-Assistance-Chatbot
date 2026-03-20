import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [openIdx, setOpenIdx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/faqs/")
      .then((res) => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch FAQs", err);
        setLoading(false);
      });
  }, []);

  const toggleFaq = (index) => setOpenIdx(openIdx === index ? null : index);

  if (loading) {
    return (
      <div className="py-20 text-center text-xl text-sky-400 animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-slate-900 py-20 animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-sky-900">
          Frequently Asked Questions
        </h1>
        <div className="w-16 h-1.5 bg-sky-700 mx-auto my-6 rounded-full" />

        {faqs.length === 0 ? (
          <p className="text-center text-lg text-slate-700">
            No FAQs available.
          </p>
        ) : (
          <div className="space-y-6">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openIdx === idx}
                  aria-controls={`faq-${idx}`}
                  className="w-full flex justify-between items-center p-6 bg-white hover:bg-sky-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
                >
                  <span className="text-lg font-medium text-sky-900">
                    {item.question}
                  </span>
                  <svg
                    className={`h-5 w-5 transform transition-transform duration-200 ${
                      openIdx === idx ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 8l4 4 4-4" />
                  </svg>
                </button>

                {/* Answer */}
                <div
                  id={`faq-${idx}`}
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openIdx === idx
                      ? "max-h-screen opacity-100 py-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-700">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
