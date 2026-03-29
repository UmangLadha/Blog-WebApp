import { useEffect, useState } from "react";
import BlogCard from "../../../common/blogCard";
import { useAppSelector } from "../../../redux/app/hooks/hooks";
import axios from "axios";
import { Blog } from "../../../common/types/types";

const UserWrittenBlogs = () => {
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const user = useAppSelector((state) => state.auth.user);
  const username: string | null =
    user && typeof user === "object" ? user.userName : null;

  // calling the function to get data from database and filtering the blog on the basis of author name and renderning it to state
  useEffect(() => {
    async function getBlogs() {
      try {
        const response = await axios.get<Blog[]>(`${import.meta.env.VITE_SERVER_URL}/blogs`);
        const allBlogs = response.data;
        const blogsWrittenByUser = allBlogs.filter(
          (blog) => username === blog.blogAuthor
        );
        console.log(
          "this are the blogs which user has written ",
          blogsWrittenByUser
        );
        setUserBlogs(blogsWrittenByUser);
      } catch (error) {
        console.log("Blog cannot be fetched", error);
      }
    }
    getBlogs();
  }, [username]);

  return (
    <div className="flex-1 w-full xl:w-3/4">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="font-extrabold text-3xl text-gray-900 tracking-tight">My Published Stories</h1>
        <span className="bg-purple-100 text-purple-700 text-sm font-bold px-3 py-1 rounded-full">
          {userBlogs.length}
        </span>
      </div>

      {userBlogs.length > 0 ? (
        <BlogCard blogData={userBlogs} editOption={true} />
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 border border-dashed border-gray-200 rounded-3xl text-center">
          <div className="w-20 h-20 mb-4 bg-purple-50 text-purple-200 rounded-full flex items-center justify-center text-4xl">
            📝
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No blogs found</h3>
          <p className="text-gray-500 mb-6 max-w-sm">You haven't published any stories yet. Start writing to share your thoughts with the world.</p>
        </div>
      )}
    </div>
  );
};

export default UserWrittenBlogs;
