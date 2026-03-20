import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("/courses/")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Failed to fetch courses", err));
  }, []);

  return (
    <div className="bg-gray-50 text-slate-900 min-h-screen py-20 animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-sky-900">
          Courses Offered
        </h1>
        <div className="w-16 h-1.5 bg-sky-700 mx-auto my-6 rounded-full" />

        {courses.length === 0 ? (
          <p className="text-center text-lg text-slate-700">
            No courses available at the moment.
          </p>
        ) : (
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-sky-900 mb-2">
                  {course.name}
                </h2>
                <p className="text-slate-700 mb-1">
                  <strong className="text-slate-900">Duration:</strong>{" "}
                  {course.duration_years} years
                </p>
                <p className="text-slate-700">
                  <strong className="text-slate-900">Degree:</strong>{" "}
                  <span className="inline-block bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full text-sm">
                    {course.degree_type}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
