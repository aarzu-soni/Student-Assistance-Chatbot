import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function FeeInfo() {
  const [fees, setFees] = useState([]);
  const [openBranch, setOpenBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/fees/")
      .then((res) => {
        setFees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch fee details", err);
        setError("Failed to fetch fee details.");
        setLoading(false);
      });
  }, []);

  const toggleBranch = (name) =>
    setOpenBranch(openBranch === name ? null : name);

  if (loading) {
    return (
      <div className="py-20 text-center text-xl text-sky-400 animate-pulse">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-slate-900 py-20 animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-sky-900 mb-4">
          Fee Information
        </h1>
        <div className="w-16 h-1.5 bg-sky-700 mx-auto mb-8 rounded-full" />

        {fees.length === 0 ? (
          <p className="text-center text-lg text-slate-700">
            No fee details available.
          </p>
        ) : (
          <div className="space-y-6">
            {fees.map((item) => (
              <div
                key={item.branch.name}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleBranch(item.branch.name)}
                  aria-expanded={openBranch === item.branch.name}
                  aria-controls={`content-${item.branch.name}`}
                  className="w-full flex justify-between items-center p-6 bg-white hover:bg-sky-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
                >
                  <span className="text-lg font-medium text-sky-900">
                    {item.branch.name}
                  </span>
                  <svg
                    className={`h-5 w-5 transform transition-transform duration-200 ${
                      openBranch === item.branch.name ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 8l4 4 4-4" />
                  </svg>
                </button>

                <div
                  id={`content-${item.branch.name}`}
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openBranch === item.branch.name
                      ? "max-h-96 opacity-100 py-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-2 text-slate-700">
                    <p>
                      <strong className="text-sky-900">Tuition Fee:</strong> ₹
                      {item.tuition_fee}
                    </p>
                    <p>
                      <strong className="text-sky-900">Hostel Fee:</strong> ₹
                      {item.hostel_fee}
                    </p>
                    {item.other_fees != null && (
                      <p>
                        <strong className="text-sky-900">Other Fees:</strong> ₹
                        {item.other_fees}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

