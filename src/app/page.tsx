import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "top",
  description: "top",
};

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ファーストビューセクション */}
      <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Welcome to Our OSS
        </h1>
        <p className="text-lg md:text-2xl text-center max-w-2xl mb-6">
          Open-source solutions to power your projects and ideas.
        </p>
        <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-gray-200">
          Get Started
        </button>
      </section>

      {/* 特徴セクション */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Feature 1</h3>
            <p className="text-gray-700">
              Description of the first feature that highlights its benefits and use cases.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Feature 2</h3>
            <p className="text-gray-700">
              Explanation of the second feature and how it solves user problems.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Feature 3</h3>
            <p className="text-gray-700">
              Details about the third feature that make it stand out.
            </p>
          </div>
        </div>
      </section>

      {/* ユーザーセクション */}
      <section className="py-16 bg-gray-50 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-md flex items-center">
            <img
              src="https://via.placeholder.com/64"
              alt="User 1"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">User 1</h3>
              <p className="text-gray-600">
                "This OSS has transformed the way I work on projects!"
              </p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md flex items-center">
            <img
              src="https://via.placeholder.com/64"
              alt="User 2"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">User 2</h3>
              <p className="text-gray-600">
                "Incredible features and easy to use."
              </p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md flex items-center">
            <img
              src="https://via.placeholder.com/64"
              alt="User 3"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">User 3</h3>
              <p className="text-gray-600">
                "Highly recommend this for anyone in tech!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
