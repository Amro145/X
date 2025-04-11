import React, { useEffect } from "react";
import PostDetails from "./PostDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../../store (3)/api/postApi";

function Post() {
  const { postLoading, allPostList } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div>
      {postLoading && (
        <div className="flex justify-center h-full  items-center absolute top-40 left-1/2">
          <span className={`loading loading-spinner  w-10`} />
        </div>
      )}
      {!postLoading && allPostList?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!postLoading &&
        !postLoading &&
        allPostList &&
        allPostList.length !== 0 &&
        allPostList !== undefined &&
        allPostList.map((post) => {
          return <PostDetails key={post._id} onePost={post} />;
        })}
    </div>
  );
}

export default Post;
