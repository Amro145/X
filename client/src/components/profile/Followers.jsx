import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../../store (3)/api/authApi";
import { useParams } from "react-router-dom";
import FollowData from "./FollowData";

function Followers() {
  const { followersList, getFollowLoading } = useSelector((state) => state.auth);
  console.log(followersList);
  if (!getFollowLoading) {
    console.log(followersList);
  }
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowers(params.id));
  }, [dispatch, params.id]); // Added dispatch to dependency array
  return (
    <div>
      {getFollowLoading ? (
        <p>Loading...</p> // Consider a better loading indicator
      ) : followersList === undefined || followersList?.length === 0 ? (
        <p className="text-center text-gray-500 h-54 flex justify-center items-center text-3xl">
          No Followers
        </p>
      ) : (
        followersList?.map((user) => <FollowData user={user} key={user._id} />)
      )}
    </div>
  );
}

export default Followers;
