'use client';

import React from 'react';

const POSTS = [
  {
    image: '/rp_card1.png',
    alt: 'Customer getting gold weighed and valued at Muthoot Finance',
    date: 'June 2026',
  },
  {
    image: '/rp_card2.png',
    alt: 'Precision scale weighing gold jewellery',
    date: 'April 2026',
  },
  {
    image: '/rp_card3.png',
    alt: 'Digital bank transfer on a tablet',
    date: 'Mar 2026',
  },
];

export default function RecentPost() {
  return (
    <section className="recent-post-section">
      <div className="container">
        <h2 className="recent-post-title">
          <span className="recent-post-highlight">Recent</span> Posts
        </h2>

        <div className="recent-post-grid">
          {POSTS.map((post) => (
            <div className="recent-post-card" key={post.date}>
              <div className="recent-post-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.alt} className="recent-post-image" />
                <span className="recent-post-date-badge">{post.date}</span>
              </div>

              <div className="recent-post-body">
                <h3 className="recent-post-card-title">
                  Have questions about your gold valuation? Our experts are here help you through the
                </h3>
                <p className="recent-post-card-desc">
                  Gold valuation? Our experts are here to help you through the entire process.Have questions
                </p>
                <button className="recent-post-btn">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
