import React from "react";
import { Link } from "react-router-dom";
import video from "../img/video.mp4";
import campus from "../img/campus.jpg";

// Alumni Photos
import amit from "../img/amit.jpg";
import neha from "../img/neha.jpg";
import rajesh from "../img/rajesh.jpg";

const whyChoose = [
  {
    title: "Quality Education",
    desc: "Learn from experienced professors in a collaborative environment that encourages creativity and practical problem-solving.",
  },
  {
    title: "Modern Infrastructure",
    desc: "Cutting-edge labs, workshops, and digital libraries to support hands-on learning and innovation.",
  },
  {
    title: "Industry Partnerships",
    desc: "Internships and live projects with leading firms to bridge academia and industry needs.",
  },
];

const stats = [
  { label: "Alumni Network", value: "2000+" },
  { label: "Placement Rate", value: "95%" },
  { label: "Programs Offered", value: "7" },
];

const testimonials = [
  {
    name: "Priya Singh",
    role: "Class of 2020",
    quote: "GPC Ajmer prepared me for real-world challenges and helped me land my dream job!",
  },
  {
    name: "Vikram Patel",
    role: "Class of 2019",
    quote: "The faculty’s guidance and infrastructure were top-notch. Forever grateful!",
  },
];

const alumniData = [
  {
    name: "Amit Verma",
    batch: "2015",
    position: "Mechanical Design Engineer",
    company: "Mahindra & Mahindra",
    achievement:
      "Contributed to the design of electric vehicle components, leading to a new product launch.",
    linkedin: "https://linkedin.com/in/amit-verma",
    photo: amit,
  },
  {
    name: "Neha Sharma",
    batch: "2017",
    position: "Civil Engineer",
    company: "L&T",
    achievement:
      "Instrumental in the construction of a major bridge project in Rajasthan.",
    linkedin: "https://linkedin.com/in/neha-sharma",
    photo: neha,
  },
  {
    name: "Rajesh Kumar",
    batch: "2018",
    position: "Software Engineer",
    company: "TCS",
    achievement:
      "Led an AI-based project and received the Best Project of the Year award.",
    linkedin: "https://linkedin.com/in/rajesh-kumar",
    photo: rajesh,
  },
];

export default function Home() {
  return (
    <div className="bg-white text-slate-900">

      {/* HERO SECTION */}
      <header className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-sky-900/40 backdrop-blur-[1px]" />

        <div className="relative z-10 text-center px-6 md:px-12 max-w-3xl fade-in">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold mb-4 text-white drop-shadow-lg">
            Welcome to <span className="text-white">GPC Ajmer</span>
          </h1>
          <p className="font-serif italic text-md md:text-lg mb-6 text-slate-100 drop-shadow">
            Empowering students with technical skills to build a successful future.
          </p>

          {/* Badge */}
          <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm font-medium backdrop-blur-sm bg-white/10 px-6 py-3 rounded-full shadow-md mx-auto w-fit fade-in">
            <span>📍 Est. 1958</span>
            <span>•</span>
            <span>AICTE Approved</span>
            <span>•</span>
            <span>Oldest Govt. Polytechnic in Rajasthan</span>
          </div>
        </div>
      </header>

      <main>

        {/* WHY CHOOSE SECTION */}
        <section className="py-16 bg-white">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-sky-900">
            Why Choose GPC Ajmer?
          </h2>

          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl shadow border-l-4 border-sky-500 hover:shadow-lg transition-transform hover:scale-105 fade-in"
              >
                <h3 className="text-xl font-bold mb-2 text-sky-900">
                  {item.title}
                </h3>
                <p className="text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 bg-sky-50">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white p-6 rounded-xl shadow fade-in"
              >
                <p className="text-4xl font-extrabold text-sky-900">{s.value}</p>
                <p className="mt-2 text-slate-700">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">

            <h2 className="text-4xl font-extrabold text-sky-900">About Us</h2>
            <div className="w-24 h-1 bg-sky-500 mx-auto my-4 rounded-full" />

            <img
              src={campus}
              alt="GPC Ajmer Campus"
              className="w-full rounded-xl shadow-lg mb-8 fade-in"
            />

            <p className="font-serif italic text-slate-700 text-lg leading-relaxed mb-8 fade-in">
              Founded in 1958, Government Polytechnic College, Ajmer (GPC Ajmer)
              is one of Rajasthan’s oldest state-run institutes for diploma-level
              technical education, approved by AICTE.
            </p>

            {/* Learn More button */}
            <Link
              to="/about"
              className="inline-block bg-sky-600 !text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-sky-700 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 bg-sky-50">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-sky-900">
            Testimonials
          </h2>

          <div className="space-y-8 max-w-2xl mx-auto">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="border-l-4 border-sky-500 pl-6 italic text-slate-700 fade-in"
              >
                “{t.quote}”
                <footer className="mt-2 font-semibold text-sky-900">
                  — {t.name},{" "}
                  <span className="font-normal text-slate-700">{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* ALUMNI SECTION */}
        <section className="py-16 bg-white">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-sky-900">
            Notable Alumni
          </h2>

          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            {alumniData.map((alumni) => (
              <div
                key={alumni.name}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition-transform hover:scale-105 fade-in"
              >
                <div className="w-full aspect-[16/9] overflow-hidden rounded-xl shadow-sm mb-4">
                  <img
                    src={alumni.photo}
                    alt={alumni.name}
                    className="w-full h-full object-cover object-[50%_20%] hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <a
                  href={alumni.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold mb-2 text-sky-900 hover:underline"
                >
                  {alumni.name}
                </a>

                <p className="text-slate-700"><strong>Batch:</strong> {alumni.batch}</p>
                <p className="text-slate-700"><strong>Position:</strong> {alumni.position}</p>
                <p className="text-slate-700"><strong>Company:</strong> {alumni.company}</p>
                <p className="italic text-slate-600 mt-2">“{alumni.achievement}”</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-sky-50 text-center fade-in">
          <h2 className="text-3xl font-extrabold mb-4 text-sky-900">Ready to Begin?</h2>
          <p className="font-serif italic mb-6 text-slate-700">
            Start your journey at one of Rajasthan’s most respected institutions.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sky-900/90 text-sm font-medium bg-sky-100/60 backdrop-blur-sm px-6 py-3 rounded-full shadow mx-auto w-fit">
            <span>📍 Est. 1958</span>
            <span>•</span>
            <span>AICTE Approved</span>
            <span>•</span>
            <span>Oldest Govt. Polytechnic in Rajasthan</span>
          </div>
        </section>
      </main>

      <footer className="bg-sky-900 text-center py-6">
        <p className="text-sm text-white">
          © 2025 <span className="font-semibold">Government Polytechnic College, Ajmer</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
