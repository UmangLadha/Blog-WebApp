import { RawDraftContentState } from "draft-js";

//usting this interface in fullview page
export type Blog = {
  _id: string;
  blogAuthor: string;
  blogTitle: string;
  blogSubtitle: string;
  blogContent: RawDraftContentState;
  blogImageLink?: string;
  blogLikesCount: number;
  blogCommentsCount: number;
};

//using this in blogCard component
export type BlogCardProps = {
  editOption?: boolean;
  blogData?: Blog[];
};

export type CommentsInteractionProps = {
  _id: string;
}

export type CommentsData = {
  blogId: number,
  username: string,
  commentText: string
}

// using this in likeAndComment component
export type BlogInteractionProps = {
  _id: string;
  likeCounts: number;
  commentCounts: number;
};

//using this interface in login and signup page
export interface UserDetails {
  username?: string;
  fullname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface NewBlogData {
  author?: string;
  title?: string;
  subtitle?: string;
  blogContent?: string;
  blogImageLink?: string | null;
}

export type CommentProps = {
  _id:string
}