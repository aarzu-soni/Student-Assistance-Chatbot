import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.jpeg';

export default function Navbar() {
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.dropdown')) {
        setOpenIdx(null);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const menus = [
    {
      title: 'Admissions',
      items: [
        { label: 'Admission Details', path: '/admissions' },
        { label: 'Fees', path: '/fees' },
        { label: 'Scholarships', path: '/scholarships' },
      ],
    },
    {
      title: 'Campus',
      items: [
        { label: 'Hostel Facilities', path: '/hostel-facilities' },
        { label: 'Facilities', path: '/facilities' },
      ],
    },
    {
      title: 'Academics',
      items: [
        { label: 'Courses', path: '/courses' },
        { label: 'Curriculum', path: '/curriculum' },
      ],
    },
    {
      title: 'More',
      items: [
        { label: 'Placements', path: '/placements' },
        { label: 'FAQs', path: '/faqs' },
        { label: 'Alumni', path: '/alumni' },
      ],
    },
  ];

  const btnClass = [
    'inline-flex items-center px-4 py-2 rounded-md font-medium transition',
    'text-slate-800 bg-white hover:bg-sky-50 hover:text-sky-700',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400',
  ].join(' ');

  const linkStyle = { color: 'inherit', textDecoration: 'none' };

  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Title */}
        <Link to="/" style={linkStyle} className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-extrabold text-sky-900 hover:text-sky-800">
            Government Polytechnic College, Ajmer
          </span>
        </Link>

        {/* Menu */}
        <ul className="flex items-center space-x-2 sm:space-x-4">
          {menus.map((menu, idx) => (
            <li key={menu.title} className="relative dropdown">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className={btnClass}
                aria-expanded={openIdx === idx}
                aria-controls={`menu-${idx}`}
              >
                {menu.title}
                <svg
                  className={`ml-1 h-3 w-3 transition-transform ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 8l4 4 4-4" />
                </svg>
              </button>

              {openIdx === idx && (
                <div
                  id={`menu-${idx}`}
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-md z-50"
                >
                  <div className="py-1">
                    {menu.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        style={linkStyle}
                        className="block px-4 py-2 text-sm text-slate-800 hover:bg-sky-50 hover:text-sky-700"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}

          {/* Contact */}
          <li>
            <Link to="/contact" style={linkStyle} className={btnClass}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
