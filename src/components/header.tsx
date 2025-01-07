"use client";

import Link from "next/link";
import { useState } from "react"; 


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* <img
            src="/logo.png" // ロゴの画像パスに合わせて変更
            alt="Logo"
            className="h-8 w-8"
          /> */}
          <span className="text-xl font-bold text-gray-800">Vald</span>
          <span className="text-sm font-medium text-gray-500"></span>
        </div>

        {/* 中央: メニュー */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-white shadow-md md:static md:flex md:space-x-6 md:shadow-none md:w-auto md:bg-transparent text-gray-600 font-medium`}
        >
          <a href="#why-milvus" className="block py-2 px-6 md:inline hover:text-gray-800">
            menu
          </a>
          <a href="#docs" className="block py-2 px-6 md:inline hover:text-gray-800">
          menu
          </a>
          <a href="#tutorials" className="block py-2 px-6 md:inline hover:text-gray-800">
          menu
          </a>
          <a href="#tools" className="block py-2 px-6 md:inline hover:text-gray-800">
          menu
          </a>
          <a href="#blog" className="block py-2 px-6 md:inline hover:text-gray-800">
          menu
          </a>
          <a href="#community" className="block py-2 px-6 md:inline hover:text-gray-800">
          menu
          </a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://github.com/vdass/vald" // GitHubリポジトリのリンクに変更
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.21.66-.47v-1.7c-2.78.6-3.36-1.34-3.36-1.34-.46-1.17-1.12-1.48-1.12-1.48-.92-.63.07-.62.07-.62 1.02.07 1.56 1.04 1.56 1.04.9 1.55 2.35 1.1 2.92.84.09-.65.35-1.1.63-1.36-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.29.1-2.69 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0112 6.8a9.57 9.57 0 012.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.4.2 2.43.1 2.69.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.7-4.59 4.95.36.31.68.92.68 1.86v2.76c0 .26.16.57.67.47A10 10 0 0022 12c0-5.52-4.48-10-10-10z"
                clipRule="evenodd"
              />
            </svg>
            <span>Star xxxK</span>
          </a>
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700">
            Get Started
          </button>
        </div>

        {/* ハンバーガーメニューボタン */}
        <button
          className="block md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 7.5h16.5m-16.5 7.5h16.5"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
