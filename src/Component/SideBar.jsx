import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative min-h-screen flex z-4">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#221c40] text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-50 `}
      >
        <div className="p-6">
          {/* Hamburger Icon */}


          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none  absolute top-6 left-2  "
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>

          </button>
          <h2 className="text-2xl font-bold pl-4">Admin Panel</h2>
          <ul className="mt-6 space-y-4">
            <li onClick={() => setIsOpen(false)}>
              <Link
                to="/" className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                Dashboard
              </Link>
            </li>
         

            <li onClick={() => setIsOpen(false)}>
              <Link to="/product" className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">

                Product


              </Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link
                to="/create-product"
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                Create Product
              </Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link
                to="/chart"
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                Charts
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Navbar */}
        <nav className="  text-white p-4 flex justify-between space-x-3 shadow-2xl ">
          <button
            onClick={toggleSidebar}
            className={`text-white focus:outline-none   fixed top-6 ${isOpen ? 'hidden' : ''} `}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>

          </button>


        </nav>


      </div>
    </div>
  );
};

export default Sidebar;
