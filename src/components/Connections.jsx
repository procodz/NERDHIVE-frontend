import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/Connections";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Link } from 'react-router-dom'

const Connections = () => {
  const connections = useSelector((store) => store.connections) || [];
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.error("Failed to fetch connections:", error);
      setError("Failed to load connections. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-sm text-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-400/10 border border-red-400 text-red-400 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 min-h-[calc(100vh-10rem)]">
      <h1 className="text-2xl font-bold mb-8 text-center">
        <span className="text-gradient">Your</span>
        <span className="text-accent"> Connections</span>
      </h1>
      {connections.length === 0 ? (
        <div className="text-center p-8 glass-effect rounded-lg max-w-md mx-auto">
          <p className="text-base-content/70">No connections found.</p>
        </div>
      ) : (
        connections.map((connection) => (
          <div
            key={
              connection._id ||
              connection.userId ||
              connection.id ||
              Math.random().toString()
            }
            className="glass-effect rounded-lg mb-6 mx-auto max-w-4xl overflow-hidden border border-base-300/30 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-48 h-48">
                <img
                  src={
                    connection.photoUrl || "https://via.placeholder.com/150"
                  }
                  alt={connection.name || "Profile photo"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  {connection.firstName + " " + connection.lastName ||
                    "Unknown User"}
                </h2>
                <p className="text-base-content/70 text-sm mb-4">
                  {connection.about || "No description available"}
                </p>
                <div className="flex justify-end gap-3 mt-4">
                  <button className="bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-1.5 rounded-md text-sm font-normal transition-all">
                    View Profile
                  </button>
                  <Link to={"/chat/" + connection._id}>
                    <button className="bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-1.5 rounded-md text-sm font-normal transition-all">
                      Chat
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Connections;
