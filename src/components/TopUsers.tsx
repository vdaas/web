"use client"; // Next.js の Client Component

import React from "react";

export default function TechGrid() {
  return (
    <section className="py-16 bg-gray-50 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Our Users
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-md flex items-center">
          <img
            src="https://via.placeholder.com/64"
            alt="User 1"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg"></h3>
            <p className="text-gray-600"></p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md flex items-center">
          <img
            src="https://via.placeholder.com/64"
            alt="User 2"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg"></h3>
            <p className="text-gray-600"></p>
          </div>
        </div>
      </div>
    </section>
  );
}
