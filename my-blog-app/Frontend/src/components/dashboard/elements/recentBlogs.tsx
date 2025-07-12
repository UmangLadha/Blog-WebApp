import BlogCard from "../../../common/blogCard";

const RecentBlogs = () => {
  return (
	<>
      <div className="w-4/5 mx-auto text-start py-8 ">
        <h1 className="font-semibold text-3xl pb-10">Recent Blogs</h1>
        <BlogCard/>
      </div>
    </>
  )
}

export default RecentBlogs;