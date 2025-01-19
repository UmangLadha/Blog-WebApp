import React, { useState } from "react";

const NewBlogs = () => {
	const [blogContent, setBlogContent] = useState({
		title:"",
		highlightedText:"",
		content:"",
		inputFile:"",
	})
  return (
    <div className="w-full mx-auto py-10 md:w-4/5 font-serif ">
      <div className="w-3/4 mx-auto ">
        <h1 className="text-4xl font-bold py-7 tracking-tight ">CREATE YOUR STORY</h1>
        <div className="border shadow-lg p-5 rounded-lg">
          <form className="flex flex-col justify-between mx-auto items-start gap-2 w-4/5 md:w-3/4" onSubmit="submit">

              <label htmlFor="title" className=" text-lg">Title</label>
              <input
                type="text"
                id="title"
				value={blogContent.title}
				onChange={(e)=> setBlogContent(e.target.value)}
                placeholder="Title"
				maxLength={50}
                className="border outline-none text-3xl font-medium py-2 px-4 mb-2 rounded-lg w-full"
              />

              <label className="text-lg" htmlFor="highlightText">Subtitle</label>
              <input
                type="text"
                id="highlightText"
				value={blogContent.highlightedText}
				onChange={(e)=> setBlogContent(e.target.value)}
                placeholder="Subtitle"
                className="border outline-none py-1 px-4 text-2xl mb-2 rounded-lg w-full"
              />

              <label className="text-lg" htmlFor="ContentImg">Insert Image</label>
              <input type="file" name="ContentImg" className="mb-2" id="ContentImg" />

              <label className="text-lg" htmlFor="content">Blog Content</label>
              <textarea
                id="blogContent"
                name="postBlog"
				value={blogContent.content}
				onChange={(e)=> setBlogContent(e.target.value)}
                placeholder="Tell your story..."
                className="border outline-none py-2 px-4 rounded-lg w-full text-2xl mb-6 "
				rows={5} 
				cols={50}
              />

            <button className="bg-green-600 font-semibold text-lg text-white py-2 px-4 rounded-lg w-1/3">
              Publish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { NewBlogs };
