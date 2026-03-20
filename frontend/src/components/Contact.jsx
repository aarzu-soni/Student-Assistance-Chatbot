import React, { useState } from 'react';
import axios from '../api/axios';
import Swal from 'sweetalert2';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    try {
      const response = await axios.post('contacts/', { name, email, message });
      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent',
          text: 'Your message has been sent successfully!',
        });
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="bg-gray-50 text-slate-900 py-20 animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-sky-900">
          Contact Us
        </h1>
        <div className="w-16 h-1.5 bg-sky-700 mx-auto my-6 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-sky-400">
            <h3 className="text-xl font-semibold text-sky-900 mb-6">
              Contact Information
            </h3>
            <div className="space-y-4 text-slate-700">
              <div className="flex items-start">
                <span className="text-xl mr-3">📍</span>
                <p className="leading-snug text-slate-900">
                  <strong>Address:</strong>
                  <br />
                  Makhupura, Nasirabad Road, Ajmer - 305001,
                  <br />
                  Rajasthan, India
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-3">📞</span>
                <p className="leading-snug">
                  <strong>Phone:</strong> +0145-2695195
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-3">✉️</span>
                <p className="leading-snug">
                  <strong>Email:</strong> gpc.ajmer@rajasthan.gov.in
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-3">🕒</span>
                <p className="leading-snug">
                  <strong>Hours:</strong> Mon – Fri: 9:00 AM – 5:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-extrabold text-center text-sky-900 mb-4">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-4 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-sky-400 focus:ring-offset-0"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-4 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-sky-400 focus:ring-offset-0"
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="p-4 border border-gray-200 rounded-lg w-full min-h-[120px] resize-y focus:outline-none focus:ring-1 focus:ring-sky-400 focus:ring-offset-0"
              />
              <button
                type="submit"
                className="w-full p-3 !bg-sky-900 text-white font-semibold rounded-lg transition hover:bg-sky-800 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-sky-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-10 rounded-lg shadow-md overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.9455371522945!2d74.64783407514587!3d26.425234076941067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396be6d756a67359%3A0x850efb01a767f05a!2sNasirabad%20Rd%2C%20Ajmer%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1747463831581!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="College Location"
          />
        </div>
      </div>
    </div>
  );
}
