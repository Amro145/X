import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUnFollow } from "../../../store (3)/api/userApi";
import RightBarButton from "../Home/Rightpar/RightBarButton";

import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function FollowData({ user }) {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="flex flex-col justify-start items-start px-5  min-w-screen"
        key={user._id}
      >
        <div
          key={user._id}
          className="flex items-center justify-between gap-2 w-full border-b border-gray-700 p-2"
        >
          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center gap-2"
          >
            {" "}
            <img
              src={user.profilePic || "/avatar-placeholder.png"}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{user.userName}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </Link>
          {user._id === userData._id ? (
            <div className="text-gray-500 cursor-not-allowed"> Follow </div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}

export default FollowData;
