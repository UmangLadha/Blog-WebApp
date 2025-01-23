import React from "react";
import { useNavigate } from "react-router";
import { Blogs } from "../../dashboard/blog.Data";
import LikesAndComment from "../../../common/likesAndComment/likesAndComment";
import { BsPencilSquare } from "react-icons/bs";

const MyBlogSection = () => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
	e.preventDefault();
    console.log("editing the blog");
  };
  return (
    <div className="w-full border rounded-xl shadow-md p-4">
      <h1 className="font-semibold text-3xl pb-10">My Blogs</h1>
      <div className="flex items-start w-full gap-4 flex-wrap flex-grow">
        {Blogs.map((blogData) => (
          <div
            className=" w-full md:w-[48%] flex flex-col items-start p-2 gap-3 border rounded-lg shadow cursor-pointer hover:shadow-lg"
            key={blogData.id}
          >
            <div className="flex flex-row-reverse gap-2 justify-between items-center">
              <div className="w-56 h-36">
                <img
                  src={blogData.img}
                  alt="Blog related"
                  className=" w-full h-full rounded-lg"
                />
              </div>

              <div className="flex flex-col justify-between gap-2 items-start w-3/4">
                <div className="flex flex-col items-start">
                  <h1
                    className="text-2xl font-semibold"
                    onClick={() => navigate(blogData.link)}
                  >
                    {blogData.title}
                  </h1>
                  <small>
                    Written by :{" "}
                    <span className="text-purple-500">
                      {blogData.writerName}
                    </span>
                  </small>
                </div>

                <p className=" line-clamp-2">{blogData.subtitle}</p>
              </div>
            </div>

            <div className="flex w-full justify-between items-center px-2 ">
              <LikesAndComment
                blogDataId={blogData.id}
                blogCommentCount={blogData.commentCount}
              />
              <div onClick={handleEdit} className="flex items-center gap-1">
                <BsPencilSquare />
                Edit
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogSection;
