import { useAppSelector } from "../../redux/app/hooks/hooks";
import axios from "axios";
import ShowingComments from "./elements/showComments";
import { useNavigate } from "react-router-dom";
import { CommentsInteractionProps } from "../types/types";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const CommentComponent = ({ blogId }: CommentsInteractionProps) => {
  const [inputCommentValue, setInputCommentValue] = useState("");
  const [cmtBtn, setCmtBtn] = useState(true); // state for handling toggel of comment button

  const navigate = useNavigate();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth); // getting the user data from redux

  const userName: string | null =
    user && typeof user === "object" ? user.userName : null;

  //running the comment toggle btn function
  useEffect(() => {
    if (inputCommentValue.trim() !== "") {
      setCmtBtn(false);
    } else {
      setCmtBtn(true);
    }
  }, [inputCommentValue]);

  //saving the comments in database
  async function postComments(newComment: {
    blogId: number;
    username: string;
    commentText: string;
  }) {
    try {
      const comment = await axios.post(
        "http://localhost:5000/comments",
        newComment
      );
      toast.success("comment posted successfully");
      console.log(comment.data);
      setInputCommentValue("");
    } catch (error) {
      console.log("unable to send comments to server", error);
      toast.error("Failed to post comment. Please try again.");
    }
  }

  //running the function on clicking the comment btn
  const handleComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //getting the comment data from Form
    if (isLoggedIn && userName) {
      const commentContent = {
        blogId,
        username: userName, //
        commentText: inputCommentValue,
      };
      postComments(commentContent);
    } else {
      toast.error("please login to write the comment");
      navigate("/login");
    }
  };

  return (
    <>
      <div className=" w-full flex items-end justify-between gap-4">
        <input
          type="text"
          name="comments"
          id="commentValue"
          value={inputCommentValue}
          onChange={(e) => setInputCommentValue(e.target.value)}
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
      <ShowingComments blogId={blogId} />
    </>
  );
};

export default CommentComponent;
