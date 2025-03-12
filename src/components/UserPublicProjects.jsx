import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import ProjectCard from './ProjectCard';
import { useSelector } from 'react-redux';

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
        
        // Fetch projects and user data in parallel
        // const [projectsRes, userRes] = await Promise.all([
        //   axios.get(`${BASE_URL}/projects/public/${userId}`, {
        //     withCredentials: true
        //   }),
        //   axios.get(`${BASE_URL}/profile/view/${userId}`, {
        //     withCredentials: true
        //   })
        // ]);
        const projectsRes = await axios.get(`${BASE_URL}/projects/public/${userId}`, {withCredentials: true});
        const userDataRes = await axios.get(`${BASE_URL}/profile/view/${userId}`, {withCredentials: true});
        const firstName = userDataRes.data.firstName;
        const lastName = userDataRes.data.lastName;
        setUserData(userDataRes.data);
        console.log(firstName, lastName);

        // console.log(projectsRes.data);

        if (!projectsRes.data) {
          throw new Error('Public project not found');
        }

        setProjects(projectsRes.data);
        setUserData(projectsRes.data);
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
            {userData.firstName} {userData.lastName}&apos;s Projects
          </h1>
          <p className="text-base-content/70">{userData.about}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
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