import { RawDraftContentState } from "draft-js";

//usting this interface in fullview page
export type Blog = {
  blogId: number;
  blogAuthor: string;
  blogTitle: string;
  blogSubtitle: string;
  blogContent:RawDraftContentState;
  blogImageLink?: string;
  blogLikesCount: number;
  blogCommentsCount: number;
};

//using this in blogCard component
export type BlogCardProps = {
    editOption?: boolean;
    blogData: Blog[];
  };

  export type CommentsInteractionProps = {
    blogId: number;
  }

  export type CommentsData = {
    blogId:number,
    username:string,
    commentText: string
  }

// using this in likeAndComment component
  export type BlogInteractionProps = {
    blogId: number;
    likeCounts: number;
    commentCounts: number;
  };

  //using this interface in login and signup page
  export interface UserDetails {
    username?:string;
    fullname?:string;
    email?:string;
    password?:string;
    confirmPassword?:string;
  }

export interface NewBlogData {
  author?:string;
  title?:string;
  subtitle?:string;
  blogContent?:string;
  blogImageLink?:string|ArrayBuffer|null;
}