import { useEffect, useRef, useState } from "react";
import TextEditor from "./elements/textEditor";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import axios from "axios";
import { useAppSelector } from "../../redux/app/hooks/hooks";
import { useLocation } from "react-router-dom";
import { NewBlogData } from "../../common/types/types";
import toast from "react-hot-toast";
import { LuUpload } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";

const NewBlogs = () => {
  const location = useLocation();
  const editingData = location.state;
  const inputRef = useRef<HTMLInputElement>(null);

  const [blogContent, setBlogContent] = useState<NewBlogData>({
    title: "",
    subtitle: "",
    blogImageLink: "",
  });
  const [btnActive, setBtnActive] = useState<boolean>(false); // publish toggel button

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  ); //initializiing the editor state
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const user = useAppSelector((state) => state.auth.user); // getting userData form redux to show in author name
  const username: string =
    user && typeof user === "object" ? user.userName : "";

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
      setIsEditing(true);
      // checking if editingData is available and then updating the state value of the inputfield
      setBlogContent({
        title: editingData.title || "",
        subtitle: editingData.subtitle || "",
        blogImageLink: editingData.imageLink || "",
      });
      const contentState = convertFromRaw(editingData.content); // converting the html value into raw content
      setEditorState(EditorState.createWithContent(contentState)); // updating the content state after getting the editing data
    }
  }, [editingData]);

  const handleFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const convertFileToBase64 = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      //onloadend is the function which will execute once the file is readed by readAsDataAsURL
      const base64 = fileReader.result as string; // getting the file from .result as a string type and giving it to variable
      setBlogContent({ ...blogContent, blogImageLink: base64 });
    };
    fileReader.readAsDataURL(file); //this is the file reader which reads the file or convert the file into base64
  };

  //handling the image file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files?.[0];
    if (!file) {
      toast.error("file not selected");
      return;
    }
    convertFileToBase64(file);
  };

  // calling the post method to publish the blog data in backend
  const handleBlogData = async (blogData: NewBlogData) => {
    try {
      if (isEditing) {
        await axios.patch(`http://localhost:5000/blogs/${editingData.blogId}`,blogData);
        toast.success("Blog has updated!");
      } else {
        const response = await axios.post("http://localhost:5000/blogs", blogData);
        console.log(response); //////////////
        toast.success("Blog has been published!");
      }
      setBlogContent({
        title: "",
        subtitle: "",
        blogImageLink: "",
      });
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Something went wrong Please try again!");
    }
  };

  //handling(publishing or updating) the blog on the click of handleSubmit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent(); // it retruning the current content object(which contains complex methods, prototype, etc.) of the blog from editor
    const rawContent = JSON.stringify(convertToRaw(contentState)); // converting the blog content into html format and saving it as a string type raw content

    //storing the data in blogData
    const blogData = {
      author: username,
      title: blogContent.title,
      subtitle: blogContent.subtitle,
      content: rawContent,
      blogImageLink: blogContent.blogImageLink,
    };

    console.log(blogData); /////////////////

    handleBlogData(blogData);
  };

  return (
    <div className="w-full mx-auto py-10 md:w-4/5 ">
      <div className="w-3/4 mx-auto ">
        <h1 className="text-4xl text-center font-bold py-7 tracking-tight ">
          Create Your Story
        </h1>
        <div className="shadow-xl p-5 rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between mx-auto items-start gap-2 w-4/5 md:w-3/4"
          >
            <input
              type="text"
              id="title"
              value={blogContent.title}
              onChange={(e) =>
                setBlogContent({ ...blogContent, title: e.target.value })
              }
              placeholder="Title"
              className="border-b border-purple-300 outline-none py-1 pl-3 w-full text-2xl font-bold mb-5"
            />

            <input
              type="text"
              id="subtitle"
              value={blogContent.subtitle}
              onChange={(e) =>
                setBlogContent({ ...blogContent, subtitle: e.target.value })
              }
              placeholder="Subtitle"
              className="border-b border-purple-300 outline-none py-1 pl-3 text-xl mb-4 w-full font-medium"
            />

            {blogContent.blogImageLink ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={blogContent.blogImageLink}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
                <button
                  className="absolute right-2 top-2 border py-1.5 px-3.5 rounded-lg bg-white"
                  onClick={() =>
                    setBlogContent({ ...blogContent, blogImageLink: "" })
                  }
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-purple-300 p-8 text-center">
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-200">
                  <CiImageOn className="h-6 w-6 text-purple-700" />
                </div>

                <p className="text-sm font-medium">Add a cover image</p>

                <button
                  onClick={handleFile}
                  className="flex items-center justify-between bg-purple-300 py-2 px-4 rounded-lg"
                >
                  <LuUpload className="mr-2 h-4 w-4" />
                  Upload Image
                </button>
                <input
                  id="blogCoverImg"
                  ref={inputRef}
                  type="file"
                  name="blogImg"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
            <TextEditor content={editorState} setContent={setEditorState} />

            <button
              type="submit"
              disabled={btnActive}
              className="bg-purple-600 font-semibold text-lg text-white py-2 mt-4 px-4 rounded-lg w-1/3 disabled:opacity-50"
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
