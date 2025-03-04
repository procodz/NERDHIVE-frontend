import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedslice";
import PropTypes from 'prop-types';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const userId = user?._id;
  const [projects, setProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) return null;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeeProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BASE_URL}/user/${userId}/projects`, {
        withCredentials: true,
      });
      setProjects(res.data.data);
      setShowProjects(true);
    } catch (error) {
      setError("Failed to fetch projects. Please try again.");
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-lg rounded-lg overflow-hidden my-10 mx-auto">
      <figure className="relative">
        <img src={user.photoUrl} alt="photo" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-2xl font-bold text-gradient mb-2">{user.firstName + " " + user.lastName}</h2>
        <p className="text-base-content/80 mb-4">{user.about}</p>

        {/* Action Buttons */}
        <div className="card-actions justify-center my-2 gap-3">
          <button
            className="bg-transparent border border-red-400 text-red-400 hover:bg-red-400/10 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            onClick={() => handleSendRequest("ignored", userId)}
          >
            Ignore
          </button>
          <button
            className="bg-transparent border border-green-400 text-green-400 hover:bg-green-400/10 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            onClick={() => handleSendRequest("interested", userId)}
          >
            Interested
          </button>
          <button
            className="bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            onClick={handleSeeProjects}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "See Projects"
            )}
          </button>
        </div>

        {/* Projects Section */}
        {showProjects && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2 text-gradient">Public Projects</h3>
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="mb-4 p-4 bg-base-200 rounded-lg shadow-md">
                  <h4 className="font-semibold text-base-content/90">{project.title}</h4>
                  <p className="text-sm text-base-content/70">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="badge badge-outline">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-base-content/70">No public projects found.</p>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    about: PropTypes.string,
  }).isRequired,
};

export default UserCard;