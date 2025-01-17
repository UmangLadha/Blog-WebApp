import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { Blogs } from "./blog.Data";

const Dashboard = () => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(10);

  const handleDislike = () => {
    setLiked(false);
    setLikesCount(likesCount- 1);
  };

  const handleLike = () => {
    setLiked(true);
    setLikesCount(likesCount + 1);
  };

  return (
    <>
      <div className="w-4/5 mx-auto text-start py-10 ">
        <h1 className="font-semibold text-3xl pb-10">Most Popular Blogs</h1>
        <div className="flex items-start w-full gap-4 p-2 flex-wrap">
          {Blogs.map((blogData, id)=>(
			<div key={id} className="w-[48%] flex flex-row-reverse gap-2 justify-between items-start p-3 border rounded-lg shadow-lg">
            <div className="size-40 border-4 rounded-lg">
              <img src={blogData.img} alt="Blog related" />
            </div>

            <div className="flex flex-col gap-4 items-start w-3/4">
              <div className="flex flex-col items-start">
				<h1 className="text-2xl font-semibold">{blogData.title}</h1>
                <small className=" leading-6">{blogData.writerName}</small>
			  </div>
              <p className=" line-clamp-2">{blogData.highlightText}</p>
              <div className="flex items-center gap-2">
                {liked ? (
                  <FaHeart className="text-xl" onClick={handleDislike} />
                ) : (
                  <FaRegHeart className="text-xl" onClick={handleLike} />
                )}
                <span>{likesCount}</span>
                <BiComment className="text-xl" />
				<span>{blogData.commentCount}</span>
              </div>
            </div>
          </div>
			))};

        </div>
      </div>
    </>
  );
};

export { Dashboard };
