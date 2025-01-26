import React from "react";
import BlogCard from "../../../common/blogCardComponent/blogCard";

const MostPopularBlog = () => {
  //   const [liked, setLiked] = useState(false);
  //   const [likesCount, setLikesCount] = useState(10);

  return (
    <>
      <div className="w-4/5 mx-auto text-start py-10 ">
        <h1 className="font-semibold text-3xl pb-10">Most Popular Blogs</h1>
        <BlogCard />
      </div>
    </>
  );
};
export { MostPopularBlog };
