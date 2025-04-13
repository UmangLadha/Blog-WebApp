import { useEffect, useState } from "react";
import TextEditor from "./elements/textEditor";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import axios from "axios";
import { useAppSelector } from "../../redux/app/hooks/hooks";
import { useLocation } from "react-router";
import Input from "../../common/formHandler/inputHandle";
import { useForm } from "react-hook-form";
import { NewBlogData } from "../../common/types/types";
import toast from "react-hot-toast";

const NewBlogs = () => {
const {register, watch, formState:{errors}, handleSubmit, reset} = useForm<NewBlogData>();
const newBlogData = watch();

  const [blogContent, setBlogContent] = useState<{
    title: string,
    subtitle: string,
    blogCoverImg: File | string |undefined,
  }>({
    title: "",
    subtitle: "",
    blogCoverImg: "",
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty()); //initializiing the editor state

  const user = useAppSelector((state) => state.auth.user); // getting userData form redux to show in author name
  const username:string = (user && typeof user==="object")?user.userName:"";

  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const editingData = location.state;
  //   console.log("this is the data got from navigate:", editingData);

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
  const handleFile = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files?.[0];
    console.log(typeof file);
    console.log(file);
    setBlogContent({ ...blogContent, blogCoverImg: file });
  };

  // calling the post method to publish the blog data in backend
  const publishTheBlog = async (blogData:FormData) => {
    console.log(blogData)
    try {
      const response = await axios.post("http://localhost:5000/blogs", blogData);
      console.log("Blog has been published successfully", response);
      toast.success("Blog has been published!");
      reset();
    } catch (error) {
      console.log("here is the error why blog has not published: ", error);
      toast.error("Unable to publish the blog!");
    }
  };

  //calling the patch method for updating the blog in server
  const updateTheBlog = async (formData:FormData) => {
	try {
		const response = await axios.patch(`http://localhost:5000/blogs/${editingData.blogId}`, formData );
		console.log("blog has been updated", response);
		toast.success("Blog has updated!");
    reset();
	} catch (error) {
		console.log("error in updating the blog",error);
		toast.error("Unable to update the blog! please try again later");
	}
  }

  //handling(publishing or updating) the blog on the click of handleSubmit function
  const onSubmit = (data:NewBlogData) => {
    const contentState = editorState.getCurrentContent(); //getting the content of the blog from editor state
    const rawContent = JSON.stringify(convertToRaw(contentState)); // converting the blog content into html format and saving it as a string type raw content

    console.log("here is the editor content", rawContent);

    //storing the data in FormData object
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("author", username);
    formData.append("blogCoverImg", data.blogCoverImg);
    formData.append("content", rawContent);

	if(editingData){ //run this function only when editingData in presented
		updateTheBlog(formData);
	}
	else{
    publishTheBlog(formData); // calling the post function sending blogs to server
	}
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
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between mx-auto items-start gap-2 w-4/5 md:w-3/4"
            encType="multipart/form-data"
          >
            <Input<NewBlogData>
            label="Title"
            inputType="text"
            name="title"
            inputPlaceholder="Write your title"
            error={errors.title}
            errorMsg="Input cannot be blank"
            minLength={10}
            required={true}
            register={register}
            />
            <Input<NewBlogData>
            label="Subtitle"
            inputType="text"
            name="subtitle"
            inputPlaceholder="Write your subtitle"
            error={errors.subtitle}
            errorMsg="Input cannot be blank"
            minLength={10}
            required={true}
            register={register}
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
              disabled={!newBlogData}
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
