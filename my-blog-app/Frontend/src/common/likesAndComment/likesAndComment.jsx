import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
// import { liked, disLiked } from "../../redux/features/counter/counterSlice";
import { useNavigate } from "react-router";
import axios from "axios";

const LikesAndComment = (props) => {
  const { blogDataId, blogCommentCount, navigateTo, likeCounts } = props;
  const [liked, setLiked] = useState(false);
  const [updatingLikesCount, setUpdatingLikesCount] = useState(likeCounts);

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleDislike = () => {
    setLiked(false);
  };

  const handleLike = async () => {
    try {
      if (isLoggedIn) {
        const updatingCount = liked ? likeCounts - 1 : likeCounts + 1;
        await axios.patch(`http://localhost:5000/blogs/${blogDataId}`, {
          likesCounts: updatingCount,
        });
        setLiked(true);
        setUpdatingLikesCount(updatingCount); // updating the likes count
      }
    } catch (error) {
      alert("Ohhoo! Its seem you have not login please login to continue");
      navigate("/login");
    }
  };
  return (
    <div className="flex items-center gap-2">
      {liked ? (
        <FaHeart
          className="text-xl text-red-500"
          onClick={handleDislike}
        />
      ) : (
        <FaRegHeart
          className="text-xl"
          onClick={handleLike}
        />
      )}
      <span>{updatingLikesCount}</span>
      {navigateTo ? (
        <>
          <BiComment onClick={() => navigate(`/blog/${blogDataId}`)} className="text-xl" />
          <span>{blogCommentCount}</span>
        </>
      ) : (
        <a href="#comments">
          <BiComment className="text-xl" />
          <span>{blogCommentCount}</span>
        </a>
      )}
    </div>
  );
};

export default LikesAndComment;
