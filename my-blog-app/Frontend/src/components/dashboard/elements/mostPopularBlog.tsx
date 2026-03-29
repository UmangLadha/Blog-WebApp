import { Suspense, useEffect, useState } from "react";
import BlogCard from "../../../common/blogCard";
import axios from "axios";
import { Blog } from "../../../common/types/types";
import { FaArrowTrendUp } from "react-icons/fa6";

// const BlogCard = lazy(()=> import("../../../common/blogCardComponent/blogCard"));

const MostPopularBlog = () => {
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const Blogs = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blogs`);
        console.log("here is the blog data", Blogs.data);
        const allBlogs = Blogs.data;
        setBlogData(allBlogs);
      } catch (error) {
        console.log("Error in fetching the data:", error);
      } finally {
        setIsLoading(false);
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
      
      {isLoading ? (
        <BlogCardSkeleton />
      ) : (
        <Suspense fallback={<BlogCardSkeleton />}>
          <BlogCard blogData={blogData} editOption={false} />
        </Suspense>
      )}
    </div>
  );
};

export function BlogCardSkeleton() {
  const skeletons = Array(4).fill(0);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {skeletons.map((_, index) => (
        <div key={index} className="flex flex-col sm:flex-row bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden animate-pulse">
          {/* Image Skeleton */}
          <div className="sm:w-2/5 shrink-0 h-52 sm:h-full bg-gray-200"></div>
          
          {/* Content Skeleton */}
          <div className="flex flex-col justify-between p-5 w-full">
            <div className="flex flex-col h-full flex-grow">
              <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-100 rounded-md w-full mb-2"></div>
              <div className="h-4 bg-gray-100 rounded-md w-5/6 mb-4"></div>
            </div>
            
            {/* Interaction Bar Skeleton */}
            <div className="pt-4 mt-auto border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-8 w-16 bg-gray-100 rounded-full"></div>
                <div className="h-8 w-16 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { MostPopularBlog };
