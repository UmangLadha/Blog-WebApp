import { useEffect,useState } from 'react';
import DefaultProfile from "../../../images/defaultProfile.png";
import axios from 'axios';
import {CommentsData} from "../../types/types";

type CommentProps = {
  blogId:number
}

const ShowingComments = ({blogId}:CommentProps) => {
    const [showComment, setShowComment] = useState<CommentsData[]>([]);

	// getting the comments
	useEffect(()=>{
		async function getComments (){
			try {
				const response = await axios.get(`http://localhost:5000/comments/${blogId}`);
				setShowComment(response.data);
			} catch (error) {
				console.log(error, "cannot get the comments of this blog");
			}
		}
		getComments();
	},[blogId])

  return (
	<div className="w-full flex flex-col gap-6 p-2 rounded-xl my-2">
        {showComment.length > 0 ? (
          showComment?.map((commentData:CommentsData, id) => (
            <div key={id} className="flex w-full items-start gap-2">
              <img
                className="border rounded-full size-11"
                src={DefaultProfile}
                alt="user profile"
              />
              <div>
                <p className="font-semibold text-sm">{commentData.username}</p>
                <p>{commentData.commentText}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments have been written in this blog</p>
        )}
      </div>
  )
}

export default ShowingComments;