import React, { useEffect, useState } from "react";
import  DefaultProfile from "../../images/defaultProfile.png";


const CommentComponent = () => {
  const [comment, setComment] = useState("");
  const [cmtBtn, setCmtBtn] = useState(true);
  const [showComment, setShowComment] = useState([]);

  useEffect(() => {
    if (comment.trim() !== "") {
      setCmtBtn(false);
    } else {
      setCmtBtn(true);
    }
  }, [comment]);

  const handleComment = (e) => {
    e.preventDefault();

    const newComment = {
      username: "Umang123",
      profile: "/",
      commentValue: comment,
    };

    setShowComment((prevComments) => [...prevComments, newComment]);
    setComment("");
    console.log(showComment);
  };

  return (
    <div id="comments" className="my-6 px-4">
      <h2 className="text-2xl font-semibold pb-7">
        Comments({showComment.length})
      </h2>
      <div className="flex items-start justify-start gap-4 px-2">
        <input
          type="text"
          name="comments"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What are your thoughts?"
          className="py-2 rounded-lg mx-auto w-full border px-4 outline-none shadow-md"
          required
        />
        <button
          type="button"
          onClick={handleComment}
          disabled={cmtBtn}
          className="py-2 px-2 text-white rounded-lg bg-purple-600 disabled:bg-purple-300"
        >
          Comment
        </button>
      </div>
      <div className="w-full flex flex-col gap-6 my-8 p-4">
        {showComment.length > 0 ? (
          showComment.map((commentData, id) => (
            <div key={id} className="flex w-full items-start gap-2">
              <img
                className="border rounded-full size-11"
                src={DefaultProfile}
                alt="user profile"
              />
              <div>
                <p className="font-semibold text-sm">{commentData.username}</p>
                <p>{commentData.commentValue}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments write know</p>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;
