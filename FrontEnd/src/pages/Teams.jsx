import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Available Teams</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover teams looking for contributors or find partners for your next big idea.</p>
        </div>
        <Button size="md">
          + Create New Team
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input 
              placeholder="Search by hackathon or skills..." 
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white">
              <option>All Skills</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>UI/UX</option>
              <option>AI/ML</option>
            </select>
            <select className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white">
              <option>Status: Open</option>
              <option>Status: Full</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Teams Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* We will implement TeamCard and map through real data in Phase 9 & 12 */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} hover className="p-6">
            <div className="h-6 w-24 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs font-bold flex items-center justify-center mb-4">
              OPEN
            </div>
            <h3 className="text-xl font-bold mb-2">Hackathon Project {item}</h3>
            <p className="text-sm text-blue-600 font-medium mb-4">Global AI Challenge</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
              Building a decentralized platform for real-time collaboration using AI and blockchain technology. Looking for expert developers.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">React</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">Node.js</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">Python</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-500">2/4 Members</span>
              <Link to={`/teams/${item}`}>
                <Button variant="outline" size="sm">View Details</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Internal Link wrapper for demo purposes since we don't have the details page yet
const Link = ({ to, children }) => <span className="cursor-pointer">{children}</span>;

export default Teams;
