import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Skeleton from '../components/Skeleton';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userTeams, setUserTeams] = useState([]);

  useEffect(() => {
    const fetchUserTeams = async () => {
      try {
        // In a real app, we might have an endpoint for user teams
        // For now, let's fetch all teams and filter or rely on a future endpoint
        const response = await api.get('/teams');
        if (response.data.success) {
          // Filter teams where user is a member or creator
          const filtered = response.data.data.filter(t => 
            t.createdBy._id === user?._id || t.members.some(m => m._id === user?._id)
          );
          setUserTeams(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch user teams:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserTeams();
    }
  }, [user]);

  if (!user && !isLoading) {
    return <div className="profile">Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <div className="profile__grid">
        {/* Left Column: User Info */}
        <div className="profile__sidebar">
          <Card className="profile__user-card">
            {isLoading ? (
              <>
                <Skeleton variant="circular" className="w-32 h-32 mx-auto mb-6" />
                <Skeleton variant="text" className="h-8 w-3/4 mx-auto mb-2" />
                <Skeleton variant="text" className="w-1/2 mx-auto mb-6" />
                <div className="profile__actions">
                  <Skeleton variant="rectangular" className="w-24 h-10" />
                  <Skeleton variant="rectangular" className="w-24 h-10" />
                </div>
              </>
            ) : (
              <>
                <div className="profile__avatar">
                  {user.name.charAt(0)}
                </div>
                <h2 className="profile__name">{user.name}</h2>
                <p className="profile__email">{user.email}</p>
                <div className="profile__actions">
                  <Button size="sm" variant="secondary">Edit Profile</Button>
                  <Button size="sm" variant="outline" onClick={logout}>Logout</Button>
                </div>
              </>
            )}
          </Card>

          <Card className="profile__links-card">
            <h3 className="profile__links-title">Professional Links</h3>
            <div className="profile__links-list">
              {isLoading ? (
                <>
                  <Skeleton variant="text" className="h-6" />
                  <Skeleton variant="text" className="h-6" />
                </>
              ) : (
                <>
                  <a href={user.githubLink} target="_blank" rel="noopener noreferrer" className="profile__link">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.696 1.024 1.59 1.024 2.683 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    GitHub Profile
                  </a>
                  <a href={user.portfolioLink} target="_blank" rel="noopener noreferrer" className="profile__link">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                    Portfolio Website
                  </a>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Experience & Teams */}
        <div className="profile__main">
          <Card className="profile__about-card">
            <h3 className="profile__about-title">About Me</h3>
            {isLoading ? (
              <div className="space-y-4 mb-8">
                <Skeleton variant="text" className="h-4" />
                <Skeleton variant="text" className="h-4" />
                <Skeleton variant="text" className="h-4 w-2/3" />
              </div>
            ) : (
              <p className="profile__bio">{user.bio}</p>
            )}
            
            <h4 className="profile__skills-label">Skills & Expertise</h4>
            <div className="profile__skills-list">
              {isLoading ? (
                [...Array(5)].map((_, i) => <Skeleton key={i} variant="rectangular" className="w-20 h-8 rounded-xl" />)
              ) : (
                user.skills.map(skill => (
                  <span key={skill} className="profile__skill-tag">
                    {skill}
                  </span>
                ))
              )}
            </div>

            <div className="profile__experience-bar">
              <div className="profile__experience-label">Experience Level:</div>
              {isLoading ? (
                <Skeleton variant="rectangular" className="w-24 h-6 rounded-full" />
              ) : (
                <div className="profile__experience-badge">
                  {user.experienceLevel.toUpperCase()}
                </div>
              )}
            </div>
          </Card>

          <div className="profile__projects-header">
            <h3 className="profile__projects-title">Active Projects</h3>
            <span className="profile__projects-count">{isLoading ? <Skeleton variant="text" className="w-12 h-4" /> : `${userTeams.length} Total`}</span>
          </div>

          <div className="profile__projects-list">
            {isLoading ? (
              [...Array(2)].map((_, i) => (
                <Card key={i} className="profile__skeleton-card">
                  <div className="profile__skeleton-info">
                    <Skeleton variant="text" className="h-6 w-3/4" />
                    <Skeleton variant="text" className="h-4 w-1/2" />
                  </div>
                  <Skeleton variant="rectangular" className="w-20 h-10" />
                </Card>
              ))
            ) : userTeams.length > 0 ? (
              userTeams.map(team => (
                <Card key={team._id} hover className="profile__project-card">
                  <div>
                    <h4 className="profile__project-name">{team.teamName}</h4>
                    <p className="profile__project-hackathon">{team.hackathonName}</p>
                    <p className="profile__project-role">Role: {team.createdBy._id === user._id ? 'Team Lead' : 'Collaborator'}</p>
                  </div>
                  <div className="profile__project-stats">
                    <div className="profile__project-members">
                      <p className="profile__project-members-count">{team.members.length}</p>
                      <p className="profile__project-members-label">Members</p>
                    </div>
                    <Button variant="secondary" size="sm">Manage</Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="profile__empty">
                <p className="profile__empty-text">You haven't joined any teams yet.</p>
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
