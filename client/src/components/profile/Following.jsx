import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowing } from "../../../store (3)/api/authApi";
import {  useParams } from "react-router-dom";
import FollowData from "./FollowData";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Following() {
  const { followingList, getFollowLoading } = useSelector(
    (state) => state.auth
  );
console.log(followingList.myFollowing)
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowing(params.id));
  }, [dispatch, params.id]); // Added dispatch to dependency array

  return (
    <div>
      {getFollowLoading ? (
        <p>Loading...</p> // Consider a better loading indicator
      ) : followingList === undefined || followingList?.length === 0 ? (
        <p className="text-center text-gray-500">No Following</p>
      ) : (
        <div>
          <Link to="/" className="flex items-center gap-2 py-2">
            <FaArrowLeft className="w-5 h-5 text-gray-700" />
            <div className="info grid">
              <span className="font-bold text-2xl">Home</span>
            </div>
          </Link>
          {followingList.length !==  0 ? (
            followingList?.myFollowing.map((user) => (
              <FollowData user={user} key={user._id} />
            ))
          ) : (
            <p className="text-center text-gray-500 h-54 flex justify-center items-center text-3xl">
              No Followingingerer
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Following;
