import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-white dark:bg-gray-900">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
              Build Your <span className="text-blue-600">Dream Team</span> for the Next Hackathon
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              HackMatch connects developers, designers, and innovators. Stop missing opportunities because you're alone—find the perfect teammates with the right skills in minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/teams"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all transform hover:-translate-y-1"
              >
                Browse Available Teams
              </Link>
              <Link
                to="/create-team"
                className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all transform hover:-translate-y-1"
              >
                Create a Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Teams Formed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">2k+</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">150+</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Hackathons</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">50+</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Tech Stacks</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-4">Create Your Profile</h3>
              <p className="text-gray-600 dark:text-gray-400">List your skills, experience, and GitHub projects to showcase what you bring to the table.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-4">Find or Create Team</h3>
              <p className="text-gray-600 dark:text-gray-400">Browse teams looking for your skills or create your own project idea and recruit members.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-4">Start Building</h3>
              <p className="text-gray-600 dark:text-gray-400">Connect with your new teammates and start collaborating on your next big innovation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 to-blue-600 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to join your next hackathon?</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Join thousands of students who have already found their teammates on HackMatch.
              </p>
              <Link
                to="/signup"
                className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors"
              >
                Get Started Now — It's Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
