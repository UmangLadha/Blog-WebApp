import React,{useEffect} from "react";
import LikesAndComment from "../likesAndComment/likesAndComment";
import { useNavigate } from "react-router";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
// import { MdDelete } from "react-icons/md";
// import axios from "axios";

const BlogCard = (props) => {
  const { editOption, blogData } = props;
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    navigate("/write", {state: blogData}); //sending blogData to write page component
    console.log("editing the blog");
  };

//   const handleDelete = (e)=>{
//   e.preventDefault();
//   try {
// 	const response = axios.delete(`http://localhost:5000/blogs/${blogData.blogId}`);
// 	console.log(response);
// 	alert(response);
//   } catch (error) {
// 	console.log(error);
//   }
//   }

  return (
    <div className="flex items-start w-full gap-4 p-2 flex-wrap">
      {Array.isArray(blogData) && // checking that blogData is array or not
        blogData.length > 0 &&
        blogData.map((blog) => (
          <div
            className=" w-full md:w-[48%] flex flex-col items-start p-2 gap-3 border rounded-lg shadow cursor-pointer hover:shadow-lg"
            key={blog.blogId}
          >
            <div className="w-full flex flex-row-reverse gap-2 justify-between items-start">
              <div className="size-40">
                <img
                  src={`http://localhost:5000/${blog.imageLink}`} // getting the image
                  alt="Blog related"
                  className=" w-full h-full rounded-lg"
                />
              </div>

              <div className="flex flex-col justify-between gap-2 items-start w-3/4">
                <div className="flex flex-col items-start">
                  <h1
                    className="text-2xl font-semibold"
                    onClick={() =>
                      navigate(`/blog/${blog.blogId}`, { state: blog })
                    } //sending blogData with navigate function of router
                  >
                    {blog.title}
                  </h1>
                  <small>
                    Written by :{" "}
                    {blog.author}
                  </small>
                </div>

                <p className="line-clamp-2">{blog.subtitle}</p>
              </div>
            </div>

            <div className="flex w-full justify-between items-center px-2 ">
              <LikesAndComment
                blogData ={blog}
              />
              {editOption && (
                <div className="flex items-center gap-2">
				<div onClick={handleEdit} className="flex items-center gap-1">
                  <BsPencilSquare />
                  Edit
                </div>
                {/* <div onClick={handleDelete} className="flex items-center gap-1">
                  <MdDelete className="text-lg" />
                  Delete
                </div> */}
				</div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BlogCard;
