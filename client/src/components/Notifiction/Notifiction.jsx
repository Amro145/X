import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotifications,
  notification,
} from "../../../store (3)/api/notificationApi";
import NotifiactionData from "./NotifiactionData";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { BiSolidLeftArrowCircle } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
function Notifiction() {
  const { notificationList, notifiactionLoading } = useSelector(
    (state) => state.notification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(notification());
  }, []);
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Delete All Notifiaction!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNotifications());
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="w-full min-h-screen ">
      {notifiactionLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      <div>
        <div className="header flex justify-between px-10 py-5 items-center h-10 w-full border-b border-gray-700">
          <Link to={"/"}>
            <BiSolidLeftArrowCircle size={30} />
          </Link>
          <div className="dropdown cursor-pointer ">
            <div tabIndex={0} role="button" className="m-1">
              {notificationList.length !== 0 && (
                <IoSettingsOutline className="w-4" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={handleDelete}>Delete all notifiction</a>
              </li>
            </ul>
          </div>
        </div>
        {!notifiactionLoading && notificationList.length === 0 && (
          <p className=" flex  justify-center mt-10 font-bold">
            No Notifiction
          </p>
        )}
        {notificationList?.length > 0 &&
          !notifiactionLoading &&
          notificationList.map((notifiction) => (
            <NotifiactionData
              notifiction={notifiction}
              key={notifiction._id}
            />
          ))}
      </div>
    </div>
  );
}

export default Notifiction;
