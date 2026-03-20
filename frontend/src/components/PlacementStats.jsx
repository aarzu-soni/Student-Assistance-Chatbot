import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function PlacementStats() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/placements/")
      .then((res) => {
        setPlacements(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch placements", err);
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

  return (
    <div className="bg-gray-50 text-slate-900 min-h-screen py-20 animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-sky-900">
          Placement Stats
        </h1>
        <div className="w-16 h-1.5 bg-sky-700 mx-auto my-6 rounded-full" />

        {placements.length === 0 ? (
          <p className="text-center text-lg text-slate-700">
            No placement stats available.
          </p>
        ) : (
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {placements.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-sky-900 mb-2">
                  Year: {item.year}
                </h2>
                <p className="text-slate-700 mb-1">
                  <strong className="text-slate-900">
                    Average Package:
                  </strong>{" "}
                  ₹{item.average_package} LPA
                </p>
                <p className="text-slate-700 mb-1">
                  <strong className="text-slate-900">
                    Highest Package:
                  </strong>{" "}
                  ₹{item.highest_package} LPA
                </p>
                <p className="text-slate-700">
                  <strong className="text-slate-900">Top Recruiters:</strong>{" "}
                  {item.top_recruiters}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
