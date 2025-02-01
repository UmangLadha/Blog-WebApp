import React, { useEffect, useState } from "react";
import TextEditor from "./elements/textEditor";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const NewBlogs = () => {
  const [blogContent, setBlogContent] = useState({
    title: "",
    subtitle: "",
    blogCoverImg: "",
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty()); //initializiing the editor state

  const [btnActive, setBtnActive] = useState(false); // publish toggel button

  const user = useSelector((state) => state.auth.user); // getting userData form redux to show in author name

  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const editingData = location.state;
  //   console.log("this is the data got from navigate:", editingData);
  
  // function doing input validation
  useEffect(() => {
	const isContentValid =
	  blogContent.title &&
	  blogContent.title.trim() !== "" &&
	  blogContent.subtitle &&
	  blogContent.subtitle.trim() !== "" &&
	  editorState.getCurrentContent().hasText();
	setBtnActive(!isContentValid);
  }, [blogContent, editorState]);

  //adding the values in inputfields to edit the blog
  useEffect(() => {
    if (editingData) { // checking if editingData is available and then updating the state value of the inputfield
      setBlogContent({
        title: editingData.title || "",
        subtitle: editingData.subtitle || "",
        blogCoverImg: editingData.imageLink || "",
      }); 
      const contentState = convertFromRaw(editingData.content); // converting the html value into raw content
      setEditorState(EditorState.createWithContent(contentState)); // updating the content state after getting the editing data
      setIsEditing(true); 
    }
  }, [editingData]);


  //handling the image file
  const handleFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setBlogContent({ ...blogContent, blogCoverImg: file });
  };

  // calling the post method to publish the blog data in backend
  const publishBlogInServer = async (blogData) => {
    try {
      const res = await axios.post("http://localhost:5000/blogs", blogData);
      console.log("Blog has been published successfully", res);
      alert("wow! the blog has been published!");
    } catch (error) {
      console.log("here is the error why blog has not published: ", error);
      alert("unable to publish the blog! please try again later");
    }
  };

  //calling the patch method for updating the blog in server
  const updateTheBlog = async (formData) => {
	try {
		const response = await axios.patch(`http://localhost:5000/blogs/${editingData.blogId}`, formData );
		console.log("blog has been updated", response);
		alert("The blogs has been updated!");
	} catch (error) {
		console.log("error in updating the blog",error);
		alert("Unable to update the blog! please try again later");
	}
  }

  //handling(publishing or updating) the blog on the click of handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent(); //getting the content of the blog from editor state
    const rawContent = JSON.stringify(convertToRaw(contentState)); // converting the blog content into html format and saving it as a raw content

    console.log("here is the editor content", rawContent);

    //storing the data in formData
    const formData = new FormData();
    formData.append("title", blogContent.title);
    formData.append("subtitle", blogContent.subtitle);
    formData.append("author", user.username);
    formData.append("blogCoverImg", blogContent.blogCoverImg);
    formData.append("content", rawContent);

	if(editingData){ //run this function only when editingData in presented
		updateTheBlog(formData);
	}
	else{
		publishBlogInServer(formData); // calling the post function sending blogs to server
	}
    setBlogContent({
      title: "",
      subtitle: "",
      blogCoverImg: "",
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between mx-auto items-start gap-2 w-4/5 md:w-3/4"
            encType="multipart/form-data"
          >
            <label htmlFor="title" className="text-lg">
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
              className="border outline-none text-2xl font-medium py-1 px-4 mb-2 rounded-lg w-full"
            />

            <label className="text-lg" htmlFor="subtitle">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              value={blogContent.subtitle}
              onChange={(e) =>
                setBlogContent({ ...blogContent, subtitle: e.target.value })
              }
              placeholder="Subtitle"
              className="border outline-none py-1 px-4 text-2xl mb-2 rounded-lg w-full"
            />

            <label className="text-lg" htmlFor="blogCoverImg">
              Insert Image
            </label>
            <input
              type="file"
              name="blogImg"
              className="mb-2"
              id="blogCoverImg"
              accept="image/*"
              onChange={handleFile}
            />

            <label className="text-lg" htmlFor="content">
              Blog Content
            </label>
            <TextEditor content={editorState} setContent={setEditorState} />

            <button
              disabled={btnActive}
              type="submit"
              className="bg-green-600 font-semibold text-lg text-white py-2 mt-4 px-4 rounded-lg w-1/3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditing ? "Update" : "Publish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { NewBlogs };
