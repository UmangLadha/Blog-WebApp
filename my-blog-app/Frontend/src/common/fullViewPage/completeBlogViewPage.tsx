import { useEffect, useState } from "react";
import LikesAndComment from "../likesAndComment/likesAndComment";
import CommentComponent from "../commentComponent/commentComponent";
import axios from "axios";
import { useParams } from "react-router";
import draftToHtml from "draftjs-to-html";
import { Blog } from "../types/types";

const CompleteBlogViewPage = () => {
  const [fullBlog, setFullBlog] = useState<Blog|null>(null);
  const {id} = useParams<{ id: string }>();
  const blogId = Number(id);

  useEffect(() => {
    async function fetchingBlogById() {
      try{
        const response  = await axios.get<Blog>(`https://localhost:5000/blogs/${blogId}`);
        setFullBlog(response.data); //fetching the blogdata and rendering it in useState
        // console.log("here is the blogData ", response.data);
      }catch(error){
        console.log("Error in fetching blog: ",error)
      }
    }
      fetchingBlogById()
  }, [blogId]);

  if (!fullBlog) return <p className="text-center py-20">Loading blog...</p>;

  const blogContent = draftToHtml(JSON.parse(fullBlog.blogContent)); // converting the raw content in to html

  return (
    <div className="w-11/12 md:w-3/6 mx-auto pt-6 font-serif">
      <div className="mx-auto">
        <div className="w-11/12 mx-auto">
          <h1 className="text-5xl font-semibold py-6">{fullBlog.blogTitle}</h1>
          <p className="text-2xl font-medium text-slate-300">{fullBlog.blogSubtitle}</p>
          <span className="font-light text-lg">
            Written by : {fullBlog.blogAuthor}
          </span>
        </div>
        <div className="my-7">
          <hr />
          <div className="py-4 px-8">
          <LikesAndComment blogId={fullBlog.blogId} likeCounts={fullBlog.blogLikesCount} commentCounts= {fullBlog.blogCommentsCount}/>
          </div>
          <hr />
        </div>
        <div className="border w-4/5 mx-auto h-80 mb-14">
          <img
            className="w-full h-full"
            src={`http://localhost:5000/${fullBlog.blogImageLink}`}
            alt="CoverImg"
          />{" "}
        </div>
        <div
          className="px-4 mb-7 text-lg"
          dangerouslySetInnerHTML={{ __html: blogContent }}
        />
        {/* getting the content displaying the html format into text format  USING THE REACT INNER HTML FUNCTION to display data in text*/}
        <hr />
        <CommentComponent blogId={fullBlog.blogId} />
      </div>
    </div>
  );
};

export default CompleteBlogViewPage;
