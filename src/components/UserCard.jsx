// UserCard.jsx
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedslice";
import PropTypes from 'prop-types';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = user?._id;

  if (!user) return null;

  // Handle both array and object type skills
  const getSkillsArray = (skills) => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills;
    return Object.entries(skills);
  };

  const skillsArray = getSkillsArray(user.skills);

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

  const handleSeeProjects = () => {
    navigate(`/user/${userId}/projects`);
  };

  return (
    <div className="card bg-dark-card w-[28rem] shadow-neon-blue hover:shadow-neon-blue/50 transition-all duration-300 rounded-xl overflow-hidden my-10 mx-auto border border-dark-border hover:border-nerdhive-green group">
      <figure className="relative h-94 overflow-hidden">
        <img 
          src={user.photoUrl} 
          alt={`${user.firstName}'s photo`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-dark-bg/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">
            {user.firstName} {user.lastName}
          </h2>
        </div>
      </figure>

      <div className="card-body p-6 bg-dark-surface">
        <p className="text-base-content/70 text-sm line-clamp-2">{user.about}</p>
        <div className="mt-2">
          <p className="text-base-content/70 text-sm mb-2">Tech Stack:</p>
          <div className="flex flex-wrap gap-2">
            {skillsArray.map((skill) => (
              <span
                key={Array.isArray(skill) ? skill[0] : skill}
                className="badge badge-primary badge-sm"
                title={Array.isArray(skill) ? `Level: ${skill[1]}` : ''}
              >
                {Array.isArray(skill) ? skill[0] : skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-actions justify-between mt-4 gap-2">
          <button
            className="flex-1 bg-dark-bg border border-error text-error hover:bg-error hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-neon-orange"
            onClick={() => handleSendRequest("ignored", userId)}
          >
            Ignore
          </button>
          <button
            className="flex-1 bg-dark-bg border border-success text-success hover:bg-success hover:text-dark-bg px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-neon-green"
            onClick={() => handleSendRequest("interested", userId)}
          >
            Interested
          </button>
          <button
            className="flex-1 bg-dark-bg border border-accent text-accent hover:bg-accent hover:text-dark-bg px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-neon-green"
            onClick={handleSeeProjects}
          >
            Projects
          </button>
        </div>
      </div>
    </div>
  );
};

// Update PropTypes to accept both array and object
UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    about: PropTypes.string,
    skills: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
  }).isRequired,
};

export default UserCard;