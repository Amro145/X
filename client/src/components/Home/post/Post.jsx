import React, { useEffect } from "react";
import PostDetails from "./PostDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../../store (3)/api/postApi";

function Post() {
  const { postLoading, allPostList } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div>
      {postLoading ? (
        <div class="flex justify-center items-center h-screen">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : allPostList?.length === 0 ? (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      ) : (
        allPostList.map((post) => <PostDetails key={post._id} onePost={post} />)
      )}
    </div>
  );
}

export default Post;
