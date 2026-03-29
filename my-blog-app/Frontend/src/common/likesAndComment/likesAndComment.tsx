import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BlogInteractionProps } from "../types/types";
import toast from "react-hot-toast";
import { useAppSelector } from "../../redux/app/hooks/hooks";

const LikesAndComment = ({ _id, likeCounts, commentCounts }:BlogInteractionProps) => {

  const [liked, setLiked] = useState<boolean>(false);
  const [updatingLikesCount, setUpdatingLikesCount] = useState<number>(likeCounts);

  const navigate = useNavigate();
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  const userName: string | null = user && typeof user === 'object'? user.userName: null;
  

  //filtering the likes of user by username
  useEffect(() => {
    if (isLoggedIn && userName) {
      async function getLikesByUsername() {
        try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/likes/${_id}`);
          const allLikes = response.data;
          setLiked(
            allLikes.some((like:{username:string}) => like.username === userName)
          ); // checking the blog using (some) funtion if user has liked it or not
          // console.log("fetched the user likedata", allLikes); //-------------------
        } catch (error) {
          console.log("error in fetching the user liked blog", error);
        }
      }
      getLikesByUsername();
    }
  }, [userName, _id, isLoggedIn]);

  // create post api for updating the likes count
  async function sendingLikeDataToServer(likeData: { blogId: string; username: string }) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/likes`,
        likeData
      );
      console.log(
        "like data send to the server here is the response: ",
        response.data
      );
    } catch (error) {
      console.log("cannot send like data to server", error);
    }
  }

  const handleLike = () => {
    if (isLoggedIn && userName) {
      const likeData = {
        blogId: _id,
        username: userName,
      };
      sendingLikeDataToServer(likeData); //calling the sending like function
      setLiked(true);
      setUpdatingLikesCount((prev)=> prev +1); // updating the likes count
    } else {
      toast.error("Please login to like the blog");
      navigate("/login");
    }
  };

  //deleting the like post from likes
  async function deleteTheLikePost() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/likes/${_id}/${userName}`
      );
      console.log("blog unliked", response.data);
    } catch (error) {
      console.log("error in unliking the blog", error);
    }
  }

  const handleDislike = () => {
    deleteTheLikePost(); // calling the delete like function
    setLiked(false);
    setUpdatingLikesCount((prev) => prev - 1);
  };

  return (
    <div className="flex items-center gap-4 text-gray-500">
      {/* like button */}
      <button 
        onClick={liked ? handleDislike : handleLike}
        className="flex items-center gap-1.5 hover:text-red-500 group focus:outline-none transition-colors"
      >
        <div className={`p-2 rounded-full transition-colors ${liked ? "bg-red-50" : "group-hover:bg-red-50"}`}>
          {liked ? (
            <FaHeart className="text-xl text-red-500 scale-110 transition-transform" />
          ) : (
            <FaRegHeart className="text-xl group-hover:scale-110 transition-transform" />
          )}
        </div>
        <span className="font-medium text-gray-700">{updatingLikesCount}</span>
      </button>

      {/* comment count */}
      <div className="flex items-center gap-1.5 hover:text-purple-600 group transition-colors cursor-default">
        <div className="p-2 rounded-full group-hover:bg-purple-50 transition-colors">
          <BiComment className="text-xl group-hover:scale-110 transition-transform" />
        </div>
        <span className="font-medium text-gray-700">{commentCounts}</span>
      </div>
    </div>
  );
};

export default LikesAndComment;
