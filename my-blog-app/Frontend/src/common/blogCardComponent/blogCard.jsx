import React from "react";
import LikesAndComment from "../likesAndComment/likesAndComment";
import { useNavigate } from "react-router";
import { BsPencilSquare } from "react-icons/bs";

const BlogCard = (props) => {
  const { editOption, blogData } = props;
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    navigate("/write");
    console.log("editing the blog");
  };

  return (
    <div className="flex items-start w-full gap-4 p-2 flex-wrap">
      {Array.isArray(blogData) && // checking that blogData is array or not
        blogData.length > 0 &&
        blogData.map((blog) => (
          <div
            className=" w-full md:w-[48%] flex flex-col items-start p-2 gap-3 border rounded-lg shadow cursor-pointer hover:shadow-lg"
            key={blog.blogId}
          >
            <div className="flex flex-row-reverse gap-2 justify-between items-start">
              <div className="w-56 h-36">
                <img
                  src={blog.imageLink}
                  alt="Blog related"
                  className=" w-full h-full rounded-lg"
                />
              </div>

              <div className="flex flex-col justify-between gap-2 items-start w-3/4">
                <div className="flex flex-col items-start">
                  <h1
                    className="text-2xl font-semibold"
                    onClick={() => navigate(`/blog/${blog.blogId}`, {state:blog})}
                  >
                    {blog.title}
                  </h1>
                  <small>
                    Written by :{" "}
                    <span className="text-purple-500">{blog.author}</span>
                  </small>
                </div>

                <p className="line-clamp-2">{blog.subtitle}</p>
              </div>
            </div>

            <div className="flex w-full justify-between items-center px-2 ">
              <LikesAndComment
                blogDataId={blog.blogId}
				likeCounts= {blog.likesCounts}
                blogCommentCount={blog.commentCount}
                navigateTo={true}
              />
              {editOption && (
                <div onClick={handleEdit} className="flex items-center gap-1">
                  <BsPencilSquare />
                  Edit
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BlogCard;
