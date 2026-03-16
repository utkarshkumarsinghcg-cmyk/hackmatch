import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import TeamCard from '../components/TeamCard';
import Skeleton from '../components/Skeleton';
import { dummyTeams } from '../services/dummyData';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredTeams = dummyTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.hackathonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Available Teams</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover teams looking for contributors or find partners for your next big idea.</p>
        </div>
        <Link to="/create-team">
          <Button size="md">
            + Create New Team
          </Button>
        </Link>
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
          </div>
        </div>
      </Card>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // Show 6 skeleton cards while loading
          [...Array(6)].map((_, index) => (
            <Card key={index} className="p-6 h-[320px] flex flex-col justify-between">
              <div>
                <Skeleton variant="rectangular" className="w-20 h-6 mb-4" />
                <Skeleton variant="text" className="h-8 w-3/4 mb-2" />
                <Skeleton variant="text" className="w-1/2 mb-4" />
                <Skeleton variant="text" className="mb-2" />
                <Skeleton variant="text" className="mb-2" />
                <Skeleton variant="text" className="w-2/3" />
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <Skeleton variant="rectangular" className="w-full h-10" />
              </div>
            </Card>
          ))
        ) : (
          filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 italic text-xl">No teams found matching your search.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Teams;
