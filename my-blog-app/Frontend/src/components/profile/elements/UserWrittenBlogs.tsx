import { useEffect, useState } from "react";
import BlogCard from "../../../common/blogCardComponent/blogCard";
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
        const response = await axios.get<Blog[]>(`http://localhost:5000/blogs`);
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
    <div className="w-full border rounded-xl shadow-md p-5">
      <h1 className="font-semibold text-3xl pb-10">My Blogs</h1>
      {userBlogs.length > 0 ? (
        <BlogCard blogData={userBlogs} editOption={true} />
      ) : (
        <div className="flex justify-center items-center w-full">
          No blogs has been written by you
        </div>
      )}
    </div>
  );
};

export default UserWrittenBlogs;
