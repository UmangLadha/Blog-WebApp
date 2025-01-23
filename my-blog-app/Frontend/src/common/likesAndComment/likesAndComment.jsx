import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, liked, disLiked } from "../../redux/features/counter/counterSlice";
import { useNavigate } from "react-router";

const LikesAndComment = (props) => {
  const { blogDataId, blogCommentCount, navigateTo } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const likesCount = useSelector((state) => state.counter.value);
  const likes = useSelector((state) => state.counter.like);

  const handleDislike = (prevId, blogId) => {
    // setLiked(false);
    if (isLoggedIn) {
      dispatch(disLiked());
      dispatch(decrement(blogId));
    }
  };

  const handleLike = (blogId) => {
    // setLiked(true);
    if (isLoggedIn) {
      dispatch(liked());
      dispatch(increment(blogId));
    } else {
      alert("Ohhoo! Its seem you have not login please login to continue");
      navigate("/login");
    }
  };
  return (
    <div className="flex items-center gap-2">
      {likes ? (
        <FaHeart
          className="text-xl"
          onClick={(prevLike) => handleDislike(prevLike, blogDataId)}
        />
      ) : (
        <FaRegHeart
          className="text-xl"
          onClick={(prevLike) => handleLike(prevLike, blogDataId)}
        />
      )}
      <span>{likesCount}</span>
	  { navigateTo ? (
		<><BiComment onClick={()=> navigate("/blog:id")} className="text-xl" /><span>{blogCommentCount}</span></>
	  ):
	  <a href="#comments" className=" scroll">
      <BiComment className="text-xl" />
      <span>{blogCommentCount}</span>
	  </a>
	}
    </div>
  );
};

export default LikesAndComment;
