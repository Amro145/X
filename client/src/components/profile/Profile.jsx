import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Post from "../Home/post/Post";
import EditProfile from "./EditProfile";
import { useAuthStore } from "../../../store/AuthStore";
import FollowUnfollow from "./FollowUnfollow";
import PostDetails from "../Home/post/PostDetails";

function Profile() {
  const {
    frindProfile,
    gettingProfile,
    userPostFn,
    authUser,
    getProfileFn,
    isGettingPost,
    deletePostFn,
    allPost,
  } = useAuthStore();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [coverPic, setcoverPic] = useState(null);
  const [profilePic, setprofilePic] = useState(null);
  const [type, setType] = useState("Posts");
  const coverPicRef = useRef(null);
  const profilePicRef = useRef(null);
  const params = useParams();
  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverPic" && setcoverPic(reader.result);
        state === "profilePic" && setprofilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getProfileFn(params.username);
  }, [params.username]);

  useEffect(() => {
    if (!gettingProfile) {
      if (params.username === authUser.userName) {
        setIsMyProfile(true);
      } else {
        setIsMyProfile(false);
      }
    }
  }, [gettingProfile, authUser]);
  useEffect(() => {
    if (!gettingProfile && frindProfile !== null) {
      userPostFn(frindProfile.user?._id);
    }
  }, [frindProfile, deletePostFn]);
  return (
    <>
      {gettingProfile && (
        <div className="flex flex-col gap-2 w-full my-2 p-4">
          <div className="flex gap-2 items-center">
            <div className="flex flex-1 gap-1">
              <div className="flex flex-col gap-1 w-full">
                <div className="skeleton h-4 w-12 rounded-full"></div>
                <div className="skeleton h-4 w-16 rounded-full"></div>
                <div className="skeleton h-40 w-full relative">
                  <div className="skeleton h-20 w-20 rounded-full border absolute -bottom-10 left-3"></div>
                </div>
                <div className="skeleton h-6 mt-4 w-24 ml-auto rounded-full"></div>
                <div className="skeleton h-4 w-14 rounded-full mt-4"></div>
                <div className="skeleton h-4 w-20 rounded-full"></div>
                <div className="skeleton h-4 w-2/3 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!gettingProfile && frindProfile !== null ? (
        <>
          <div className="header  flex justify-start gap-6 px-5 items-center">
            <Link to="/">
              <FaArrowLeft />
            </Link>
            <div className="info grid">
              <span className="font-bold text-2xl">
                {frindProfile.user?.userName}
              </span>
            </div>
          </div>

          {/* COVER IMG */}
          <div className="relative group/cover">
            <img
              src={coverPic || frindProfile.user?.coverPic || "/cover.png"}
              className="h-52 w-full object-cover"
              alt="cover image"
            />

            <input
              type="file"
              hidden
              ref={coverPicRef}
              onChange={(e) => handleImgChange(e, "coverPic")}
            />
            <input
              type="file"
              hidden
              ref={profilePicRef}
              onChange={(e) => handleImgChange(e, "profilePic")}
            />
            {/* USER AVATAR */}
            <div className="avatar absolute -bottom-16 left-4">
              <div className="w-32 rounded-full relative group/avatar">
                <img
                  src={
                    profilePic ||
                    frindProfile.user?.profilePic ||
                    "/avatar-placeholder.png"
                  }
                />
                <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
                  {isMyProfile && (
                    <MdEdit
                      className="w-4 h-4 text-white"
                      onClick={() => profilePicRef.current.click()}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className=" user info">
            <div className=" info  mt-18 flex flex-col justify-center px-10">
              <span className="font-bold">{frindProfile.user?.userName}</span>
              <span className="text-sm text-gray-700">
                @{frindProfile.user?.email}
              </span>
              <p className="text-sm">
                {frindProfile.user?.bio ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>
              <div className="links flex items-center gap-2 mt-3">
                <div className="link md:flex grid justify-center items-center">
                  <FaLink className="w-3 h-3 text-slate-500 mr-5" />
                  <a
                    className="text-blue-600 text-sm"
                    href={`http://localhost:5173/profile/${frindProfile.user?.userName}`}
                  >
                    {`  http://localhost:5173/profile/${frindProfile.user?.userName}`}
                  </a>
                </div>
                <div className="date flex">
                  <IoCalendarOutline />
                  <span className="text-gray-700">{`joined At ${frindProfile.user?.createdAt}`}</span>
                </div>
              </div>
              <div className="follow mt-3">
                <span className="text-gray-700 text-sm mr-5">
                  <span className="text-white">
                    {frindProfile.user?.followers.length}
                  </span>
                  Followers
                </span>
                <span className="text-gray-700 text-sm">
                  <span className="text-white">
                    {frindProfile.user?.following.length}
                  </span>
                  following
                </span>
              </div>
            </div>
            {isMyProfile ? <EditProfile /> : <FollowUnfollow />}
          </div>
          <div className="posts mt-10">
            <div className="head">
              <div className=" relative border-b-1 border-gray-700 flex justify-around   text-center min-h-10 max-h-10  ">
                <button
                  onClick={() => setType("forYou")}
                  className="cursor-pointer   hover:bg-secondary bg-transparent transition delay-100 duration-200 ease-in w-full flex justify-center"
                >
                  <div className="pt-1 ">Posts</div>
                  {type === "forYou" && (
                    <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
                  )}
                </button>
                <button
                  onClick={() => setType("following")}
                  className="relative cursor-pointer hover:bg-secondary bg-transparent transition delay-100 duration-200 ease-in w-full flex justify-center"
                >
                  <div className="pt-1">Likes</div>
                  {type === "following" && (
                    <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
                  )}
                </button>
              </div>
            </div>
            <div className="post">
              {isGettingPost && (
                <div className="flex flex-col justify-center">
                  <div className="flex flex-col gap-4 w-full p-4">
                    <div className="flex gap-4 items-center">
                      <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                      <div className="flex flex-col gap-2">
                        <div className="skeleton h-2 w-12 rounded-full"></div>
                        <div className="skeleton h-2 w-24 rounded-full"></div>
                      </div>
                    </div>
                    <div className="skeleton h-40 w-full"></div>
                  </div>
                  <div className="flex flex-col gap-4 w-full p-4">
                    <div className="flex gap-4 items-center">
                      <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                      <div className="flex flex-col gap-2">
                        <div className="skeleton h-2 w-12 rounded-full"></div>
                        <div className="skeleton h-2 w-24 rounded-full"></div>
                      </div>
                    </div>
                    <div className="skeleton h-40 w-full"></div>
                  </div>
                  <div className="flex flex-col gap-4 w-full p-4">
                    <div className="flex gap-4 items-center">
                      <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                      <div className="flex flex-col gap-2">
                        <div className="skeleton h-2 w-12 rounded-full"></div>
                        <div className="skeleton h-2 w-24 rounded-full"></div>
                      </div>
                    </div>
                    <div className="skeleton h-40 w-full"></div>
                  </div>
                </div>
              )}
              {!isGettingPost && allPost?.length === 0 && (
                <p className="text-center my-4">
                  No posts in this tab. Switch 👻
                </p>
              )}
              {!isGettingPost &&
                allPost &&
                allPost.length !== 0 &&
                allPost !== undefined &&
                allPost.map((post) => {
                  return <PostDetails key={post._id} onePost={post} />;
                })}
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Profile;
