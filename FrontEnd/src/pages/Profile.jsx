import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Skeleton from '../components/Skeleton';
import { dummyUser, dummyTeams } from '../services/dummyData';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const user = dummyUser;
  const userTeams = dummyTeams.filter(team => 
    user.teamsCreated.includes(team.id) || user.teamsJoined.includes(team.id)
  );

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: User Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-8 text-center">
            {isLoading ? (
              <>
                <Skeleton variant="circular" className="w-32 h-32 mx-auto mb-6" />
                <Skeleton variant="text" className="h-8 w-3/4 mx-auto mb-2" />
                <Skeleton variant="text" className="w-1/2 mx-auto mb-6" />
                <div className="flex justify-center gap-3">
                  <Skeleton variant="rectangular" className="w-24 h-10" />
                  <Skeleton variant="rectangular" className="w-24 h-10" />
                </div>
              </>
            ) : (
              <>
                <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6 border-4 border-white dark:border-gray-800 shadow-lg">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{user.email}</p>
                <div className="flex justify-center gap-3">
                  <Button size="sm" variant="secondary" className="px-4">Edit Profile</Button>
                  <Button size="sm" variant="outline" className="px-4 text-red-600 border-red-200 hover:bg-red-50">Logout</Button>
                </div>
              </>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Professional Links</h3>
            <div className="space-y-3">
              {isLoading ? (
                <>
                  <Skeleton variant="text" className="h-6" />
                  <Skeleton variant="text" className="h-6" />
                </>
              ) : (
                <>
                  <a href={user.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.696 1.024 1.59 1.024 2.683 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    GitHub Profile
                  </a>
                  <a href={user.portfolioLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                    Portfolio Website
                  </a>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Experience & Teams */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">About Me</h3>
            {isLoading ? (
              <div className="space-y-4 mb-8">
                <Skeleton variant="text" className="h-4" />
                <Skeleton variant="text" className="h-4" />
                <Skeleton variant="text" className="h-4 w-2/3" />
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {user.bio}
              </p>
            )}
            
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Skills & Expertise</h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {isLoading ? (
                [...Array(5)].map((_, i) => <Skeleton key={i} variant="rectangular" className="w-20 h-8 rounded-xl" />)
              ) : (
                user.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-medium border border-blue-100 dark:border-blue-800">
                    {skill}
                  </span>
                ))
              )}
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="text-gray-500 dark:text-gray-400 text-sm">Experience Level:</div>
              {isLoading ? (
                <Skeleton variant="rectangular" className="w-24 h-6 rounded-full" />
              ) : (
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold font-mono">
                  {user.experienceLevel.toUpperCase()}
                </div>
              )}
            </div>
          </Card>

          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Active Projects</h3>
            <span className="text-sm text-gray-500">{isLoading ? <Skeleton variant="text" className="w-12 h-4" /> : `${userTeams.length} Total`}</span>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              [...Array(2)].map((_, i) => (
                <Card key={i} className="p-6 flex justify-between items-center border-l-4 border-l-blue-200">
                  <div className="space-y-2 w-1/2">
                    <Skeleton variant="text" className="h-6 w-3/4" />
                    <Skeleton variant="text" className="h-4 w-1/2" />
                  </div>
                  <Skeleton variant="rectangular" className="w-20 h-10" />
                </Card>
              ))
            ) : userTeams.length > 0 ? (
              userTeams.map(team => (
                <Card key={team.id} hover className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-l-blue-600">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{team.name}</h4>
                    <p className="text-sm text-blue-600 font-medium mb-1">{team.hackathonName}</p>
                    <p className="text-xs text-gray-400 font-mono">Role: {user.teamsCreated.includes(team.id) ? 'Team Lead' : 'Collaborator'}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{team.members.length}/{team.membersNeeded}</p>
                      <p className="text-[10px] uppercase text-gray-400 tracking-widest font-bold">Members</p>
                    </div>
                    <Button variant="secondary" size="sm">Manage</Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500">You haven't joined any teams yet.</p>
                <Button variant="outline" size="sm" className="mt-4">Browse Teams</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
