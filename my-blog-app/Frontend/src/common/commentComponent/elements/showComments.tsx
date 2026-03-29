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

  // Formatter for comment dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-6">
      {showComment.length > 0 ? (
        showComment?.map((commentData: CommentsData, id) => (
          <div key={id} className="flex w-full items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <img
              className="rounded-full w-12 h-12 object-cover shadow-sm bg-purple-50 p-0.5"
              src={DefaultProfile}
              alt="user profile"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-gray-900 text-base">{commentData.username}</p>
                <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                  {formatDate(commentData.createdAt)}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">{commentData.commentText}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No one has commented yet. Be the first!</p>
        </div>
      )}
    </div>
  );
}

export default ShowingComments;