import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import PostDetails from "../Home/post/PostDetails";
import EditProfile from "./EditProfile";
import FollowUnfollow from "./FollowUnfollow";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../store (3)/api/postApi";
import { ProfileFn } from "../../../store (3)/api/userApi";
import { timeSince } from "../../../lib/date";

function Profile() {
  const { myProfile, profileLoading } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.auth);
  const { postLoading, allPostList } = useSelector((state) => state.post);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [coverPic, setcoverPic] = useState(null);
  const [profilePic, setprofilePic] = useState(null);
  const [type, setType] = useState("Posts");
  const coverPicRef = useRef(null);
  const profilePicRef = useRef(null);
  const params = useParams();
  const dispatch = useDispatch();

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
    dispatch(ProfileFn(params.username));
  }, [dispatch]);
  useEffect(() => {
    if (!profileLoading && myProfile._id !== undefined) dispatch(getAllPosts());
  }, [dispatch, myProfile, profileLoading]);

  const filtered = allPostList.filter(
    (item) => item.user.userName === params.username
  );
  useEffect(() => {
    if (!profileLoading) {
      setIsMyProfile(params.username === userData.userName);
    }
  }, [profileLoading, userData, params.username]);

  return (
    <>
      {profileLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
      {!profileLoading && myProfile ? (
        <>
          <div className="header flex justify-start gap-6 px-5 py-5 items-center">
            <Link to="/">
              <FaArrowLeft />
            </Link>
            <div className="info grid">
              <span className="font-bold text-2xl">{myProfile?.userName}</span>
            </div>
          </div>

          {/* COVER IMG */}
          <div className="relative group/cover">
            <img
              src={coverPic || myProfile?.coverPic || "/cover.png"}
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
                    myProfile?.profilePic ||
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

          <div className="user info">
            <div className="info mt-18 flex flex-col justify-center px-10">
              <span className="font-bold">{myProfile?.userName}</span>
              <span className="text-sm text-gray-700">@{myProfile?.email}</span>
              <p className="text-sm">
                {myProfile?.bio ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>
              <div className="links flex items-center gap-2 mt-3">
                <div className="link md:flex grid justify-center items-center">
                  <FaLink className="w-3 h-3 text-slate-500 mr-5" />
                  <a
                    className="text-blue-600 text-sm"
                    href={`http://localhost:5173/profile/${myProfile?.userName}`}
                  >
                    {`http://localhost:5173/profile/${myProfile?.userName}`}
                  </a>
                </div>
                <div className="date flex">
                  <IoCalendarOutline />
                  <span className="text-gray-700">{`joined At ${timeSince(
                    myProfile?.createdAt
                  )}`}</span>
                </div>
              </div>
              <div className="follow mt-3">
                <span className="text-gray-700 text-sm mr-5">
                  <span className="text-white">
                    {myProfile?.followers?.length}
                  </span>
                  Followers
                </span>
                <span className="text-gray-700 text-sm">
                  <span className="text-white">
                    {myProfile?.following?.length}
                  </span>
                  following
                </span>
              </div>
            </div>
            {isMyProfile ? <EditProfile /> : <FollowUnfollow />}
          </div>
          <div className="posts mt-10">
            <div className="head">
              <div className="relative border-b-1 border-gray-700 flex justify-around text-center min-h-10 max-h-10">
                <button
                  onClick={() => setType("forYou")}
                  className="cursor-pointer hover:bg-secondary bg-transparent transition delay-100 duration-200 ease-in w-full flex justify-center"
                >
                  <div className="pt-1">Posts</div>
                  {type === "forYou" && (
                    <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
                  )}
                </button>
                <button
                  onClick={() => setType("following")}
                  className="relative cursor-pointer hover:bg-secondary bg-transparent transition delay-100 duration-200 ease-in w-full flex justify-center"
                >
                  <div className="pt-1">Likes</div>
                  {type === "following" && (
                    <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
                  )}
                </button>
              </div>
            </div>
            <div className="post">
              {postLoading && (
                <div className="flex justify-center h-full items-center absolute top-40 left-1/2">
                  <span className="loading loading-spinner w-10" />
                </div>
              )}
              {!postLoading && filtered?.length === 0 && (
                <p className="text-center my-4">
                  No posts in this tab. Switch 👻
                </p>
              )}
              {!postLoading &&
                filtered?.length > 0 &&
                filtered.map((post) => (
                  <PostDetails key={post._id} onePost={post} />
                ))}
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
