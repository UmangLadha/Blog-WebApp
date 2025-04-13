import { useAppSelector } from "../../redux/app/hooks/hooks";
import axios from "axios";
import ShowingComments from "./elements/showComments";
import { useNavigate } from "react-router";
import { CommentsInteractionProps } from "../types/types";
import { useForm } from "react-hook-form";
import Input from "../formHandler/inputHandle";
import toast from "react-hot-toast";

interface Comment {
  comment: string;
}

const CommentComponent = ({ blogId }: CommentsInteractionProps) => {
  const { register, handleSubmit, watch, reset } = useForm<Comment>();

  const navigate = useNavigate();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth); // getting the user data from redux

  const commentText = watch(); //checking if the text filed changes or not

  const userName: string | null =
    user && typeof user === "object" ? user.userName : null;

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
    } catch (error) {
      console.log("unable to send comments to server", error);
      toast.error("Failed to post comment. Please try again.");
    }
  }

  //running the function on clicking the comment btn
  const handleComment = (data: Comment) => {
    //getting the comment data from Form
    if (isLoggedIn && userName) {
      const commentContent = {
        blogId,
        username: userName, //
        commentText: data.comment,
      };
      postComments(commentContent);
      reset(); //reseting the comment after submit
    } else {
      toast.error("please login to write the comment");
      navigate("/login");
    }
  };

  return (  
    <>
      <form
        className=" w-full flex items-end justify-between gap-4"
        onSubmit={handleSubmit(handleComment)}
      >
        <Input<Comment>
          label="Your Comment"
          name="comment"
          inputType="text"
          inputPlaceholder="What are your views?"
          register={register}
          required={true}
        />
        <button
          type="submit"
          disabled={!commentText?.comment}
          className="py-2 px-2 mb-3 text-white rounded-lg bg-purple-600 disabled:bg-purple-300"
        >
          Comment
        </button>
      </form>
      <ShowingComments blogId={blogId} />
    </>
  );
};

export default CommentComponent;
