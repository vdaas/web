"use client";

import Link from "next/link";
import { useState } from "react"; 

export default function CardGrid() {
  const cards = [
    {
      title: "Distributed Architecture",
      description:
        "Vald distributes the data across multiple Nodes to avoid single points of failure and achieve high availability and scalability.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h11M9 21V9M17 9a4 4 0 010-8 4 4 0 010 8zm3 12h-2a2 2 0 01-2-2v-4a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "High Availability",
      description:
        "Ensure your system is up and running with minimal downtime through our high availability solutions.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m-9-4a4 4 0 108 0 4 4 0 10-8 0z"
          />
        </svg>
      ),
    },
    {
      title: "Scalability",
      description:
        "Our architecture is designed to scale seamlessly to meet the growing demands of your application.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6M7 8a4 4 0 108 0 4 4 0 10-8 0z"
          />
        </svg>
      ),
    },
    {
      title: "Data Security",
      description:
        "We prioritize security to ensure your data is protected at every layer of the system.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-3.75 0-6 2.25-6 5v4h12v-4c0-2.75-2.25-5-6-5zm0-6a4 4 0 00-4 4h8a4 4 0 00-4-4z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-center items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
                {card.icon}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
              {card.title}
            </h2>
            <p className="text-gray-600 text-center">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}