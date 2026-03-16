import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const CreateTeam = () => {
  const [formData, setFormData] = useState({
    name: '',
    hackathonName: '',
    projectIdea: '',
    membersNeeded: 2,
    requiredSkills: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Create Team attempt:', formData);
    // Logic will be added in later phases
  };

  return (
    <div className="py-12 px-4 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create a New Team</h1>
        <p className="text-gray-600 dark:text-gray-400">Share your vision and find the perfect teammates for your next project.</p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Team / Project Name"
            id="name"
            placeholder="e.g. AI Visionaries"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Hackathon Name"
            id="hackathonName"
            placeholder="e.g. MHacks 2024"
            value={formData.hackathonName}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="projectIdea" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Project Idea <span className="text-red-500">*</span>
            </label>
            <textarea
              id="projectIdea"
              rows="4"
              placeholder="Describe your project goal and what you're planning to build..."
              className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:text-white"
              value={formData.projectIdea}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Members Needed (including you)"
              id="membersNeeded"
              type="number"
              min="2"
              max="10"
              value={formData.membersNeeded}
              onChange={handleChange}
              required
            />
            <Input
              label="Skills Required (comma separated)"
              id="requiredSkills"
              placeholder="React, Node.js, AI"
              value={formData.requiredSkills}
              onChange={handleChange}
              required
            />
          </div>

          <div className="pt-4 flex gap-4">
            <Button type="submit" className="flex-grow" size="lg">
              Create Team 
            </Button>
            <Button variant="secondary" className="px-8" size="lg" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateTeam;
