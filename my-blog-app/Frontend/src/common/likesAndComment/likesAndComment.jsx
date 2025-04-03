import React, { useEffect, useState, useCallback } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const LikesAndComment = ({ blogData }) => {
  const [likeCount, setLikeCount] = useState(0); // saving all the like counts
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const fetchingLikes = useCallback(async () => {
    try {
      const resFromServer = await axios.get("http://localhost:5000/likes");
      console.log("getting all likes info:", resFromServer.data);
      const allLikes = resFromServer.data;

      const blogLikes = allLikes.filter(
        (like) => like.blogId === blogData.blogId
      ); // and filtering out the data according to the blogId
      setLikeCount(blogLikes.length);

      // checking only when user is logged In
      if (isLoggedIn) {
        setIsLikedByUser(
          blogLikes.some((likes) => likes.username === user.userName)
        ); // checking the blog if user has liked the blog or not it returns true of false
      } else {
        setIsLikedByUser(false);
      }
    } catch (error) {
      console.log("error in fetching the Likes:", error);
    }
  }, [isLoggedIn, user.userName, blogData.blogId]);

  useEffect(() => {
    fetchingLikes(); // calling the above function
  }, [fetchingLikes]);

  // create post api for updating the likes count
  async function sendingLikeDataToServer(likeData) {
    try {
      const response = await axios.post(
        "http://localhost:5000/likes",
        likeData
      );
      console.log(
        "like data send to the server here is the response: ",
        response
      );
    } catch (error) {
      console.log("cannot send like data to server", error);
    }
  }

  const handleLike = async () => {
    if (isLoggedIn) {
      const userLikeData = {
        blogId: blogData.blogId,
        username: user.userName,
      };
      try {
        await sendingLikeDataToServer(userLikeData); // Wait for the API call
        setIsLikedByUser(true);
        setLikeCount((prev) => prev + 1);
      } catch (error) {
        console.error("Error liking the blog:", error);
      }
    } else {
      alert("Its seem you have not login please login to continue");
      navigate("/login");
    }
  };

  //deleting the like post from likes
  async function deleteTheLikePost() {
    try {
      const response = await axios.delete(
        `http://localhost:5000/likes/${blogData.blogId}/${user.userName}`
      );
      console.log("blog unliked", response);
    } catch (error) {
      console.log("error in unliking the blog", error);
    }
  }

  const handleDislike = async (e) => {
    e.preventDefault();
    try {
      await deleteTheLikePost(); // Wait for the API call
      setIsLikedByUser(false);
      setLikeCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error unliking the blog:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* like button */}
      {isLikedByUser ? (
        <FaHeart className="text-lg text-red-500" onClick={handleDislike} />
      ) : (
        <FaRegHeart className="text-lg" onClick={handleLike} />
      )}
      <span className="text-lg">{likeCount}</span>

      {/* comment button */}
      <div className=" flex items-center gap-1 text-lg">
        <BiComment
          onClick={() =>
            navigate(`/blog/${blogData.blogId}`, { state: blogData })
          }
        />
        {blogData.blogCommentsCounts ?? 0}
      </div>
    </div>
  );
};

export default LikesAndComment;
