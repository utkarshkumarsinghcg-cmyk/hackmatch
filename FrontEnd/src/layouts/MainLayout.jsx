import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      
      {/* Footer will go here in Phase 3 */}
      <footer className="p-4 bg-white dark:bg-gray-800 mt-auto border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} HackMatch. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
