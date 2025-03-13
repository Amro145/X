import React, { useEffect } from "react";
import PostDetails from "./PostDetails";
import { useAuthStore } from "../../../../store/AuthStore";

function Post() {
  const { allPost, allPostFn, isGettingPost, isCreateingPost } = useAuthStore();
  useEffect(() => {
    allPostFn();
  }, []);

  return (
    <div>
      {isGettingPost && (
        <div className="flex justify-center h-full  items-center absolute top-40 left-1/2">
          <span className={`loading loading-spinner  w-10`} />
        </div>
      )}
      {!isGettingPost && allPost?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isCreateingPost &&
        !isGettingPost &&
        allPost &&
        allPost.length !== 0 &&
        allPost !== undefined &&
        allPost.map((post) => {
          return <PostDetails key={post._id} onePost={post} />;
        })}
    </div>
  );
}

export default Post;
