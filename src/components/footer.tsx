"use client"; // Next.js の Client Component

import React from "react";
// import { FaGithub } from "react-icons/fa";
// import { PiXLogoBold } from "react-icons/pi"; // X (Twitter) アイコン
// import { FaSlack } from "react-icons/fa"; // Slack アイコン

export default function Footer() {
  return (
    <footer className="bg-white py-8 px-6 border-t border-gray-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* 左側のロゴとリンク */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* メインロゴ */}
          <div className="flex items-center space-x-2">
            <img src="/images/logo_vald.svg" alt="Vald" className="h-8" />
          </div>

          {/* 他のロゴ */}
          <div className="flex space-x-4">
            <img
              src="/images/cloud-native-landscape.png"
              alt="Cloud Native Landscape"
              className="h-8"
            />
            <img
              src="/images/lfai-landscape.png"
              alt="LF AI & Data Landscape"
              className="h-8"
            />
          </div>
        </div>

        {/* 右側のナビゲーション */}
        <div className="hidden md:flex space-x-6 text-gray-700 text-sm font-semibold">
          <a href="#" className="hover:text-black">
            About
          </a>
          <a href="#" className="hover:text-black">
            Docs
          </a>
          <a
            href="#"
            target="_blank"
            className="hover:text-black flex items-center"
          >
            Blog <span className="ml-1">↗</span>
          </a>
          {/* <a href="#" className="hover:text-black flex items-center">
            <FaGithub className="mr-1" /> Star 1.5K
          </a>
          <a href="#" className="hover:text-black"><PiXLogoBold /></a>
          <a href="#" className="hover:text-black"><FaSlack /></a> */}
        </div>
      </div>

      {/* モバイル版のナビゲーション */}
      <div className="md:hidden mt-6 text-center space-y-4 text-gray-800 font-semibold">
        <a href="#" className="block">
          About
        </a>
        <a href="#" className="block">
          Docs
        </a>
        <a href="#" target="_blank" className="block flex justify-center">
          Blog <span className="ml-1">↗</span>
        </a>
        {/* <a href="#" className="block flex justify-center">
          <FaGithub className="mr-1" /> Star 1.5K
        </a> */}
        <div className="flex justify-center space-x-4 mt-2">
          {/* <a href="#" className="hover:text-black"><PiXLogoBold /></a>
          <a href="#" className="hover:text-black"><FaSlack /></a> */}
        </div>
      </div>

      {/* コピーライト */}
      <div className="text-center text-gray-600 text-sm mt-8">
        Copyright© 2025{" "}
        <a
          href="https://vald.vdaas.org"
          target="_blank"
          className="hover:text-black"
        >
          vald.vdaas.org
        </a>{" "}
        Vald team. All rights reserved.
      </div>
    </footer>
  );
}
