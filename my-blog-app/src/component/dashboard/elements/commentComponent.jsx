import React from 'react'

const CommentComponent = () => {
  return (
	<div className="my-6 px-4">
          <h2 className="text-2xl font-semibold pb-7">Comments(4)</h2>
          <div className="flex items-start justify-start gap-4 px-2">
            <input
              type="text"
              name="comments"
              id="comment"
              placeholder="What are your thoughts?"
              className="py-2 rounded-lg mx-auto w-full border px-4 outline-none shadow-md"
            />
            <button className="py-2 px-2 text-white rounded-lg bg-purple-600">
              Comment
            </button>
          </div>
		  <div className="border w-full h-60 my-8 p-2">Comments will come in this blocks</div>
        </div>
  )
}

export default CommentComponent