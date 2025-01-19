import React from "react";
import { Blogs } from "../blog.Data";
import { useNavigate } from "react-router";
import LikesAndComment from "./likesAndComment";

const MostPopularBlog = () => {
  const navigate = useNavigate();
  //   const [liked, setLiked] = useState(false);
  //   const [likesCount, setLikesCount] = useState(10);

  return (
    <>
      <div className="w-4/5 mx-auto text-start py-10 ">
        <h1 className="font-semibold text-3xl pb-10">Most Popular Blogs</h1>
        <div className="flex items-start w-full gap-4 p-2 flex-wrap">
          {Blogs.map((blogData) => (
            <div
              key={blogData.id}
              className="w-[48%] flex flex-row-reverse gap-2 justify-between items-start p-3 border rounded-lg shadow cursor-pointer hover:shadow-lg"
			  
            >
              <div className="w-56 h-36">
                <img
                  src={blogData.img}
                  alt="Blog related"
                  className=" w-full h-full rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-4 items-start w-3/4">
                <div className="flex flex-col items-start">
                  <h1 className="text-2xl font-semibold" onClick={()=>navigate(blogData.link)}>{blogData.title}</h1>
                  <small className=" leading-6">
                    Written by : {blogData.writerName}
                  </small>
                </div>
                <p className=" line-clamp-2">{blogData.subtitle}</p>
                <LikesAndComment blogDataId= {blogData.id} blogCommentCount= {blogData.commentCount}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export { MostPopularBlog };
