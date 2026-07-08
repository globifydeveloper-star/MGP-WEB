'use client';

import React from 'react';
import './RecentPost.css';

const POSTS = [
  {
    image: '/rp_card1.png',
    date: '12 Jan 2026',
    title: 'How to get the maximum value for your old gold jewelry',
    desc: 'Learn about the scientific evaluation methods, XRF tests, and common traps to avoid when selling your gold to local buyers.',
  },
  {
    image: '/rp_card2.png',
    date: '28 Feb 2026',
    title: 'Understanding gold purity: Karats, fineness and hallmarks',
    desc: 'A comprehensive guide to understanding what 22K or 18K gold actually means, and how hallmarked ornaments protect your valuation.',
  },
  {
    image: '/rp_card3.png',
    date: '05 Mar 2026',
    title: 'Pledged Gold: How to release and sell it safely',
    desc: 'Stuck with a high-interest gold loan? Find out how you can release your pledged gold and pocket the extra cash value instantly.',
  },
];

export default function RecentPost() {
  return (
    <section className="recent-post-section">
      <div className="container">
        <h2 className="recent-post-title">
          Our <span className="recent-post-highlight">Recent</span> Posts
        </h2>

        <div className="recent-post-grid">
          {POSTS.map((post) => (
            <div className="recent-post-card" key={post.title}>
              <div className="recent-post-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.title} className="recent-post-image" />
                <span className="recent-post-date-badge">{post.date}</span>
              </div>
              <div className="recent-post-body">
                <h3 className="recent-post-card-title">{post.title}</h3>
                <p className="recent-post-card-desc">{post.desc}</p>
                <button className="recent-post-btn">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
