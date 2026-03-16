import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-3xl font-bold mb-4">Welcome to HackMatch</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-lg">
        Finding the perfect hackathon team has never been easier. 
        Connect with developers, designers, and problem solvers to build something amazing.
      </p>
      <div className="mt-8 flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          Browse Teams
        </button>
        <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
          Create Team
        </button>
      </div>
    </div>
  );
};

export default Home;
