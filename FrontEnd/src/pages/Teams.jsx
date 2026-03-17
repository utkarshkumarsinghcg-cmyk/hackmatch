import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import TeamCard from '../components/TeamCard';
import Skeleton from '../components/Skeleton';
import api from '../services/api';
import './Teams.css';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('All Skills');
  const [isLoading, setIsLoading] = useState(true);

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await api.get('/teams');
        if (response.data.success) {
          setTeams(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.hackathonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkill = skillFilter === 'All Skills' ||
      team.requiredSkills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()));
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="teams">
      {/* Header */}
      <div className="teams__header">
        <div>
          <p className="teams__label">Explore</p>
          <h1 className="teams__title">Find Your Team</h1>
          <p className="teams__desc">
            Discover passionate developers and designers who are ready to build something extraordinary.
          </p>
        </div>
        <Link to="/create-team">
          <Button size="md">
            + Create New Team
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="teams__filters">
        <div className="teams__search-wrapper">
          <Input
            placeholder="Search by name, hackathon or skill..."
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="teams__filter-controls">
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="teams__select"
          >
            <option>All Skills</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>UI/UX</option>
            <option>AI/ML</option>
            <option>Blockchain</option>
          </select>
        </div>
      </div>

      {/* Meta Info */}
      {!isLoading && (
        <p className="teams__meta">
          Showing <span className="teams__meta-count">{filteredTeams.length}</span> teams
        </p>
      )}

      {/* Grid */}
      <div className="teams__grid">
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <div key={index} className="teams__skeleton-card">
              <div className="teams__skeleton-header">
                <Skeleton variant="rectangular" className="w-16 h-7 rounded-full" />
                <Skeleton variant="rectangular" className="w-20 h-7 rounded-full" />
              </div>
              <Skeleton variant="text" className="h-8 w-3/4 mt-4" />
              <Skeleton variant="text" className="h-4 w-1/2" />
              <Skeleton variant="text" className="h-4" />
              <Skeleton variant="text" className="h-4" />
              <Skeleton variant="text" className="h-4 w-2/3" />
              <div className="teams__skeleton-skills">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} variant="rectangular" className="w-16 h-7 rounded-lg" />
                ))}
              </div>
            </div>
          ))
        ) : filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <TeamCard key={team._id} team={team} />
            ))
        ) : (
          <div className="teams__empty">
            <div className="teams__empty-icon">🔍</div>
            <h3 className="teams__empty-title">No teams found</h3>
            <p className="teams__empty-desc">Try adjusting your search or browse all available teams.</p>
            <Button variant="secondary" onClick={() => { setSearchTerm(''); setSkillFilter('All Skills'); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
