import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedslice";

const UserCard = ({ user }) => {
  if (!user) return null;

  const dispatch = useDispatch();
  const userId = user._id;
  const [projects, setProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
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
    <div className="card bg-base-300 w-96 shadow-xl my-10 mx-auto">
      <figure>
        <img src={user.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
        <p>{user.about}</p>

        {/* Action Buttons */}
        <div className="card-actions justify-center my-2 gap-3">
          <button
            className="bg-transparent border border-red-400 text-red-400 hover:bg-red-400/10 px-4 py-1.5 rounded-md text-sm font-normal transition-all"
            onClick={() => handleSendRequest("ignored", userId)}
          >
            Ignore
          </button>
          <button
            className="bg-transparent border border-green-400 text-green-400 hover:bg-green-400/10 px-4 py-1.5 rounded-md text-sm font-normal transition-all"
            onClick={() => handleSendRequest("interested", userId)}
          >
            Interested
          </button>
          <button
            className="bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-1.5 rounded-md text-sm font-normal transition-all"
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
            <h3 className="text-lg font-bold mb-2">Public Projects</h3>
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="mb-4 p-4 bg-base-200 rounded-lg">
                  <h4 className="font-semibold">{project.title}</h4>
                  <p className="text-sm text-gray-600">{project.description}</p>
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
              <p className="text-gray-500">No public projects found.</p>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default UserCard;