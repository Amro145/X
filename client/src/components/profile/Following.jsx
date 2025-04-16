import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowing } from "../../../store (3)/api/authApi";
import { useParams } from "react-router-dom";
import FollowData from "./FollowData";

function Following() {
  const { followingList, getFollowLoading } = useSelector(
    (state) => state.auth
  );

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
        followingList?.myFollowing?.map((user) => (
          <FollowData user={user} key={user._id} />
        ))
      )}
    </div>
  );
}

export default Following;
