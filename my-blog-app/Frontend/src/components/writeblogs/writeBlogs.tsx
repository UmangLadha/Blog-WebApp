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
        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/blogs/${editingData.blogId}`,blogData);
        toast.success("Blog has updated!");
      } else {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/blogs`, blogData);
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

    handleBlogData(blogData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-2">
          {isEditing ? "Edit Your Story" : "Create Your Story"}
        </h1>
        <p className="text-gray-500 font-medium">Share your knowledge and ideas with the world.</p>
      </div>
      
      <div className="bg-white shadow-xl shadow-purple-900/5 rounded-3xl p-6 sm:p-10 border border-gray-100">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 w-full"
        >
          {/* Title and Subtitle Area */}
          <div className="flex flex-col gap-6">
            <input
              type="text"
              id="title"
              value={blogContent.title}
              onChange={(e) =>
                setBlogContent({ ...blogContent, title: e.target.value })
              }
              placeholder="Give your story a title..."
              className="border-none outline-none w-full text-3xl md:text-5xl font-bold text-gray-900 placeholder-gray-300 bg-transparent focus:ring-0"
            />

            <input
              type="text"
              id="subtitle"
              value={blogContent.subtitle}
              onChange={(e) =>
                setBlogContent({ ...blogContent, subtitle: e.target.value })
              }
              placeholder="Write a brief subtitle or summary..."
              className="border-none outline-none w-full text-lg md:text-2xl font-medium text-gray-600 placeholder-gray-400 bg-transparent focus:ring-0"
            />
          </div>

          {/* Image Upload Area */}
          <div className="w-full mt-2">
            {blogContent.blogImageLink ? (
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl group shadow-sm ring-1 ring-gray-900/5">
                <img
                  src={blogContent.blogImageLink}
                  alt="Cover preview"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    className="bg-white text-gray-900 font-medium py-2 px-6 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                    onClick={() =>
                      setBlogContent({ ...blogContent, blogImageLink: "" })
                    }
                  >
                    Remove Cover Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-purple-400 bg-gray-50 hover:bg-purple-50/50 p-10 text-center transition-colors">
                <div className="rounded-full bg-white p-4 shadow-sm">
                  <CiImageOn className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-gray-700 font-semibold text-lg">Add a cover image</p>
                  <p className="text-gray-500 text-sm">A highly recommended step for a successful blog.</p>
                </div>
                <button
                  type="button"
                  onClick={handleFile}
                  className="mt-2 flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-medium py-2.5 px-6 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <LuUpload className="h-4 w-4 text-purple-600" />
                  Browse files
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
          </div>

          {/* Text Editor Wrapper */}
          <div className="w-full mt-4 prose prose-purple max-w-none text-gray-800">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 ml-1">Article Content</h3>
            <div className="min-h-[400px] border border-gray-200 rounded-2xl overflow-hidden focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-500/10 transition-all bg-gray-50">
              <TextEditor content={editorState} setContent={setEditorState} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={btnActive}
              className="bg-purple-600 font-bold text-white py-3 md:py-4 px-8 md:px-12 rounded-xl w-full sm:w-auto shadow-md shadow-purple-500/20 hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md disabled:cursor-not-allowed text-lg"
            >
              {isEditing ? "Save Changes" : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { NewBlogs };
