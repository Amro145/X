import React from "react";
import Navbar from "./Navbar";
import CreatePost from "./post/CreatePost";
import Sidbar from "./sidebar/Sidebar";
import Rightbar from "./Rightpar/Rightbar";
import Post from "./post/Post";
import PostDetails from "./post/PostDetails";

function Home() {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-12 gap-0">
        <div className="col-span-3 row-span-12 fixed top-0">
          <Sidbar />
        </div>
        <div className="col-span-3 row-span-12 col-start-10 row-start-1 fixed top-0 right-3">
          <Rightbar />
        </div>
        <div className="md:col-span-6 h-auto my-0   md:col-start-4 col-start-1 col-span-12 row-start-1  overflow-hidden">
          <Navbar />
        </div>
        <div className="col-span-12  overflow-auto col-start-1  md:col-span-6 md:col-start-4">
          <CreatePost />
        </div>
        <div className="col-span-12 row-span-10 col-start-1 -mt-20  md:col-span-6 md:col-start-4">
          <Post />
        </div>
      </div>
    </>
  );
}

export default Home;
