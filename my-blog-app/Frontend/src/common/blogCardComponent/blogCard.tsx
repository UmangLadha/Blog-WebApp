import LikesAndComment from "../likesAndComment/likesAndComment";
import { useNavigate } from "react-router";
import { BsPencilSquare } from "react-icons/bs";
import { Blog,BlogCardProps } from "../types/types";
// import axios from "axios";
// import { MdDelete } from "react-icons/md";



const BlogCard = ({ editOption, blogData }:BlogCardProps ) => {
  const navigate = useNavigate();

  // console.log("this is blogData: ", blogData);

  const handleEdit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    blog: Blog
  ) => {
    e.preventDefault();
    navigate("/write", { state: blog }); //sending blogData to write page component
    // console.log("editing the blog");
  };

  //   const handleDelete = (e)=>{
  //   e.preventDefault();
  //   try {
  // 	const response = axios.delete(`http://localhost:5000/blogs/${blogData.blogId}`);
  // 	console.log(response);
  // 	alert(response.message);
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
            {/* //sending blogData with navigate function of router */}
            <div
              className="w-full flex flex-row-reverse gap-2 justify-between items-start"
              onClick={() => navigate(`/blog/${blog.blogId}`)}
              >
              <div className="size-40">
                <img
                  src={`http://localhost:5000/${blog.blogImageLink ?? ""}`} // getting the image
                  alt="Blog related"
                  className=" w-full h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-between gap-2 items-start w-3/4">
                <div className="flex flex-col items-start">
                  <h1 className="text-2xl font-semibold">{blog.blogTitle}</h1>
                  <small>
                    Written by :{" "}
                    <span className="text-purple-400">{blog.blogAuthor}</span>
                  </small>
                </div>

                <p className="line-clamp-2">{blog.blogSubtitle}</p>
              </div>
            </div>

            <div className="flex w-full justify-between items-center px-2 ">
              <LikesAndComment blogId={blog.blogId} likeCounts={blog.blogLikesCount} commentCounts= {blog.blogCommentsCount}/>
              {editOption && (
                <div className="flex items-center gap-2">
                  <div
                    onClick={(e) => handleEdit(e, blog)}
                    className="flex items-center gap-1"
                  >
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
