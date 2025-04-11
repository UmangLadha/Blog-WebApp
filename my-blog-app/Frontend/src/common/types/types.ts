

export type Blog = {
  blogId: number;
  blogAuthor: string;
  blogTitle: string;
  blogSubtitle: string;
  blogContent:string;
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

