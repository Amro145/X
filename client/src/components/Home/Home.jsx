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
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-3 fixed top-0 h-screen">
          <Sidbar />
        </div>
        <div className="col-span-3 fixed top-0 right-0 h-screen">
          <Rightbar />
        </div>
        <div className="md:col-span-6 col-span-12 md:col-start-4 col-start-1">
          <Navbar />
          <div className="mt-4">
            <CreatePost />
          </div>
          <div className="mt-4">
            <Post />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
