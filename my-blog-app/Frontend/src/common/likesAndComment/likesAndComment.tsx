import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const LikesAndComment = (props) => {
  const { blogData } = props;

  const [commentsCount, setCommentsCount] = useState([]); // saving all the comments counts
  const [likeCount, setLikeCount] = useState([]); // saving all the like counts
  const [userLikes, setUserLikes] = useState([]); // storing all the post liked by user

  const [liked, setLiked] = useState(false);
  const [updatingLikesCount, setUpdatingLikesCount] = useState(0);

  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  //calling the get request to fetch the comments for showing the counts
  useEffect(() => {
    async function getCommentCount() {
      const response = await axios.get("http://localhost:5000/comments"); // getting the response
      const comments = response.data.filter(
        (comment) => blogData.blogId === comment.blogId
      ); // and filtering out the data according to the blogId
      setCommentsCount(comments); //and provideing that data to state
    }
    getCommentCount();
  }, [blogData.blogId]);

  //calling the get request to fetch the likes for showing the counts
  useEffect(() => {
    async function getLikesCountForBlog() {
      const response = await axios.get("http://localhost:5000/likes");
      const likes = response.data.filter(
        (like) => blogData.blogId === like.blogId
      ); // and filtering out the data according to the blogId
      setLikeCount(likes);
      setUpdatingLikesCount(likes.length);
    }
    getLikesCountForBlog();
  }, [blogData.blogId]);

  //filtering the likes of user by username
  useEffect(() => {
    if (isLoggedIn) {
      // calling this function only when user is
      async function getLikesByUsername() {
        try {
          const allLikes = await axios.get("http://localhost:5000/likes");
          const userLikedBlogs = allLikes.data.filter(
            (likes) => likes.username === user.username
          ); // getting the response and filtering them out
          setUserLikes(userLikedBlogs); //------------------------------------------------
          setLiked(
            userLikedBlogs.some((like) => like.blogId === blogData.blogId)
          ); // checking the blog if user has liked it or not ------------------------------------------------
          // console.log("fetched the user likedata", userLikedBlogs); //-------------------
        } catch (error) {
          console.log("error in fetching the user liked blog", error);
        }
      }
      getLikesByUsername();
    }
  }, [user, blogData.blogId, isLoggedIn]);

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

  const handleLike = () => {
    if (isLoggedIn) {
      const updatingCount = liked ? likeCount.length - 1 : likeCount.length + 1;

      const userLikeData = {
        blogId: blogData.blogId,
        username: user.username,
      };

      sendingLikeDataToServer(userLikeData); //calling the sending like function
      setLiked(true);
      setUpdatingLikesCount(updatingCount); // updating the likes count
    } else {
      alert("Its seem you have not login please login to continue");
      navigate("/login");
    }
  };

  //deleting the like post from likes
  async function deleteTheLikePost() {
    try {
      const response = await axios.delete(
        `http://localhost:5000/likes/${blogData.blogId}/${user.username}`
      );
      console.log("blog unliked", response);
    } catch (error) {
      console.log("error in unliking the blog", error);
    }
  }

  const handleDislike = (e) => {
    e.preventDefault();
    deleteTheLikePost(); // calling the delete like function
    setLiked(false);
    setUpdatingLikesCount((prevlike) => prevlike - 1);
  };

  return (
    <div className="flex items-center gap-2">
      {/* like button */}
      {liked ? (
        <FaHeart className="text-lg text-red-500" onClick={handleDislike} />
      ) : (
        <FaRegHeart className="text-lg" onClick={handleLike} />
      )}
      <span className="text-lg">{updatingLikesCount}</span>

      {/* comment button */}
      <div className=" flex items-center gap-1 text-lg">
        <BiComment
          onClick={() =>
            navigate(`/blog/${blogData.blogId}`, { state: blogData })
          }
        />
        {commentsCount.length}
      </div>
    </div>
  );
};

export default LikesAndComment;
