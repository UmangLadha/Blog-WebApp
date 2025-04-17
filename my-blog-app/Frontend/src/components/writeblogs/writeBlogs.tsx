import { useEffect, useState } from "react";
import TextEditor from "./elements/textEditor";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import axios from "axios";
import { useAppSelector } from "../../redux/app/hooks/hooks";
import { useLocation } from "react-router-dom";
import { NewBlogData } from "../../common/types/types";
import toast from "react-hot-toast";

const NewBlogs = () => {
  const [blogContent, setBlogContent] = useState<NewBlogData>({
    title: "",
    subtitle: "",
    blogImageLink: "",
  });
  const [btnActive, setBtnActive] = useState<boolean>(false); // publish toggel button

  const [editorState, setEditorState] = useState(EditorState.createEmpty()); //initializiing the editor state

  const user = useAppSelector((state) => state.auth.user); // getting userData form redux to show in author name
  const username: string =
    user && typeof user === "object" ? user.userName : "";

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
        blogImageLink: editingData.imageLink || "",
      });
      const contentState = convertFromRaw(editingData.content); // converting the html value into raw content
      setEditorState(EditorState.createWithContent(contentState)); // updating the content state after getting the editing data
      setIsEditing(true);
    }
  }, [editingData]);

  const readFile = async (file: File) => {
    const fileReader = new FileReader();
    await fileReader.readAsDataURL(file); //this is the file reader which reads the file or convert the file into base64
    fileReader.onloadend = () => {
      //onloadend is the function which will execute once the file is readed by readfileAsURL
      const base64 = fileReader.result as string; // getting the file from .result as a string type and giving it to variable
      // console.log("converted Base64 File:",base64);
      setBlogContent({ ...blogContent, blogImageLink: base64 });
    };
  };

  //handling the image file
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files?.[0];
    if (!file) {
      toast.error("file not selected");
      return;
    }
    readFile(file);
  };

  // calling the post method to publish the blog data in backend
  const publishTheBlog = async (blogData: NewBlogData) => {
    console.log(blogData);
    try {
      const response = await axios.post(
        "http://localhost:5000/blogs",
        blogData
      );
      console.log("Blog has been published successfully", response);
      setBlogContent({
        title: "",
        subtitle: "",
        blogImageLink: "",
      });
      setEditorState(EditorState.createEmpty());
      toast.success("Blog has been published!");
    } catch (error) {
      console.log("here is the error why blog has not published: ", error);
      toast.error("Unable to publish the blog!");
    }
  };

  //calling the patch method for updating the blog in server
  const updateTheBlog = async (formData: NewBlogData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/blogs/${editingData.blogId}`,
        formData
      );
      console.log("blog has been updated", response);
      setBlogContent({
        title: "",
        subtitle: "",
        blogImageLink: "",
      });
      setEditorState(EditorState.createEmpty());
      toast.success("Blog has updated!");
    } catch (error) {
      console.log("error in updating the blog", error);
      toast.error("Unable to update the blog! please try again later");
    }
  };

  //handling(publishing or updating) the blog on the click of handleSubmit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent(); //getting the content of the blog from editor state
    const rawContent = JSON.stringify(convertToRaw(contentState)); // converting the blog content into html format and saving it as a string type raw content

    // console.log("here is the editor content", rawContent);

    //storing the data in blogData
    const blogData = {
      author: username,
      title: blogContent.title,
      subtitle: blogContent.subtitle,
      content: rawContent,
      blogImageLink: blogContent.blogImageLink,
    };

    if (editingData) {
      //run this function only when editingData in presented
      updateTheBlog(blogData);
    } else {
      publishTheBlog(blogData); // calling the post function sending blogs to server
    }
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
              className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-purple-300 file:text-purple-700
        hover:file:bg-purple-100"
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
