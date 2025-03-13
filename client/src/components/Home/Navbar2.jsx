import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useAuthStore } from "../../../store/AuthStore";
function Navbar2() {
  const { logout, authUser } = useAuthStore();
  return (
    <div className="block  md:hidden mb-5  border-b border-gray-700 py-5">
    
      <ul className="flex justify-around">
        <Link to="/">
          <li>
            <MdHomeFilled size={25} />
          </li>
        </Link>
        <Link to="/notifiction">
          <li>
            <IoNotifications size={25} />
          </li>
        </Link>
        <Link to={`/profile/${authUser.userName}`}>
          <li>
            <FaUser size={25} />
          </li>
        </Link>
        <Link>
          <li>
            <BiLogOut size={25} onClick={logout} />
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar2;
