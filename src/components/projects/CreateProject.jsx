import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const CreateProject = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'public',
    status: 'planning',
    techStack: [],
    githubLink: '',
    endDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/projects`,
        {
          ...formData,
          techStack: formData.techStack.filter(tech => tech.trim() !== '')
        },
        { withCredentials: true }
      );
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleTechStackChange = (e) => {
    const techs = e.target.value.split(',').map(tech => tech.trim());
    setFormData({ ...formData, techStack: techs });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-[calc(100vh-10rem)]">
      <h1 className="text-2xl font-bold mb-8 text-center">
        <span className="text-gradient">Create</span>
        <span className="text-accent"> New Project</span>
      </h1>
      
      <div className="glass-effect p-6 rounded-xl border border-base-300/30">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-base-content/80 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content/80 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
              rows="4"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-base-content/80 mb-2">
                Visibility
              </label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content/80 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content/80 mb-2">
              Tech Stack (comma-separated)
            </label>
            <input
              type="text"
              value={formData.techStack.join(', ')}
              onChange={handleTechStackChange}
              className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content/80 mb-2">
              GitHub Link
            </label>
            <input
              type="url"
              value={formData.githubLink}
              onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content/80 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-2 rounded-md text-sm font-normal transition-all"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
