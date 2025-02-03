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
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <h1 className="text-3xl font-bold mb-8">Connections</h1>
      <div className="w-full max-w-4xl px-4">
        {connections.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-lg">No connections found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {connections.map((connection) => (
              <div
                key={
                  connection._id ||
                  connection.userId ||
                  connection.id ||
                  Math.random().toString()
                }
                className="card lg:card-side bg-base-100 shadow-xl"
              >
                <figure className="w-48 h-48">
                  <img
                    src={
                      connection.photoUrl || "https://via.placeholder.com/150"
                    }
                    alt={connection.name || "Profile photo"}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl">
                    {connection.firstName + " " + connection.lastName ||
                      "Unknown User"}
                  </h2>
                  <p className="text-base-content/70">
                    {connection.about || "No description available"}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <button
                      className="btn btn-primary"
                    >
                      View Profile
                    </button>
                    <Link to ={"/chat/" + connection._id}><button className="btn btn-primary">Chat</button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
