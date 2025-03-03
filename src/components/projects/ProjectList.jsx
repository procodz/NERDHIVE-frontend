import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projects/me`, {
          withCredentials: true
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <div className="loading loading-spinner loading-sm text-accent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-[calc(100vh-10rem)]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          <span className="text-gradient">My</span>
          <span className="text-accent"> Projects</span>
        </h2>
        <Link
          to="/projects/new"
          className="bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-1.5 rounded-md text-sm font-normal transition-all"
        >
          Create Project
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="glass-effect rounded-lg p-5 hover:shadow-lg transition-all border border-base-300/30"
          >
            <Link to={`/projects/${project._id}`} className="block h-full">
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-base-content/70 mb-4 text-sm">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-md text-xs ${
                  project.status === 'completed' ? 'bg-green-400/10 text-green-400 border border-green-400/30' :
                  project.status === 'in-progress' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30' :
                  'bg-red-400/10 text-red-400 border border-red-400/30'
                }`}>
                  {project.status}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-base-content/60">
                    {project.collaborators.length} collaborators
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
