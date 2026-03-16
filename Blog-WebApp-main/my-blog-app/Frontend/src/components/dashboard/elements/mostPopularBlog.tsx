import { Suspense, useEffect, useState } from "react";
import BlogCard from "../../../common/blogCard";
import axios from "axios";
import { Blog } from "../../../common/types/types";
import { FaArrowTrendUp } from "react-icons/fa6";

// const BlogCard = lazy(()=> import("../../../common/blogCardComponent/blogCard"));

const MostPopularBlog = () => {
  const [blogData, setBlogData] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const Blogs = await axios.get("http://localhost:5000/blogs");
        console.log("here is the blog data", Blogs.data);
        const mostLikedBlogs = Blogs.data.filter(
          (blog: Blog) => blog.blogLikesCount > 10
        ); // filtering out the most liked blogs from server respones
        mostLikedBlogs.sort(
          (b: Blog, a: Blog) => a.blogLikesCount - b.blogLikesCount
        ); // after filtering we are sorting the blogs on the base of its like counts
        // console.log("here is the moreLikedBlogData:",mostLikedBlogs);
        setBlogData(mostLikedBlogs);
      } catch (error) {
        console.log("Error in fetching the data:", error);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="w-11/12 mx-auto text-start py-10 ">
        <div className="flex items-center gap-3 pb-10 ">
          <span className="text-2xl text-purple-500 ">
            <FaArrowTrendUp />
          </span>
          <h1 className="font-bold tracking-wide text-3xl">
            Most Popular Blogs
          </h1>
        </div>
        <Suspense fallback={<p>loading..</p>}>
          <BlogCard blogData={blogData} editOption={false} />
        </Suspense>
      </div>
    </>
  );
};

export function Loading() {
  return <div>Loading...</div>;
}

export { MostPopularBlog };
