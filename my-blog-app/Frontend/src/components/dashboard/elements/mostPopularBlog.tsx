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
        const Blogs = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blogs`);
        console.log("here is the blog data", Blogs.data);
        const allBlogs = Blogs.data;

        // const mostLikedBlogs = allBlogs.filter(
        //   (blog: Blog) => blog.blogLikesCount > 10
        // ); // filtering out the most liked blogs from server respones
        // mostLikedBlogs.sort(
        //   (b: Blog, a: Blog) => a.blogLikesCount - b.blogLikesCount
        // ); // after filtering we are sorting the blogs on the base of its like counts

        setBlogData(allBlogs);
      } catch (error) {
        console.log("Error in fetching the data:", error);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start py-8">
      <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-5">
        <div className="p-3 bg-purple-100 rounded-xl shadow-sm">
          <span className="text-2xl text-purple-600">
            <FaArrowTrendUp />
          </span>
        </div>
        <div>
          <h1 className="font-extrabold tracking-tight text-3xl md:text-4xl text-gray-900">
            Most Popular Blogs
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base font-medium">Discover trending stories and fresh perspectives</p>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <BlogCard blogData={blogData} editOption={false} />
      </Suspense>
    </div>
  );
};

export function Loading() {
  return <div>Loading...</div>;
}

export { MostPopularBlog };
