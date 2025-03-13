import React, { useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaTrash, FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { Link, Links } from "react-router-dom";
import { useAuthStore } from "../../../store/AuthStore";
import Navbar2 from "../Home/Navbar2";
import { BiLeftArrow, BiSolidLeftArrowCircle } from "react-icons/bi";
function Notifiction() {
  const {
    notifictionFn,
    notifiction,
    deleteNotifictionFn,
    isGettingNotifiction,
    deleteAllNotifictionFn,
  } = useAuthStore();

  useEffect(() => {
    notifictionFn();
  }, []);

  return (
    <div className="w-full h-screen">
      {isGettingNotifiction && (
        <div className="flex justify-center h-full items-center">
          <span className={`loading loading-spinner `} />
        </div>
      )}

      <div>
        <div className="header flex justify-between px-10 py-5 items-center h-10 w-full border-b border-gray-700">
          <Link to={"/"}>
            <BiSolidLeftArrowCircle size={30} />
          </Link>
          <div className="dropdown cursor-pointer ">
            <div tabIndex={0} role="button" className="m-1">
              {notifiction.length !== 0 && (
                <IoSettingsOutline className="w-4" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={deleteAllNotifictionFn}>Delete all notifiction</a>
              </li>
            </ul>
          </div>
        </div>
        {!isGettingNotifiction && notifiction.length === 0 && (
          <p className=" flex  justify-center mt-10 font-bold">
            No Notifiction
          </p>
        )}
        {notifiction !== undefined &&
          notifiction.length !== 0 &&
          !isGettingNotifiction &&
          notifiction.map((notifiction) => {
            return (
              <div
                key={notifiction._id}
                className="notificton px-5 h-20 flex justify-between items-center border-b border-gray-700 "
              >
                <div className="left flex  ">
                  <div className="type pr-5">
                    {notifiction.type === "follow" ? (
                      <FaUser size={20} />
                    ) : (
                      <FaHeart size={20} className=" text-red-500" />
                    )}
                  </div>
                  <div className="user grid">
                    <Link to={`/profile/${notifiction.from.userName}`}>
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img
                            src={
                              notifiction.from.profileImg ||
                              "/avatar-placeholder.png"
                            }
                          />
                        </div>
                      </div>
                      <span className="px-5 text-2xl">
                        {notifiction.from.userName}
                      </span>
                    </Link>
                    <div className="text ">
                      <span className="text-gray-700">
                        @{notifiction.from.userName}
                      </span>
                      <span className=" pl-5">
                        {notifiction.type === "follow" ? (
                          <span>followed you</span>
                        ) : (
                          <span>Liked to your Post</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <FaTrash
                    className="cursor-pointer hover:text-red-700"
                    onClick={() => deleteNotifictionFn(notifiction._id)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Notifiction;
