import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../../store/AuthStore";

function Rightbar() {
  const {
    suggested,
    suggestedUserFn,
    isGetSuggested,
    getProfileFn,
    followFn,
    refreshData,
    userPostFn,
  } = useAuthStore();
  useEffect(() => {
    suggestedUserFn();
  }, []);
  return (
    <div className="hidden md:block my-4 ">
      {isGetSuggested && (
        <>
          <>
            <div className="flex flex-col gap-2 w-52 my-2">
              <div className="flex gap-2 items-center">
                <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                <div className="flex flex-1 justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="skeleton h-2 w-12 rounded-full"></div>
                    <div className="skeleton h-2 w-16 rounded-full"></div>
                  </div>
                  <div className="skeleton h-6 w-14 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-52 my-2">
              <div className="flex gap-2 items-center">
                <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                <div className="flex flex-1 justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="skeleton h-2 w-12 rounded-full"></div>
                    <div className="skeleton h-2 w-16 rounded-full"></div>
                  </div>
                  <div className="skeleton h-6 w-14 rounded-full"></div>
                </div>
              </div>
            </div>
          </>
          <>
            <div className="flex flex-col gap-2 w-52 my-2">
              <div className="flex gap-2 items-center">
                <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                <div className="flex flex-1 justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="skeleton h-2 w-12 rounded-full"></div>
                    <div className="skeleton h-2 w-16 rounded-full"></div>
                  </div>
                  <div className="skeleton h-6 w-14 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-52 my-2">
              <div className="flex gap-2 items-center">
                <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                <div className="flex flex-1 justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="skeleton h-2 w-12 rounded-full"></div>
                    <div className="skeleton h-2 w-16 rounded-full"></div>
                  </div>
                  <div className="skeleton h-6 w-14 rounded-full"></div>
                </div>
              </div>
            </div>
          </>
        </>
      )}

      {!isGetSuggested && suggested !== null && suggested.length !== 0 ? (
        suggested?.suggestedUser.map((user) => {
          return (
            <div className="flex  " key={user._id}>
              <Link
                to={`/profile/${user.userName}`}
                onClick={() => {
                  getProfileFn(user.userName);
                  userPostFn(user._id);
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
              <div className="button" onClick={() => followFn(user._id)}>
                <button
                  className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  {refreshData?.following.includes(user._id)
                    ? "unFollow"
                    : "follow"}
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
