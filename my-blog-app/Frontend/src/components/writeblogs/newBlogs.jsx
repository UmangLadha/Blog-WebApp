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
    if (editingData) {
      // checking if editingData is available and then updating the state value of the inputfield
      setBlogContent({
        title: editingData.title || "",
        subtitle: editingData.subtitle || "",
        blogCoverImg: editingData.blogCoverImg || "",
      });
      const contentState = convertFromRaw(editingData.content); // converting the html value into raw content
      setEditorState(EditorState.createWithContent(contentState)); // updating the content state after getting the editing data
      setIsEditing(true);
    }
  }, [editingData]);

  //handling the image file
  const handleFile = (e) => {
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
      const response = await axios.patch(
        `http://localhost:5000/blogs/${editingData.blogId}`,
        formData
      );
      console.log("blog has been updated", response);
      alert("The blogs has been updated!");
    } catch (error) {
      console.log("error in updating the blog", error);
      alert("Unable to update the blog! please try again later");
    }
  };

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
    formData.append("author", user.userName);
    formData.append("blogCoverImg", blogContent.blogCoverImg);
    formData.append("content", rawContent);

    if (editingData) {
      //run this function only when editingData in presented
      updateTheBlog(formData);
    } else {
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
          WRITE YOUR STORY
        </h1>
        <div className="border shadow-lg p-5 rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between mx-auto items-start gap-2 w-4/5 md:w-3/4"
            encType="multipart/form-data"
          >
            <label htmlFor="title font-medium" className="text-lg">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={blogContent.title}
              onChange={(e) =>
                setBlogContent({ ...blogContent, title: e.target.value })
              }
              placeholder="Title"
              className="border outline-none text-2xl font-medium py-2 px-4 mb-2 rounded-lg w-full focus:ring-2 focus:ring-purple-300"
              required
            />

            <label className="text-lg font-medium" htmlFor="subtitle">
              Subtitle
            </label>
            <input
              id="subtitle"
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              value={blogContent.subtitle}
              onChange={(e) =>
                setBlogContent({ ...blogContent, subtitle: e.target.value })
              }
              className="border outline-none text-2xl font-medium py-2 px-4 mb-2 rounded-lg w-full focus:ring-2 focus:ring-purple-300"
              required
            />

            <label className="text-lg font-medium" htmlFor="blogCoverImg">
              Insert Image
            </label>
            <input
              id="blogCoverImg"
              name="blogCoverImg"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="mb-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-400 file:text-white hover:file:bg-purple-500"
            />

            <label className="text-lg font-medium" htmlFor="content">
              Blog Content
            </label>
            <TextEditor content={editorState} setContent={setEditorState} />

            <button
              type="submit"
              disabled={btnActive}
              className="bg-green-600 hover:bg-green-700 font-semibold text-lg text-white py-2 mt-4 px-6 rounded-lg w-auto disabled:opacity-50 disabled:cursor-not-allowed self-start"
            >
              {isEditing ? "Update Blog" : "Publish Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { NewBlogs };
