import React, { useEffect, useState } from "react";
import LikesAndComment from "../likesAndComment/likesAndComment";
import CommentComponent from "../commentComponent/commentComponent";
// import axios from "axios";
// import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import draftToHtml from "draftjs-to-html";

const CompleteBlogViewPage = () => {
  const [fullBlog, setFullBlog] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log("here is the current location of the blog ", location);
    setFullBlog(location.state); //getting the data from location object of router and rendering it in useState
  }, [location]);

  const blogContent = draftToHtml((fullBlog.content)); // converting the raw content in to html

  return (
    <div className="w-11/12 md:w-3/6 mx-auto pt-6 font-serif">
      <div className="mx-auto">
        <div className="w-11/12 mx-auto">
          <h1 className="text-5xl font-semibold py-6">{fullBlog.title}</h1>
          <span className="font-light text-lg">
            Written by : {fullBlog.author}
          </span>
        </div>
        <div className="my-7">
          <hr />
          <div className="py-4 px-8">
            <LikesAndComment
              blogDataId={fullBlog.blogId}
              likeCounts={fullBlog.likesCounts}
              blogCommentCounts={fullBlog.comments} /////////// have to change this code ///////////////////
            />
          </div>
          <hr />
        </div>
        <div className="border w-4/5 mx-auto h-80 mb-14">
          <img
            className="w-full h-full"
            src={`http://localhost:5000/${fullBlog.imageLink}`}
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
