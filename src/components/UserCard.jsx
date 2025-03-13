// import { useState } from "react";
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
          >
            See Projects
          </button>
        </div>
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