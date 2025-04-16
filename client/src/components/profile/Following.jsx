import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowing } from "../../../store (3)/api/authApi";
import { useParams } from "react-router-dom";
import RightBarButton from "../Home/Rightpar/RightBarButton";
// import { followUnFollow } from "../../../store (3)/api/userApi";

function Following() {
  const { followingList, getFollowLoading } = useSelector(
    (state) => state.auth
  );
  console.log(followingList);
  if (!getFollowLoading) {
    console.log(followingList);
  }
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
          <div
            key={user._id}
            className="flex items-center justify-between gap-2 border-b border-gray-700 p-2"
          >
            <div className="flex items-center gap-2">
              <img
                src={user.profilePic || "/avatar-placeholder.png"}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{user.userName}</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Following;
