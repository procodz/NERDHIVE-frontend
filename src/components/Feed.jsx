import React, { useEffect } from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedslice';
import UserCard from './UserCard';




function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      // console.log("Feed data:", res.data);
      dispatch(addFeed(res.data));
      // console.log("Feed data:", feed);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() =>{
    getFeed();
  }, []);
  return (
    feed && Array.isArray(feed) && feed.length > 0 ?(
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
  ) : (
    <div className="flex justify-center my-10">
      <h1 className="text-3xl">No posts to show</h1>
    </div>
  )
  );
};

export default Feed;



// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { BASE_URL } from '../utils/constants';
// import { useDispatch, useSelector } from 'react-redux';
// import { addFeed } from '../utils/feedslice';
// import UserCard from './UserCard';

// function Feed() {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();
//   const [randomUser, setRandomUser] = useState(null);

//   const getFeed = async () => {
//     try {
//       // Always fetch fresh feed data on each component mount/refresh
//       const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
//       dispatch(addFeed(res.data));
      
//       if(res.data && Array.isArray(res.data) && res.data.length > 0) {
//         // Get a random user from the array
//         const randomIndex = Math.floor(Math.random() * res.data.length);
//         setRandomUser(res.data[randomIndex]);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
  
//   useEffect(() => {
//     getFeed();
//   }, []); // Empty dependency array means this runs once on mount

//   return (
//     randomUser ? (
//       <div className="flex justify-center my-10">
//         <UserCard user={randomUser} />
//       </div>
//     ) : (
//       <div className="flex justify-center my-10">
//         <h1 className="text-3xl">No posts to show</h1>
//       </div>
//     )
//   );
// };

// export default Feed;