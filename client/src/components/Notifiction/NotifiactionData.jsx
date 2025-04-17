import React from "react";
import { deleteOneNotifications } from "../../../store (3)/api/notificationApi";
import { useDispatch } from "react-redux";
import { FaTrash, FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function NotifiactionData({ notifiction }) {
  const dispatch = useDispatch();
  const handleDeleteOneNotifiaction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't delete this notifiction!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOneNotifications(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleType = () => {
    if (notifiction.type === "follow") {
      return <FaUser className="text-3xl text-blue-500" />;
    } else if (notifiction.type === "like") {
      return <FaHeart className="text-3xl text-red-500" />;
    } else if (notifiction.type === "comment") {
      return <BsPostcardHeart />;
    } else if (notifiction.type === "post") {
      return <BsPostcardHeart />;
    }
  };
  const handleTextType = () => {
    if (notifiction.type === "follow") {
      return <span className="text-gray-700"> started following you</span>;
    } else if (notifiction.type === "like") {
      return <span className="text-gray-700"> liked your post</span>;
    } else if (notifiction.type === "comment") {
      return <span className="text-gray-700"> commented on your post</span>;
    } else if (notifiction.type === "post") {
      return <span className="text-gray-700"> posted a new post</span>;
    }
  };
  return (
    <div
      key={notifiction._id}
      className="notificton px-5 h-20 flex justify-between items-center border-b border-gray-700 "
    >
      <div className="left flex  ">
        <div className="type pr-5">{handleType()}</div>
        <div className="user grid">
          <Link to={`/profile/${notifiction.from._id}`}>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img
                  src={notifiction.from.profileImg || "/avatar-placeholder.png"}
                />
              </div>
            </div>
            <span className="px-5 text-2xl">{notifiction.from.userName}</span>
          </Link>
          <div className="text ">
            <span className="text-gray-700">@{notifiction.from.userName}</span>
            <span className=" pl-5">{handleTextType()}</span>
          </div>
        </div>
      </div>
      <div className="right">
        <FaTrash
          className="cursor-pointer hover:text-red-700"
          onClick={() => handleDeleteOneNotifiaction(notifiction._id)}
        />
      </div>
    </div>
  );
}

export default NotifiactionData;
