import React, { useEffect, useState} from "react";
import TextEditor from "./elements/textEditor";
import { EditorState, convertToRaw } from 'draft-js';

const NewBlogs = () => {
  const [blogContent, setBlogContent] = useState({
    title: "",
    subtitle: "",
    blogImg: "",
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [btnActive, setBtnActive] = useState(false);

  useEffect(() => {
    const isContentValid =
      blogContent.title.trim() !== "" &&
      blogContent.subtitle.trim() !== ""&&
      editorState.getCurrentContent().hasText();
    setBtnActive(!isContentValid);
  }, [blogContent, editorState]);

  const handleFile = (e) => {
	e.preventDefault();
    // const arrOfImg = Array.from(e.target.files);
	const file = e.target.files[0];
	setBlogContent({...blogContent, blogImg: file});
  };

  const handlePublish = (e) => {
    e.preventDefault();

	const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

	const blogData = {
		...blogContent,
		content: rawContent
	};

    console.log("Publishing the blog", blogData);
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
            {/* <textarea
              id="content"
              name="content"
              value={blogContent.content}
              onChange={(e) =>
                setBlogContent({ ...blogContent, content: e.target.value })
              }
              placeholder="Tell your story..."
              className="border outline-none py-2 px-4 rounded-lg w-full text-2xl mb-6 "
              rows={5}
              cols={50}
            /> */}

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
