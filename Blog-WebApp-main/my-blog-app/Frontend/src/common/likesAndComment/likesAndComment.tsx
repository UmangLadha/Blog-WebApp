import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BlogInteractionProps } from "../types/types";
import toast from "react-hot-toast";
import { useAppSelector } from "../../redux/app/hooks/hooks";

const LikesAndComment = ({ blogId, likeCounts, commentCounts }:BlogInteractionProps) => {

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
          const response = await axios.get(`http://localhost:5000/likes/${blogId}`);
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
  }, [userName, blogId, isLoggedIn]);

  // create post api for updating the likes count
  async function sendingLikeDataToServer(likeData: { blogId: number; username: string }) {
    try {
      const response = await axios.post(
        "http://localhost:5000/likes",
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
        blogId,
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
        `http://localhost:5000/likes/${blogId}/${userName}`
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
    <div className="flex items-center gap-2">
      {/* like button */}
      {liked ? (
        <FaHeart className="text-lg text-red-500 cursor-pointer" onClick={handleDislike} />
      ) : (
        <FaRegHeart className="text-lg cursor-pointer" onClick={handleLike} />
      )}
      <span className="text-lg">{updatingLikesCount}</span>

      {/* comment button */}
      <div className=" flex items-center gap-1 text-lg">
        <BiComment/>
        {commentCounts}
      </div>
    </div>
  );
};

export default LikesAndComment;
