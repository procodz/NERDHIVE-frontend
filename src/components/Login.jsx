import { useState } from 'react';
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
          emailId: formData.emailId,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName
        }
      );
      setSuccessMessage("Account created successfully! Please login.");
      setIsLogin(true);
    } catch(err) {
      setError("Error creating account");
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-full w-full min-h-[calc(100vh-10rem)] my-8">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">
              <span className="text-gradient">{isLogin ? "Welcome" : "Join"}</span>
              <span className="text-accent"> {isLogin ? "Back" : "NerdHive"}</span>
            </h2>
            <p className="text-base-content/70 mt-3">
              {isLogin 
                ? "Sign in to continue to your account" 
                : "Connect with developers and build amazing projects"}
            </p>
          </div>

          {error && (
            <div className="bg-red-400/10 border border-red-400 text-red-400 px-4 py-3 rounded-md mb-6 text-sm">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-400/10 border border-green-400 text-green-400 px-4 py-3 rounded-md mb-6 text-sm">
              {successMessage}
            </div>
          )}

          <div className="glass-effect p-6 rounded-xl">
            {isLogin ? (
              // Login Form
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-base-content/80 mb-2">Email</label>
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content/80 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-2 rounded-md text-sm font-normal transition-all mt-4"
                >
                  Sign In
                </button>
              </form>
            ) : (
              // Signup Form
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-base-content/80 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content/80 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content/80 mb-2">Email</label>
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content/80 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-base-300/50 bg-base-200/50 backdrop-blur-sm text-base-content focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-2 rounded-md text-sm font-normal transition-all mt-4"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent/80 text-sm hover:text-accent transition-colors"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-base-200/30 items-center justify-center p-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center max-w-md">
          <div className="mb-8">
            {/* Code editor mockup */}
            <div className="w-full h-64 relative">
              <div className="absolute inset-0 code-editor rounded-lg shadow-2xl overflow-hidden">
                <div className="terminal-header p-2 bg-base-300 flex items-center">
                  <div className="terminal-dot terminal-dot-red"></div>
                  <div className="terminal-dot terminal-dot-yellow"></div>
                  <div className="terminal-dot terminal-dot-green"></div>
                  <div className="ml-4 text-xs text-base-content/70">{isLogin ? "login.js" : "signup.js"}</div>
                </div>
                <div className="p-4 font-mono text-sm overflow-hidden">
                  <div className="flex">
                    <span className="code-line-numbers mr-4">1</span>
                    <span><span className="text-blue-400">import</span> <span className="text-green-400">{'{'} connect {'}'}</span> <span className="text-blue-400">from</span> <span className="text-orange-400">'nerdhive'</span>;</span>
                  </div>
                  <div className="flex">
                    <span className="code-line-numbers mr-4">2</span>
                    <span></span>
                  </div>
                  <div className="flex">
                    <span className="code-line-numbers mr-4">3</span>
                    <span><span className="text-purple-400">async</span> <span className="text-yellow-400">function</span> <span className="text-green-400">{isLogin ? "login" : "signup"}</span>() {'{'}</span>
                  </div>
                  <div className="flex">
                    <span className="code-line-numbers mr-4">4</span>
                    <span>&nbsp;&nbsp;<span className="text-blue-400">const</span> user = <span className="text-blue-400">await</span> connect.<span className="text-yellow-400">{isLogin ? "login" : "createAccount"}</span>({'{'}</span>
                  </div>
                  <div className="flex">
                    <span className="code-line-numbers mr-4">5</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;email: <span className="text-orange-400">'{formData.emailId || "user@example.com"}'</span>,</span>
                  </div>
                  <div className="flex">
                    <span className="code-line-numbers mr-4">6</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;password: <span className="text-orange-400">'********'</span>,</span>
                  </div>
                  {!isLogin && (
                    <>
                      <div className="flex">
                        <span className="code-line-numbers mr-4">7</span>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;firstName: <span className="text-orange-400">'{formData.firstName || "John"}'</span>,</span>
                      </div>
                      <div className="flex">
                        <span className="code-line-numbers mr-4">8</span>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;lastName: <span className="text-orange-400">'{formData.lastName || "Doe"}'</span>,</span>
                      </div>
                    </>
                  )}
                  <div className="flex">
                    <span className="code-line-numbers mr-4">{isLogin ? "7" : "9"}</span>
                    <span>&nbsp;&nbsp;{'}'});</span>
                  </div>
                  <div className="flex">
                    <span className="code-line-numbers mr-4">{isLogin ? "8" : "10"}</span>
                    <span></span>
                  </div>
                  <div className="flex">
                    <span className="code-line-numbers mr-4">{isLogin ? "9" : "11"}</span>
                    <span>&nbsp;&nbsp;<span className="text-blue-400">return</span> user;</span>
                  </div>
                  <div className="flex">
                    <span className="code-line-numbers mr-4">{isLogin ? "10" : "12"}</span>
                    <span>{'}'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3">
            <span className="text-gradient">{isLogin ? "Developer" : "Join Our"}</span>
            <span className="text-accent"> {isLogin ? "Portal" : "Community"}</span>
          </h3>
          <p className="text-base-content/70 max-w-md">
            {isLogin 
              ? "Access your projects, connect with peers, and continue building amazing things."
              : "Connect with fellow developers, collaborate on projects, and build your professional network."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;