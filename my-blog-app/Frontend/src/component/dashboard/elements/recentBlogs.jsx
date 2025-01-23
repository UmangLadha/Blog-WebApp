import React from 'react'
import { Blogs } from "../blog.Data";
import { useNavigate } from "react-router";
import LikesAndComment from "../../../common/likesAndComment/likesAndComment";

const RecentBlogs = () => {
	const navigate = useNavigate();
  return (
	<>
      <div className="w-4/5 mx-auto text-start py-8 ">
        <h1 className="font-semibold text-3xl pb-10">Recent Blogs</h1>
        <div className="flex items-start w-full gap-4 p-2 flex-wrap">
			
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

                <p className="line-clamp-2">{blogData.subtitle}</p>
              </div>
            </div>

            <div className="flex w-full justify-between items-center px-2 ">
              <LikesAndComment
                blogDataId={blogData.id}
                blogCommentCount={blogData.commentCount}
				navigateTo={true}
              />
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  )
}

export default RecentBlogs;