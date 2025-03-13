import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../../store/AuthStore";
function PostDetails({ onePost }) {
  const formatedDate = "1h";
  const [comment, setComment] = useState("");
  const [isBookmark, setIsBookmark] = useState(false);
  const [post, setPosts] = useState([]);
  const [isLike, setLike] = useState(false);
  const {
    authUser,
    deletePostFn,
    addCommentFn,
    isCommenting,
    likeUnLikeFn,
    allPost,
    isCreateingPost,
    isGettingPost,
  } = useAuthStore();

  useEffect(() => {
    post.length !== 0 &&
      !isGettingPost &&
      setLike(post.likes.includes(authUser._id));
  }, [post, isGettingPost]);

  useEffect(() => {
    setPosts(onePost);
  }, [allPost, isGettingPost]);

  const handleBookmark = () => {
    setIsBookmark(!isBookmark);
  };

  return (
    <>
      {isGettingPost ? (
        <div className="flex justify-center h-full items-center">
          <span className={`loading loading-spinner `} />
        </div>
      ) : (
        allPost?.length === 0 && (
          <p className="text-center my-4">No posts in this tab. Switch 👻</p>
        )
      )}
      {!isGettingPost && post.length !== 0 && post && (
        <div className="border-b border-gray-700 pt-5 pb-2 ">
          <div className="postInfo flex justify-between items-center pr-10 text-start">
            <div className="userinfo">
              <Link to={`/profile/${post.user.userName}`}>
                <div className="avatar pr-5">
                  <div className="w-12 ">
                    {post.user.profilePic ? (
                      <img src={post.user.profilePic} />
                    ) : (
                      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg
                          className="absolute w-12 h-12 text-gray-400 -left-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <span>{post.user.userName}</span>
                <span className="text-gray-700 text-sm">
                  @ {post.user.email}
                </span>
                <span className="text-gray-400">{formatedDate}</span>
              </Link>
            </div>
            {!isCreateingPost &&
              !isGettingPost &&
              post &&
              post.length !== 0 &&
              post.user !== undefined &&
              post.user._id?.toString() === authUser._id?.toString() && (
                <div
                  className="trash"
                  onClick={() => {
                    deletePostFn(post._id);
                  }}
                >
                  <FaTrash className="cursor-pointer hover:text-red-700" />
                </div>
              )}
          </div>
          <div className="postData px-10 flex flex-col justify-center items-center">
            {post.text && (
              <span className="pb-5 w-full text-start">{post.text}</span>
            )}
            {post.image && (
              <div className="overflow-hidden flex-shrink-0">
                <img
                  src={post.image}
                  className="w-full h-auto aspect-[16/9] object-contain rounded-lg border border-gray-700"
                />
              </div>
            )}
            <div className="react flex justify-between  w-full mt-5 mb-0">
              <div
                className="flex gap-1 items-center cursor-pointer group"
                onClick={() => {
                  document
                    .getElementById("comment_modal" + post._id)
                    .showModal();
                }}
              >
                <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  {post.comment.length}
                </span>
                <dialog
                  id={`comment_modal${post._id}`}
                  className="modal border-none outline-none"
                >
                  <div className="modal-box rounded border border-gray-600">
                    <h3 className="font-bold text-lg mb-4">comment</h3>
                    <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                      {post.comment.length === 0 && (
                        <p className="text-sm text-slate-500">
                          No comment yet 🤔 Be the first one 😉
                        </p>
                      )}
                      {post.comment.map((comment) => (
                        <div key={comment._id}>
                          <Link
                            to={`/profile/${comment.user.userName}`}
                            className="flex gap-2 items-start"
                          >
                            <div className="avatar">
                              <div className="w-8 rounded-full">
                                <img
                                  src={
                                    comment.user.profilePic ||
                                    "/avatar-placeholder.png"
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <span className="font-bold">
                                  {comment.user.userName}
                                </span>
                                <span className="text-gray-700 text-sm">
                                  @{comment.user.userName}
                                </span>
                              </div>
                              <div className="text-sm">{comment.text}</div>
                            </div>
                          </Link>{" "}
                        </div>
                      ))}
                    </div>
                    <form
                      className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        addCommentFn(post._id, { text: comment });
                        setComment("");
                      }}
                    >
                      <textarea
                        className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                        {isCommenting ? (
                          <span className="loading loading-spinner loading-md"></span>
                        ) : (
                          "comment"
                        )}
                      </button>
                    </form>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button className="outline-none">close</button>
                  </form>
                </dialog>
              </div>
              <div className="repost flex gap-1 items-center cursor-pointer group ">
                <BiRepost className="w-7 h-7  text-slate-500 group-hover:text-sky-400" />
              </div>
              <div
                className="like flex gap-1 items-center cursor-pointer group "
                onClick={() => {
                  likeUnLikeFn(post._id);
                }}
              >
                {isLike ? (
                  <>
                    <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
                    <span className="text-pink-500">{post.likes.length}</span>
                  </>
                ) : (
                  <>
                    <FaRegHeart className="w-4 h-4 cursor-pointer " />
                    <span>{post.likes.length}</span>
                  </>
                )}
              </div>
              <div className="bookmark cursor-pointer" onClick={handleBookmark}>
                {!isBookmark ? (
                  <FaRegBookmark />
                ) : (
                  <FaRegBookmark className="text-pink-800" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetails;
