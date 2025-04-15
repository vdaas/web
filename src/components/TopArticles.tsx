"use client"; // Next.js の Client Component

import React from "react";

// const articles = [
//   {
//     title: "Improving Vald Search Performance through Parameter Tuning",
//     image: "/images/article1.png",
//     link: "https://example.com/article1",
//   },
//   {
//     title: "Improving Vald Search Performance through Parameter Tuning",
//     image: "/images/article2.png",
//     link: "https://example.com/article2",
//   },
//   {
//     title: "Improving Vald Search Performance through Parameter Tuning",
//     image: "/images/article3.png",
//     link: "https://example.com/article3",
//   },
// ];

export default function Articles() {
  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* タイトル */}
        <h2 className="text-4xl font-bold text-primary mb-4">Articles</h2>
        <p className="text-gray-600 mb-8">
          The blog publishes technical research, release reports, and other
          related materials.
        </p>

        {/* 記事カードグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 transition-transform transform hover:scale-105"
            >
              <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{article.title}</h3>
              </div>
            </a>
          ))} */}
        </div>
      </div>
    </section>
  );
}
