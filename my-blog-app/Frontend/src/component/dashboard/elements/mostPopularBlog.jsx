import React, { useEffect, useState } from "react";
import BlogCard from "../../../common/blogCardComponent/blogCard";
import axios from "axios";

const MostPopularBlog = () => {
  //   const [liked, setLiked] = useState(false);
  //   const [likesCount, setLikesCount] = useState(10);

  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const Blogs = await axios.get("http://localhost:5000/blogs");
        console.log("here is the blog data", Blogs.data);
        const mostLikedBlogs = Blogs.data.filter(
          (blog) => blog.likesCounts > 10
        ); // filtering out the most liked blogs from server respones
        mostLikedBlogs.sort((b, a) => a.likesCounts - b.likesCounts); // after filtering we are sorting the blogs on the base of its like counts
        setBlogData(mostLikedBlogs);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="w-4/5 mx-auto text-start py-10 ">
        <h1 className="font-semibold text-3xl pb-10">Most Popular Blogs</h1>
        <BlogCard blogData={blogData} />
      </div>
    </>
  );
};
export { MostPopularBlog };
