import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ShowingComments from "./elements/showComments";
import { useNavigate } from "react-router";

const CommentComponent = (props) => {
  const { blogId } = props;
  const [showComment, setShowComment] = useState([]);
  const navigate = useNavigate();
  const [inputCommentValue, setInputCommentValue] = useState("");
  const [cmtBtn, setCmtBtn] = useState(true); // state for handling toggel of comment button
  const user = useSelector(state=>state.auth.user) // getting the user data from redux 

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  //running the comment toggle btn function  
  useEffect(() => {
    if (inputCommentValue.trim() !== "") {
      setCmtBtn(false);
    } else {
      setCmtBtn(true);
    }
  }, [inputCommentValue]);

  //saving the comments in database
  async function postComments(newComment){
		try {
			const comment  = await axios.post("http://localhost:5000/comments", newComment);
			console.log(comment); 
		} catch (error) {
			console.log("unable to send comments to server",error);
		}
	}

  //running the function on clicking the comment btn
  const handleComment = (e) => {
    e.preventDefault();
	console.log(isLoggedIn);
	if(isLoggedIn){

		const commentContent = {
			blogId : blogId,
			username: user.username, //
			commentText: inputCommentValue,
		};
		
		postComments(commentContent);
		console.log(showComment);
	}
	else{
		alert("please login to write the comment");
		navigate("/login");
	}
		setInputCommentValue("");
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

      <ShowingComments blogId={blogId} comments={showComment} setComments={setShowComment}/>
       
    </div>
  );
};

export default CommentComponent;
