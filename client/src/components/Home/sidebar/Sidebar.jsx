import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from "../../../../store (3)/api/userApi";
import { logout } from "../../../../store (3)/api/authApi";
function Sidbar() {
  const { userData, checkLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className=" px-10 hidden md:grid h-screen">
      <Link to="/">
        <div className="logo flex  pl-10 pt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-twitter-x max-h-10  mb-10 md:mb-0 "
            viewBox="0 0 16 16"
          >
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
          </svg>
        </div>
      </Link>
      {checkLoading ? (
        <div className="flex justify-center h-full  items-center ">
          <span className={`loading loading-spinner  w-10`} />
        </div>
      ) : (
        <>
          <div className="ul mt-10 ">
            <ul className="flex flex-col px-2  h-60 justify-around">
              <Link to={`/`}>
                <li className="home flex   items-center justify-around py-1 hover:bg-gray-700 cursor-pointer duration-150 rounded-2xl ">
                  <MdHomeFilled className="w-10 h-10 " />
                  <span className="font-bold">Home</span>
                </li>
              </Link>
              <Link to={`/notifiction`}>
                <li className="notfiction flex items-center justify-around py-1 hover:bg-gray-700 cursor-pointer duration-150 rounded-2xl">
                  <IoNotifications className="w-10 h-10  " />
                  <span className="font-bold ">Notifiction</span>
                </li>
              </Link>

              <Link to={`/profile/${userData?.userName || "/"}`}>
                <li className="profile flex items-center justify-around py-1 hover:bg-gray-700 cursor-pointer duration-150 rounded-2xl">
                  <FaUser className="w-10 h-10 " />
                  <span className="font-bold">Profile</span>
                </li>
              </Link>
            </ul>
          </div>

          <div className="logout sticky mt-50">
            <div className="flex pr-5">
              <Link
                to={`/profile/${userData.userName}`}
                className="info flex w-full"
                onClick={() => {
                  dispatch(Profile(userData.userName));
                }}
              >
                <div className="avatar hidden md:inline-flex">
                  <div className="w-15 h-15 rounded-full">
                    <img
                      src={userData?.profileImg || "/avatar-placeholder.png"}
                    />
                  </div>
                </div>
                <div className="text grid">
                  <span> {userData?.userName || "no username"}</span>
                  <span className="text-gray-700"> @{userData.userName}</span>
                </div>
              </Link>

              <div className="logout">
                <Link onClick={() => dispatch(logout())}>
                  <BiLogOut className="h-8 w-8 cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidbar;
