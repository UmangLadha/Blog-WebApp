import { useEffect,useState } from 'react';
import DefaultProfile from "../../../images/defaultProfile.png";
import axios from 'axios';
import {CommentsData, CommentProps} from "../../types/types";



const ShowingComments = ({_id}:CommentProps) => {
    const [showComment, setShowComment] = useState<CommentsData[]>([]);

	// getting the comments
	useEffect(()=>{
		async function getComments (){
			try {
				const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/comments/${_id}`);
				setShowComment(response.data);
			} catch (error) {
				console.log(error, "cannot get the comments of this blog");
			}
		}
		getComments();
	},[_id])

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