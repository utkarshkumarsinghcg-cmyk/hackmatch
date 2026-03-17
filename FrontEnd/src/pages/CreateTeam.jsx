import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import api from '../services/api';
import './CreateTeam.css';

const CreateTeam = () => {
  const [formData, setFormData] = useState({
    name: '',
    hackathonName: '',
    projectIdea: '',
    membersNeeded: 2,
    requiredSkills: ''
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Backend expects: teamName, projectIdea, hackathonName, requiredSkills
      const skillsArray = formData.requiredSkills.split(',').map(skill => skill.trim()).filter(s => s);
      
      const response = await api.post('/teams', {
        teamName: formData.name,
        hackathonName: formData.hackathonName,
        projectIdea: formData.projectIdea,
        requiredSkills: skillsArray
        // Note: backend doesn't currently take membersNeeded, so we ignore it or could add it in future
      });

      if (response.data.success) {
        navigate('/teams');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-team">
      <div className="create-team__header">
        <p className="create-team__label">Recruit</p>
        <h1 className="create-team__title">Create a New Team</h1>
        <p className="create-team__desc">Share your vision and attract the perfect collaborators for your hackathon project.</p>
      </div>

      <div className="create-team__card">
        <form onSubmit={handleSubmit} className="create-team__form">
          <Input
            label="Team / Project Name"
            id="name"
            placeholder="e.g. AI Visionaries"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Target Hackathon"
            id="hackathonName"
            placeholder="e.g. MHacks 2024"
            value={formData.hackathonName}
            onChange={handleChange}
            required
          />

          <div className="create-team__textarea-group">
            <label htmlFor="projectIdea" className="create-team__textarea-label">
              Project Idea <span className="create-team__textarea-required">*</span>
            </label>
            <textarea
              id="projectIdea"
              rows="4"
              placeholder="Describe your project goal and what you're planning to build..."
              className="create-team__textarea"
              value={formData.projectIdea}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="create-team__row">
            <Input
              label="Team Size (Members Needed)"
              id="membersNeeded"
              type="number"
              min="2"
              max="10"
              value={formData.membersNeeded}
              onChange={handleChange}
              required
            />
            <Input
              label="Required Skills (comma separated)"
              id="requiredSkills"
              placeholder="React, Node.js, AI/ML"
              value={formData.requiredSkills}
              onChange={handleChange}
              required
            />
          </div>

          <div className="create-team__actions">
            <Button type="submit" className="create-team__submit" size="md" isLoading={loading}>
              🚀 Post Team Listing
            </Button>
            <Button variant="secondary" className="create-team__cancel" size="md" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
