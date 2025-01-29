import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      const res = await axios.post(BASE_URL + "/login", 
        {
          emailId: formData.emailId,
          password: formData.password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      localStorage.setItem('user', JSON.stringify(res.data.data || res.data));
      navigate("/feed");
    } catch(err) {
      setError("Invalid credentials");
      console.error(err);
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      await axios.post(BASE_URL + "/signup", 
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailId: formData.emailId,
          password: formData.password,
        }
      );
      setSuccessMessage("Signup successful! Please login with your credentials.");
      setFormData({
        emailId: "",
        password: "",
        firstName: "",
        lastName: ""
      });
      setIsLogin(true);
    } catch(err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    }
  }

  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center bg-black">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
        animate={{
          background: [
            "linear-gradient(to right, #1a1a1a, #2d2d2d, #1a1a1a)",
            "linear-gradient(to right, #2d2d2d, #1a1a1a, #2d2d2d)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Animated NERDHIVE Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-96 h-96 text-gray-700"
        >
          <motion.path
            d="M100 20 L180 90 L100 160 L20 90 Z"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-2xl font-bold"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            NERDHIVE
          </motion.text>
        </svg>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gray-600 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Login Form */}
      <div className="card bg-neutral bg-opacity-90 w-96 shadow-2xl z-10">
        <form onSubmit={isLogin ? handleLogin : handleSignup} className="card-body">
          <h2 className="card-title flex justify-center text-white">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          {successMessage && <p className="text-green-400 text-center">{successMessage}</p>}
          {!isLogin && (
            <>
              <div>
                <label className="form-control w-full max-w-xs py-3">
                  <div className="label">
                    <span className="label-text text-white">First Name</span>
                  </div>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName} 
                    className="input input-bordered w-full max-w-xs bg-gray-800 text-white" 
                    onChange={handleInputChange}
                    required 
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs py-3">
                  <div className="label">
                    <span className="label-text text-white">Last Name</span>
                  </div>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName} 
                    className="input input-bordered w-full max-w-xs bg-gray-800 text-white" 
                    onChange={handleInputChange}
                    required 
                  />
                </label>
              </div>
            </>
          )}
          <div>
            <label className="form-control w-full max-w-xs py-3">
              <div className="label">
                <span className="label-text text-white">Email ID</span>
              </div>
              <input 
                type="email" 
                name="emailId"
                value={formData.emailId} 
                className="input input-bordered w-full max-w-xs bg-gray-800 text-white" 
                onChange={handleInputChange}
                required 
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs py-3">
              <div className="label">
                <span className="label-text text-white">Password</span>
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password} 
                className="input input-bordered w-full max-w-xs bg-gray-800 text-white" 
                onChange={handleInputChange}
                required 
              />
            </label>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="card-actions justify-center py-4 flex-col items-center">
            <button type="submit" className="btn btn-primary w-32">
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <button 
              type="button" 
              className="btn btn-link text-white"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccessMessage("");
                setFormData({
                  emailId: "",
                  password: "",
                  firstName: "",
                  lastName: ""
                });
              }}
            >
              {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;