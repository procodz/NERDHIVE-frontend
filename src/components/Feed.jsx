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