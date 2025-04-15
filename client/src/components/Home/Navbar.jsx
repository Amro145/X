import React, { useState } from "react";
import Navbar2 from "./Navbar2";
import { useDispatch } from "react-redux";
import { getAllPosts, getFollowingPosts } from "../../../store (3)/api/postApi";

function Navbar() {
  const [type, setType] = useState("forYou");

  const dispatch = useDispatch();
  return (
    <>
      <Navbar2 />
      <div
        className="relative  border-b border-gray-700  flex justify-around   
      text-center min-h-10  "
      >
        <button
          onClick={() => {
            setType("forYou");
            dispatch(getAllPosts());
          }}
          className="cursor-pointer  hover:bg-secondary bg-transparent transition delay-100 duration-200 ease-in w-full flex justify-center"
        >
          <div className="pt-1 ">for You</div>
          {type === "forYou" && (
            <div className="absolute bottom-0 w-10  h-1 text-white rounded-full bg-primary"></div>
          )}
        </button>
        <button
          onClick={() => {
            setType("following");
            dispatch(getFollowingPosts());
          }}
          className="relative cursor-pointer hover:bg-secondary bg-transparent transition delay-100 duration-200 ease-in w-full flex justify-center"
        >
          <div className="pt-1">follwoing</div>
          {type === "following" && (
            <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
          )}
        </button>
      </div>
    </>
  );
}

export default Navbar;
