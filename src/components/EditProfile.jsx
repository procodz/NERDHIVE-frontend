import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user, onFormChange }) => {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
  const [age, setAge] = useState(user?.age || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [about, setAbout] = useState(user?.about || '');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    onFormChange({
      ...user,
      firstName,
      lastName,
      photoUrl,
      age,
      about,
      gender
    });
  }, [firstName, lastName, photoUrl, age, about, gender]);

  const saveProfile = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/user/edit", 
        {firstName, lastName, photoUrl, age, gender, about}, 
        {withCredentials: true}
      );
      
      // Update the Redux store with the response data
      dispatch(addUser(res.data));
      
      // Update the local form state
      onFormChange(res.data.data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <form onSubmit={saveProfile} className="card-body">
          <h2 className="card-title flex justify-center">Edit Profile</h2>
          
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          {/* First Name */}
          <div>
            <label className="form-control w-full max-w-xs py-3">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input 
                type="text" 
                value={firstName} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}  
              />
            </label>
          </div>

          {/* Last Name */}
          <div>
            <label className="form-control w-full max-w-xs py-3">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input 
                type="text" 
                value={lastName}
                className="input input-bordered w-full max-w-xs" 
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>

          {/* Photo URL */}
          <div>
            <label className="form-control w-full max-w-xs py-3">
              <div className="label">
                <span className="label-text">Photo URL</span>
              </div>
              <input 
                type="text" 
                value={photoUrl} 
                className="input input-bordered w-full max-w-xs"  
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
          </div>

          {/* Age */}
          <div>
            <label className="form-control w-full max-w-xs py-3">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input 
                type="number" 
                value={age}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
          </div>

          {/* Gender */}
          <div>
            <label className="form-control w-full max-w-xs py-3">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <select 
                className="select select-bordered w-full max-w-xs"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          {/* About */}
          <div>
            <label className="form-control w-full max-w-xs py-3">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <textarea 
                className="textarea textarea-bordered h-24"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
          </div>

          <div className="card-actions justify-center mt-4">
            <button type="submit" className="bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-1.5 rounded-md text-sm font-normal transition-all">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
