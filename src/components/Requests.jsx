import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/receivedRequest"; // Adjust the import path as needed
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const PendingRequests = () => {
  const requests = useSelector((store) => store.request) || [];
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const reviewRequest = async (status, _id) => {
    try {
      // Implement your review logic here
      await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
        withCredentials: true
      });
      dispatch(removeRequest(_id));

      // After successful review, refresh the requests
      // await fetchRequests();
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(BASE_URL + '/user/request/received', {
        withCredentials: true
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setError("Failed to load requests. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      // Implement your accept logic here
      console.log("Accepting request:", requestId);
      // After successful acceptance, refresh the requests
      // await fetchRequests();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      // Implement your reject logic here
      console.log("Rejecting request:", requestId);
      // After successful rejection, refresh the requests
      await fetchRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

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
        <span className="text-gradient">Pending</span>
        <span className="text-accent"> Requests</span>
      </h1>
      {requests.length === 0 ? (
        <div className="text-center p-8 glass-effect rounded-lg max-w-md mx-auto">
          <p className="text-base-content/70">No pending requests.</p>
        </div>
      ) : (
        requests.map((request) => (
          <div 
            key={request._id}
            className="glass-effect rounded-lg mb-6 mx-auto max-w-4xl overflow-hidden border border-base-300/30 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-48 h-48">
                <img
                  src={request.fromUserId.photoUrl} // Use actual photo URL when available
                  alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  {`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                </h2>
                <p className="text-base-content/70 text-sm mb-4">Status: {request.status}</p>
                <div className="flex justify-end gap-3 mt-4">
                  <button 
                    className="bg-transparent border border-red-400 text-red-400 hover:bg-red-400/10 px-4 py-1.5 rounded-md text-sm font-normal transition-all"
                    onClick={() => reviewRequest("rejected", request._id) || handleReject(request._id)}
                  >
                    Reject
                  </button>
                  <button 
                    className="bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-1.5 rounded-md text-sm font-normal transition-all"
                    onClick={() => reviewRequest("accepted", request._id) || handleAccept(request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingRequests;