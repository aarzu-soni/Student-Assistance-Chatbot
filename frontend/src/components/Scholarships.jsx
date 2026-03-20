import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/scholarships/")
      .then((res) => {
        setScholarships(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch scholarships", err);
        setError("Failed to fetch scholarships.");
        setLoading(false);
      });
  }, []);

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
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-sky-900">
          Scholarships
        </h1>
        <div className="w-16 h-1.5 bg-sky-700 mx-auto my-4 rounded-full" />

        {scholarships.length === 0 ? (
          <p className="text-center text-lg text-slate-700">
            No scholarship details available.
          </p>
        ) : (
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {scholarships.map((item) => (
              <div
                key={item.name}
                className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:-translate-y-1"
              >
                <h2 className="text-xl font-semibold text-sky-900 mb-2">
                  {item.name}
                </h2>
                <p className="text-slate-700 mb-2">
                  <strong className="text-slate-900">Description:</strong>{" "}
                  {item.description}
                </p>
                <p className="text-slate-700 mb-2">
                  <strong className="text-slate-900">Eligibility:</strong>{" "}
                  {item.eligibility}
                </p>
                <p className="text-slate-700">
                  <strong className="text-slate-900">Amount:</strong> ₹
                  {item.amount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
