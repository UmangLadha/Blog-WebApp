import React, { useEffect, useState } from "react";
import TextEditor from "./elements/textEditor";
import { EditorState, convertToRaw } from "draft-js";
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
//   const [isEditing, setIsEditing] = useState(false);

//   const location = useLocation();
//   const editingData = location.state;
  
//   console.log("this is the data got from navigate:", editingData);
//   useEffect(()=>{
// 	if (editingData) {
// 	setBlogContent({
// 	title: editingData.title,
//     subtitle: editingData.subtitle,
//     blogCoverImg: editingData.imageLink,
// 	});

// 	if (editingData.content) {
// 		const contentState = convertFromRaw(editingData.content);
// 		setEditorState(EditorState.createWithContent(contentState));
// 	  } else {
// 		console.error("Content is undefined or invalid");
// 	  }

// 	setIsEditing(true);
// }
//   },[editingData])


  // function doing input validation
  useEffect(() => {
    const isContentValid =
      blogContent.title.trim() !== "" &&
      blogContent.subtitle.trim() !== "" &&
      editorState.getCurrentContent().hasText();
    setBtnActive(!isContentValid);
  }, [blogContent, editorState]);

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

  //publishing the blog in the click of the publish button
  const handlePublish = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent(); //getting the content of the blog from editor state
    const rawContent = JSON.stringify(convertToRaw(contentState)); // converting the blog content into html format and saving it as a raw content

	console.log("here is the editor content", rawContent)

	//storing the data in formData
    const formData = new FormData();
    formData.append("title", blogContent.title);
    formData.append("subtitle", blogContent.subtitle);
    formData.append("author", user.username);
    formData.append("blogCoverImg", blogContent.blogCoverImg);
    formData.append("content", rawContent);

    publishBlogInServer(formData); // calling the post function sending blogs to server
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
            onSubmit={handlePublish}
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
              className="bg-green-600 font-semibold text-lg text-white py-2 mt-4 px-4 rounded-lg w-1/3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
				Publish
              {/* {isEditing? "Update" : "Publish"} */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { NewBlogs };
