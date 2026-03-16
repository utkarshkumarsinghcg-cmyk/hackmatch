import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import TeamCard from '../components/TeamCard';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data representing what we'll eventually fetch from the backend
  const teamsData = [
    {
      id: 1,
      name: "Cyber Sentinels",
      hackathonName: "Global Cybersecurity Summit",
      projectIdea: "Building an AI-powered threat detection system for small businesses to prevent ransomware attacks.",
      requiredSkills: ["Python", "TensorFlow", "FastAPI"],
      members: [1, 2],
      membersNeeded: 4,
      status: "Open"
    },
    {
      id: 2,
      name: "EcoTrackers",
      hackathonName: "Green Tech Hack 2024",
      projectIdea: "A mobile app that tracks personal carbon footprint using IoT data from smart home devices.",
      requiredSkills: ["React Native", "Node.js", "IoT"],
      members: [1, 2, 3],
      membersNeeded: 4,
      status: "Open"
    },
    {
      id: 3,
      name: "FinFlow",
      hackathonName: "Fintech Innovation Week",
      projectIdea: "Decentralized finance platform for automated micro-lending in emerging markets.",
      requiredSkills: ["Solidity", "React", "Web3.js"],
      members: [1, 2],
      membersNeeded: 3,
      status: "Open"
    }
  ];

  return (
    <div className="py-8">
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
        {teamsData.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default Teams;
