import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 text-slate-900 py-20 mt-6 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-sky-900">
            About Us
          </h1>
          <div className="w-16 h-1.5 bg-sky-700 mx-auto my-6 rounded-full" />
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-extrabold text-sky-900 mb-3">
              Our Mission
            </h2>
            <p className="text-slate-700 leading-relaxed">
              To impart industry-relevant technical education that promotes
              innovation, critical thinking, and ethical values—producing
              professionals ready to drive regional development and national
              progress.
            </p>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-extrabold text-sky-900 mb-3">
              Our Vision
            </h2>
            <p className="text-slate-700 leading-relaxed">
              To become a nationally recognized center of excellence in
              technical education, producing competent, employable, and
              socially responsible graduates through quality, collaboration,
              and continual improvement.
            </p>
          </section>
        </div>

        {/* Academic Programs */}
        <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-extrabold text-sky-900 mb-3">
            Academic Programs
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We offer three-year diploma programmes in:
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li>Civil Engineering</li>
            <li>Electrical Engineering</li>
            <li>Mechanical & Automobile Engineering</li>
            <li>Electronics & Instrumentation</li>
            <li>Printing Technology</li>
            <li>Computer Engineering & IT</li>
          </ul>
        </section>

        {/* Campus & Facilities */}
        <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-extrabold text-sky-900 mb-3">
            Campus & Facilities
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Nestled on Nasirabad Road, our campus features dedicated labs for
            machines, electronics, computers, and printing, plus a central
            library, auditorium, workshop halls, sports grounds, hostels, and
            Wi-Fi study zones—ensuring every idea moves seamlessly from concept
            to creation.
          </p>
        </section>

        {/* Industry Interface & Placements */}
        <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-extrabold text-sky-900 mb-3">
            Industry Interface & Placements
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Our Training & Placement Cell works closely with companies like
            Asian Paints, Bajaj Auto, Tata Power, and JSW Steel to arrange
            internships, plant visits, and campus recruitment drives—helping our
            diploma graduates step confidently into careers.
          </p>
        </section>

        {/* Core Values */}
        <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-extrabold text-sky-900 mb-6 text-center">
            Core Values
          </h2>
          <ul className="grid gap-4 md:grid-cols-2 list-none">
            {[
              [
                "Academic Excellence",
                "Quality instruction and practical application.",
              ],
              ["Innovation", "Creative problem-solving and research-driven learning."],
              ["Industry Linkages", "Hands-on exposure through partnerships."],
              ["Integrity", "Honesty, transparency, and accountability."],
              ["Inclusive Development", "All-round growth via co-curricular initiatives."],
              ["Community Service", "Giving back through outreach programs."],
            ].map(([title, desc], i) => (
              <li key={i} className="flex items-start">
                <span className="text-sky-400 text-2xl mr-3">✓</span>
                <div>
                  <strong className="block text-sky-900">{title}</strong>
                  <span className="text-slate-700">{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Why Choose */}
        <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-extrabold text-sky-900 mb-6 text-center">
            Why Choose GPC Ajmer?
          </h2>
          <p className="text-slate-700 leading-relaxed text-center max-w-3xl mx-auto">
            With a legacy since 1954, practice-oriented labs, affordable
            public-sector fees, robust industry collaborations, and a vibrant
            campus life, GPC Ajmer stands out as Rajasthan’s premier gateway to
            engineering and applied sciences careers.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
