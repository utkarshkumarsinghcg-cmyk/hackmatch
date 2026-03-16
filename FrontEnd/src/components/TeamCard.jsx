import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Button from './Button';

const TeamCard = ({ team }) => {
  const { id, name, hackathonName, projectIdea, requiredSkills, members, membersNeeded, status } = team;

  return (
    <Card hover className="p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          status === 'Open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
        }`}>
          {status.toUpperCase()}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {members.length}/{membersNeeded} Members
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{name}</h3>
      <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-4">{hackathonName}</p>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
        {projectIdea}
      </p>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {requiredSkills.map((skill, index) => (
            <span 
              key={index} 
              className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link to={`/teams/${id}`} className="w-full block">
            <Button variant="outline" className="w-full" size="sm">
              View Team Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default TeamCard;
