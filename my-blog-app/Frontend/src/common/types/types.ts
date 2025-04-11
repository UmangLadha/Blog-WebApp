export type Blog = {
  blogId: number;
  blogTitle: string;
  blogSubtitle: string;
  blogAuthor: string;
  blogImageLink?: string;
  blogLikesCount: number;
  blogCommentsCount: number;
};

export type BlogCardProps = {
    editOption?: boolean;
    blogData: Blog[];
  };
  
  export type BlogInteractionProps = {
    blogId: number;
    likeCounts: number;
    commentCounts: number;
  };
