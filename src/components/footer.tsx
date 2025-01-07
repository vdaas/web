"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col items-center space-y-6 md:space-y-0 md:flex-row md:justify-between px-6">
        {/* ナビゲーションリンク */}
        <nav className="flex flex-wrap justify-center space-x-6 text-teal-400">
          <a href="#about" className="hover:text-teal-300">
            About
          </a>
          <a href="#get-started" className="hover:text-teal-300">
            Get Started
          </a>
          <a href="#sdks" className="hover:text-teal-300">
            SDKs
          </a>
          <a href="#docs" className="hover:text-teal-300">
            Docs
          </a>
          <a href="#blog" className="hover:text-teal-300">
            Blog
          </a>
        </nav>

        {/* ソーシャルアイコン */}
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-teal-400 hover:text-teal-300"
            >
              <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.949.555-2.005.959-3.127 1.184-.896-.959-2.173-1.555-3.59-1.555-2.717 0-4.923 2.206-4.923 4.917 0 .39.045.765.127 1.124-4.092-.205-7.719-2.165-10.148-5.144-.422.722-.664 1.561-.664 2.475 0 1.71.87 3.216 2.188 4.096-.807-.026-1.566-.247-2.229-.616v.061c0 2.386 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.416-1.68 1.319-3.808 2.103-6.102 2.103-.39 0-.779-.023-1.17-.067 2.189 1.402 4.768 2.22 7.557 2.22 9.054 0 14-7.496 14-13.986 0-.209 0-.42-.016-.63.961-.694 1.8-1.562 2.46-2.549z" />
            </svg>
          </a>
          <a href="https://slack.com" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-teal-400 hover:text-teal-300"
            >
              <path d="M12 0c-1.657 0-3 1.343-3 3v3h-3c-1.657 0-3 1.343-3 3s1.343 3 3 3h3v3c0 1.657 1.343 3 3 3s3-1.343 3-3v-3h3c1.657 0 3-1.343 3-3s-1.343-3-3-3h-3v-3c0-1.657-1.343-3-3-3zm0 3c.552 0 1 .448 1 1v7h7c.552 0 1 .448 1 1s-.448 1-1 1h-7v7c0 .552-.448 1-1 1s-1-.448-1-1v-7h-7c-.552 0-1-.448-1-1s.448-1 1-1h7v-7c0-.552.448-1 1-1z" />
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-teal-400 hover:text-teal-300"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.116-3.176 0 0 1.01-.322 3.31 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.3-1.23 3.3-1.23.656 1.653.244 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.485 5.92.43.37.815 1.1.815 2.22 0 1.606-.015 2.898-.015 3.293 0 .32.21.694.825.576 4.765-1.588 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>

      {/* コピーライト */}
      <div className="mt-8 text-center text-gray-400">
        ©2019-2024 vald.vdaas.org Vald team
      </div>
    </footer>
  );
}