"use client"; // クライアントコンポーネントであることを明示

import { useState, useEffect } from "react";
import { FaGithub, FaSlack, FaBars, FaTimes } from "react-icons/fa";
import { PiXLogoBold } from "react-icons/pi";
import { FiChevronDown } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    async function fetchGitHubStars() {
      try {
        const response = await fetch("https://api.github.com/repos/vdaas/vald");
        const data = await response.json();

        if (data.stargazers_count !== undefined) {
          setStarCount(data.stargazers_count);
        } else {
          console.error(
            "GitHub API response did not include 'stargazers_count'",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    }

    fetchGitHubStars();
  }, []);

  // バージョン一覧
  const versions = [
    "v1.7.16",
    "v1.7",
    "v1.6",
    "v1.5",
    "v1.4",
    "v1.3",
    "v1.2",
    "v1.1",
    "v1.0",
  ];
  const latestVersion = "v1.7.16"; // 最新バージョン

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* 左側: ロゴ (左揃え) */}
        <div className="flex items-center">
          <img
            src="/images/logo_vald.svg"
            alt="Vald Logo"
            width={84}
            height={64}
          />
        </div>

        {/* 右側: メニュー & ソーシャルリンク (PC) */}
        <div className="hidden md:flex items-center space-x-6 text-[#000000]">
          {/* メニュー */}
          <nav className="flex space-x-6 text-[#000000] font-medium">
            <a href="#about" className="hover:text-[#666666]">
              About
            </a>
            <a href="#docs" className="hover:text-[#666666]">
              Document
            </a>

            {/* Versions (PC & スマホ共通) */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 hover:text-[#666666]"
                onClick={toggleDropdown}
              >
                <span>Versions</span>
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ドロップダウンメニュー (PC) */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden md:block hidden">
                  {versions.map((version) => (
                    <a
                      key={version}
                      href={`/docs/${version}`}
                      className="block px-4 py-2 hover:bg-gray-100 flex justify-between"
                    >
                      <span className="font-semibold">{version}</span>
                      {version === latestVersion && (
                        <span className="bg-teal-700 text-white text-xs px-2 py-1 rounded ml-2">
                          latest
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://vdaas-vald.medium.com/"
              target="_blank"
              className="hover:text-[#666666] flex items-center space-x-1"
            >
              <span>Blog</span>
              <FiArrowUpRight className="h-4 w-4" />
            </a>
          </nav>

          {/* GitHubのスター数 & ソーシャルリンク */}
          <div className="flex space-x-4">
            <a
              href="https://github.com/vdaas/vald"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-[#666666]"
            >
              <FaGithub className="h-5 w-5" />
              {starCount !== null ? (
                <span className="text-sm font-medium">
                  {starCount.toLocaleString()}
                </span>
              ) : (
                <span className="text-sm text-[#000000]">Loading...</span>
              )}
            </a>

            <a
              href="https://twitter.com/vdaas"
              target="_blank"
              className="hover:text-[#666666]"
            >
              <PiXLogoBold className="h-5 w-5" />
            </a>
            <a
              href="https://slack.vdaas.org"
              target="_blank"
              className="hover:text-[#666666]"
            >
              <FaSlack className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* ハンバーガーメニュー (スマホ) */}
        <button
          className="block md:hidden text-[#000000] hover:text-[#666666] focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* モバイルメニュー */}
      <nav
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white shadow-md z-50
    transition-all duration-300 ease-in-out overflow-hidden
    ${
      isMenuOpen
        ? "max-h-screen opacity-100 visible overflow-y-auto"
        : "max-h-0 opacity-0 invisible"
    }`}
      >
        {/* ヘッダーと同じ位置に ×ボタン & ロゴ */}
        <div className="relative w-full flex justify-between items-center px-6 py-4 border-b shadow-sm">
          <img
            src="/images/logo_vald.svg"
            alt="Vald Logo"
            width={84}
            height={64}
            className="block"
          />
          <button
            onClick={toggleMenu}
            className="text-[#000000] hover:text-[#666666]"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center py-4 space-y-4 text-[#000000] font-medium">
          <a href="#about" className="hover:text-[#666666]">
            About
          </a>
          <a href="#docs" className="hover:text-[#666666]">
            Docs
          </a>

          {/* Versions (スマホ用) */}
          <div className="w-full px-6">
            <button
              className="flex items-center justify-center w-full py-2 text-[#000000] font-medium hover:text-[#666666]"
              onClick={toggleDropdown}
            >
              <span>Versions</span>
              <FiChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* ドロップダウンメニュー (スマホ) */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden
        ${
          isDropdownOpen
            ? "max-h-80 opacity-100 visible overflow-y-auto"
            : "max-h-0 opacity-0 invisible"
        }`}
            >
              {versions.map((version) => (
                <a
                  key={version}
                  href={`/docs/${version}`}
                  className="block px-6 py-2 hover:bg-gray-100 flex justify-center"
                >
                  <span className="font-semibold">{version}</span>
                  {version === latestVersion && (
                    <span className="bg-teal-700 text-white text-xs px-2 py-1 rounded ml-2">
                      latest
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <a
            href="https://vdaas-vald.medium.com/"
            target="_blank"
            className="hover:text-[#666666] flex items-center space-x-1"
          >
            <span>Blog</span>
            <FiArrowUpRight className="h-4 w-4" />
          </a>

          {/* ソーシャルリンク */}
          <a
            href="https://github.com/vdaas/vald"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-[#666666]"
          >
            <FaGithub className="h-5 w-5" />
            {starCount !== null ? (
              <span className="text-sm font-medium">
                {starCount.toLocaleString()}
              </span>
            ) : (
              <span className="text-sm text-[#000000]">Loading...</span>
            )}
          </a>
          <a
            href="https://twitter.com/vdaas"
            target="_blank"
            className="hover:text-[#666666]"
          >
            <PiXLogoBold className="h-5 w-5" />
          </a>
          <a
            href="https://slack.vdaas.org"
            target="_blank"
            className="hover:text-[#666666]"
          >
            <FaSlack className="h-5 w-5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
