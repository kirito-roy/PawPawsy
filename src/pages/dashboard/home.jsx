import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          Welcome to PawPawsy
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Your personal dashboard is ready.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/dashboard/profile"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;