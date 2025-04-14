import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  followUnFollow,
  ProfileFn,
  suggestedUser,
} from "../../../../store (3)/api/userApi";
import { getUserPosts } from "../../../../store (3)/api/postApi";
import RightBarSkeleton from "../../skeleton/RightBarSkeleton";
import RightBarButton from "./RightBarButton";

function Rightbar() {
  const { suggestedUserList, suggestedLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(suggestedUser());
  }, [dispatch]);
  const handleProfileClick = (userId) => {
    dispatch(ProfileFn(userId));
    dispatch(getUserPosts(userId));
  };

  return (
    <div className="hidden md:block my-4 ">
      {suggestedLoading ? (
        <RightBarSkeleton />
      ) : suggestedUserList !== null && suggestedUserList.length !== 0 ? (
        suggestedUserList?.map((user) => {
          console.log(user)
          return (
            <div className="flex  " key={user._id}>
              <Link
                to={`/profile/${user._id}`}
                onClick={() => {
                  handleProfileClick(user._id);
                }}
              >
                <div className="user flex py-2 ">
                  <div className="avatar p-2">
                    <div className="w-10 rounded-full">
                      <img src={user.profileImg || "/avatar-placeholder.png"} />
                    </div>
                  </div>
                  <div className="text grid">
                    <span>{user.userName}</span>
                    <span className="text-gray-700 text-sm">
                      @{user.userName}
                    </span>
                  </div>
                </div>
              </Link>
              <div
                className="button"
                onClick={() => dispatch(followUnFollow(user._id))}
              >
                <button
                  className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <RightBarButton id={user._id} />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Rightbar;
