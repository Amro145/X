import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUnFollow } from "../../../store (3)/api/userApi";

function FollowUnfollow({ user }) {
  console.log(user);
  const { followStatus, followLoading, profileLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [isFollow, setIsFollow] = useState(followStatus || false);

  useEffect(() => {
    if (user !== undefined && user !== null && !followLoading) {
      setIsFollow(followStatus);
      console.log(isFollow);
    }
  }, [followStatus, user]);
  const handleFollowUnfollow = async (userId) => {
    if (!profileLoading && user !== undefined && user !== null) {
      dispatch(followUnFollow(userId));
    }
  };
  return (
    <button
      className="btn outline bg-transparent hover:bg-white hover:opacity-90 rounded  px-5 relative left-10 mt-5 mb-10 "
      onClick={(e) => {
        e.preventDefault();
        handleFollowUnfollow(user._id);
      }}
    >
      {followLoading
        ? "loading"
        : user !== undefined &&
          user !== null &&
          (isFollow ? "unFollow" : "Follow")}
    </button>
  );
}

export default FollowUnfollow;
