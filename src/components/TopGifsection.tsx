"use client";

import React from "react";

export default function TechGrid() {
  return (
    <section className="py-16 max-w-6xl mx-auto bg-[var(--light-bg)] px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start md:space-x-12">
        {/* テキストコンテンツ */}
        <div className="w-full text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-4">
            Easy to use
          </h2>
          <p className="text-lg text-black dark:text-white">
            Vald can be easily installed in a few steps.
          </p>
        </div>

        {/* GIF画像 */}
        <div className="w-full flex justify-center">
          <img
            src="/images/sample_erminal.gif"
            alt="Command line demo"
            className="rounded-lg shadow-md w-full md:max-w-[50vw]"
          />
        </div>
      </div>
    </section>
  );
}
