import React, { useState } from "react";
import Navbar2 from "./Navbar2";
import { useAuthStore } from "../../../store/AuthStore";

function Navbar() {
  const [type, setType] = useState("for You");
  const { followingPostFn, allPostFn } = useAuthStore();
  return (
    <>
      <Navbar2 />
      <div
        className="relative border-b-1 border-gray-700  flex justify-around   
      text-center min-h-10  "
      >
        <button
          onClick={() => {
            setType("forYou");
            allPostFn();
          }}
          className="cursor-pointer   hover:bg-secondary bg-transparent transition delay-100 duration-200 ease-in w-full flex justify-center"
        >
          <div className="pt-1 ">for You</div>
          {type === "forYou" && (
            <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
          )}
        </button>
        <button
          onClick={() => {
            setType("following");
            followingPostFn();
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
