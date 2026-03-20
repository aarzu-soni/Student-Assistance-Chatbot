import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Curriculum() {
  const [curriculums, setCurriculums] = useState([]);
  const [openBranch, setOpenBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/curriculums/")
      .then((res) => {
        setCurriculums(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch curriculum", err);
        setError("Failed to fetch curriculum data.");
        setLoading(false);
      });
  }, []);

  const byBranch = curriculums.reduce((acc, cur) => {
    const name = cur.branch.name;
    acc[name] = acc[name] || [];
    acc[name].push(cur);
    return acc;
  }, {});

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
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-sky-900">
          Curriculum
        </h1>
        <div className="w-16 h-1.5 bg-sky-700 mx-auto my-6 rounded-full" />

        {Object.keys(byBranch).length === 0 ? (
          <p className="text-center text-lg text-slate-700">
            No curriculum details available.
          </p>
        ) : (
          <div className="space-y-6">
            {Object.entries(byBranch).map(([branch, items]) => (
              <div
                key={branch}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleBranch(branch)}
                  aria-expanded={openBranch === branch}
                  aria-controls={`curriculum-${branch}`}
                  className="w-full flex justify-between items-center p-6 bg-white hover:bg-sky-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
                >
                  <span className="text-lg font-medium text-sky-900">
                    {branch}
                  </span>
                  <svg
                    className={`h-5 w-5 transform transition-transform duration-200 ${
                      openBranch === branch ? "rotate-180" : ""
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
                  id={`curriculum-${branch}`}
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openBranch === branch
                      ? "max-h-screen opacity-100 py-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {items
                    .sort((a, b) => a.semester - b.semester)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className={`space-y-1 ${
                          idx < items.length - 1
                            ? "border-b border-gray-200 pb-4 mb-4"
                            : ""
                        }`}
                      >
                        <h2 className="text-lg font-semibold text-sky-900">
                          Semester {item.semester}
                        </h2>
                        <p className="text-slate-700">
                          <strong className="text-slate-900">
                            Subjects:
                          </strong>{" "}
                          {item.subjects}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
