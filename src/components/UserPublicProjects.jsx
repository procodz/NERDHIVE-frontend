import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const UserPublicProjects = () => {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Fetch projects and user data sequentially
        const projectsRes = await axios.get(`${BASE_URL}/projects/public/${userId}`, {withCredentials: true});
        const userDataRes = await axios.get(`${BASE_URL}/profile/view/${userId}`, {withCredentials: true});
        
        console.log("User data:", userDataRes.data);
        console.log("Projects:", projectsRes.data);

        if (!projectsRes.data) {
          throw new Error('Public project not found');
        }

        setProjects(projectsRes.data);
        setUserData(userDataRes.data); // Set user data correctly - ensure this is the only place you set it
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(
          error.response?.data?.error || 
          error.message || 
          "Failed to fetch data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {userData && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {userData.firstName}'s Projects
          </h1>
          {userData.about && <p className="text-base-content/70">{userData.about}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.description}</p>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Tech Stack:</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="badge badge-primary">{tech}</span>
                    ))}
                  </div>
                </div>
                
                {project.githubLink && (
                  <div className="mt-4">
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline"
                    >
                      GitHub Repository
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg">
            No public projects found.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPublicProjects;