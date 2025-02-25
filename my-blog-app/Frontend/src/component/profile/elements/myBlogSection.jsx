import React,{ useEffect, useState } from "react";
import BlogCard from "../../../common/blogCardComponent/blogCard";
import { useSelector } from "react-redux";
import axios from "axios";

const MyBlogSection = () => {
	const [userBlogs , setUserBlogs] = useState([])
	const user = useSelector(state=>state.auth.user);

	// calling the function to get data from database and filtering the blog on the basis of author name and renderning it to state
	useEffect(()=>{
		async function getBlogs(){
			try {
				const blogs = await axios.get(`http://localhost:5000/blogs`);
				const blogsWrittenByUser = blogs.data.filter(blog => user.username === blog.author);
				console.log("this are the blogs which user has written ",blogsWrittenByUser);
				setUserBlogs(blogsWrittenByUser);
			} catch (error) {
				console.log(error);
			}
		}
		getBlogs();
	},[user.username])

  return (
    <div className="w-full border rounded-xl shadow-md p-2">
      <h1 className="font-semibold text-3xl pb-10">My Blogs</h1>
	  { userBlogs.length >= 0 ? (<BlogCard 
	  blogData = {userBlogs}
	  editOption={true}/>):(<div className="flex justify-center items-center w-full">No blogs has been written by You</div>)}
    </div>
  );
};

export default MyBlogSection;
