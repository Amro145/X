import React from "react";
import { useAuthStore } from "../../../store/AuthStore";

function FollowUnfollow() {
  const { followFn, gettingProfile, frindProfile, refreshData } =
    useAuthStore();

  return (
    <button
      className="btn outline bg-transparent hover:bg-white hover:opacity-90 rounded  px-5 relative left-10 mt-5 mb-10 "
      onClick={(e) => {
        e.preventDefault();
        if (
          !gettingProfile &&
          frindProfile !== undefined &&
          frindProfile !== null
        ) {
          followFn(frindProfile.user._id);
        }
      }}
    >
      {!gettingProfile &&
        frindProfile !== undefined &&
        frindProfile !== null &&
        (refreshData?.following.includes(frindProfile.user?._id)
          ? "unFollow"
          : "follow")}
    </button>
  );
}

export default FollowUnfollow;
