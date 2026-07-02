'use client';

import React from 'react';

export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Left Side: Logo & Subtext */}
        <div className="navbar-brand">
          <a href="#" className="logo-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dxf3gabsi/image/upload/v1782895726/logo_zggja3.png"
              alt="GOLDPOINT - We Buy Gold"
              className="logo-img"
              width={160}
              height={38}
            />
          </a>
        </div>

        {/* Center: Navigation Links */}
        <nav className="navbar-nav">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">About Us</a>
          <a href="#" className="nav-link">Mobile Van</a>
          <a href="#" className="nav-link">Branches</a>
          <a href="#" className="nav-link">Testimonials</a>
          <a href="#" className="nav-link">Gold Rate</a>
        </nav>

        {/* Right Side: Phone & Button */}
        <div className="navbar-actions">
          <a href="tel:+919037921192" className="phone-contact">
            <svg
              className="phone-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="phone-number">+91 9037 921 192</span>
          </a>
          <button className="btn btn-primary sell-gold-btn">
            Sell Your Gold
          </button>
        </div>
      </div>
    </header>
  );
}
