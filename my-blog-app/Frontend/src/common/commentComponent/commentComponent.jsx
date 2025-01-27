import React, { useEffect, useState } from "react";
import DefaultProfile from "../../images/defaultProfile.png";
import { useSelector } from "react-redux";

const CommentComponent = (props) => {
  const { comments, setComments } = props;

  const [commentValue, setCommentValue] = useState("");
  const [cmtBtn, setCmtBtn] = useState(true);
  const user = useSelector(state=>state.auth.user)

  useEffect(() => {
    if (commentValue.trim() !== "") {
      setCmtBtn(false);
    } else {
      setCmtBtn(true);
    }
  }, [commentValue]);

  const handleComment = (e) => {
    e.preventDefault();
    const newComment = {
      username: user.username,
      commentValue: commentValue,
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setCommentValue("");
    console.log(comments);
  };

  return (
    <div id="comments" className="my-6 px-4">
      <h2 className="text-2xl font-semibold pb-7">
        Comments({comments.length})
      </h2>
      <div className="flex items-start justify-start gap-4 px-2">
        <input
          type="text"
          name="comments"
          id="commentValue"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
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
        {comments.length > 0 ? (
          comments.map((commentData, id) => (
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
