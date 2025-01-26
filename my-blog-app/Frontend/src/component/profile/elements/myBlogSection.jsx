import React from "react";
import BlogCard from "../../../common/blogCardComponent/blogCard";

const MyBlogSection = () => {
  return (
    <div className="w-full border rounded-xl shadow-md p-4">
      <h1 className="font-semibold text-3xl pb-10">My Blogs</h1>
	  <BlogCard 
	  editOption={true}/>
    </div>
  );
};

export default MyBlogSection;
