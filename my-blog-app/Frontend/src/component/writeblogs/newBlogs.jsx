import React, { useEffect, useState } from "react";
import TextEditor from "./elements/textEditor";
import { EditorState, convertFromHTML, convertToRaw } from "draft-js";
import axios from "axios";
import { useSelector } from "react-redux";

const NewBlogs = () => {
  const [blogContent, setBlogContent] = useState({
    title: "",
    subtitle: "",
    blogImg: [],
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty()); //initializiing the editor state

  const [btnActive, setBtnActive] = useState(false);

  const user = useSelector(state=>state.auth.user); // getting user form redux

  useEffect(() => {
    const isContentValid =
      blogContent.title.trim() !== "" &&
      blogContent.subtitle.trim() !== "" &&
      editorState.getCurrentContent().hasText();
    setBtnActive(!isContentValid);
  }, [blogContent, editorState]);

  const handleFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0].name;
    setBlogContent({ ...blogContent, blogImg: file });
  };

  const publishBlogInServer = async(rawContent)=>{
	try {
		const fullBlogData = {
		  title: blogContent.title,
		  subtitle: blogContent.subtitle,
		  imageLink: blogContent.blogImg,
		  content: rawContent,
		  author: user.username,
		};
		const res = await axios.post("http://localhost:5000/blogs", fullBlogData);
		console.log("Blog has been published successfully", res);
		alert("wow! the blog has been published!");
	  } catch (error) {
		console.log(error);
		alert("unable to publish the blog! please try again later")
	  }
  }

  const handlePublish = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent(); //getting the content of the blog
    const rawContent = convertToRaw(contentState); // converting the blog content into JSON
	// JSON.stringify(rawContent, null, 4)
    publishBlogInServer(rawContent); // sending blogs to server
	setBlogContent({
		title: "",
		subtitle: "",
		blogImg: [],
	}); 
	setEditorState(EditorState.createEmpty());
};

  return (
    <div className="w-full mx-auto py-10 md:w-4/5 font-serif ">
      <div className="w-3/4 mx-auto ">
        <h1 className="text-4xl font-bold py-7 tracking-tight ">
          CREATE YOUR STORY
        </h1>
        <div className="border shadow-lg p-5 rounded-lg">
          <form className="flex flex-col justify-between mx-auto items-start gap-2 w-4/5 md:w-3/4">
            <label htmlFor="title" className=" text-lg">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={blogContent.title}
              onChange={(e) =>
                setBlogContent({ ...blogContent, title: e.target.value })
              }
              placeholder="Title"
              maxLength={50}
              className="border outline-none text-2xl font-medium py-1 px-4 mb-2 rounded-lg w-full"
            />

            <label className="text-lg" htmlFor="highlightText">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              value={blogContent.highlightedText}
              onChange={(e) =>
                setBlogContent({ ...blogContent, subtitle: e.target.value })
              }
              placeholder="Subtitle"
              maxLength={80}
              className="border outline-none py-1 px-4 text-2xl mb-2 rounded-lg w-full"
            />

            <label className="text-lg" htmlFor="ContentImg">
              Insert Image
            </label>
            <input
              type="file"
              name="blogImg"
              className="mb-2"
              id="blogImg"
              accept="image/*"
              onChange={handleFile}
            />

            <label className="text-lg" htmlFor="content">
              Blog Content
            </label>
            <TextEditor content={editorState} setContent={setEditorState} />

            <button
              onClick={handlePublish}
              disabled={btnActive}
              className="bg-green-600 font-semibold text-lg text-white py-2 mt-4 px-4 rounded-lg w-1/3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { NewBlogs };
