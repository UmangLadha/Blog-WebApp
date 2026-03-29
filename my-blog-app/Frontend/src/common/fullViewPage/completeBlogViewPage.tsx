import { useEffect, useState } from "react";
import LikesAndComment from "../likesAndComment/likesAndComment";
import CommentComponent from "../commentComponent/commentComponent";
import axios from "axios";
import { useParams } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import { Blog } from "../types/types";
import defaultBlogImage from "../../images/defaultBlogImage.png";

const CompleteBlogViewPage = () => {
  const [fullBlog, setFullBlog] = useState<Blog | null>(null);
  const { id } = useParams<{ id: string }>();
  const blogId = id; // MongoDB _id is a string

  useEffect(() => {
    async function fetchingBlogById() {
      try {
        const response = await axios.get<Blog>(
          `${import.meta.env.VITE_SERVER_URL}/blogs/${blogId}`
        );
        setFullBlog(response.data);
      } catch (error) {
        console.log("Error in fetching blog: ", error);
      }
    }
    fetchingBlogById();
  }, [blogId]);

  if (!fullBlog) return <p className="text-center py-20">Loading blog...</p>;

  const blogContent = draftToHtml(fullBlog.blogContent); // converting the raw content in to html

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Blog Header */}
      <header className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
          {fullBlog.blogTitle}
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 font-medium leading-snug mb-6">
          {fullBlog.blogSubtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-y border-gray-100 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
            <span className="font-medium">
              By <span className="text-purple-600 font-semibold">{fullBlog.blogAuthor}</span>
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            {/* Can add date here if available */}
            <span>Published recently</span>
          </div>

          <div className="flex items-center gap-4">
            <LikesAndComment
              _id={fullBlog?._id}
              likeCounts={fullBlog.blogLikesCount}
              commentCounts={fullBlog.blogCommentsCount}
            />
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="w-full mb-12">
        <img
          className="w-full h-auto max-h-[600px] object-cover rounded-2xl shadow-xl shadow-purple-900/5 ring-1 ring-gray-900/5"
          src={fullBlog.blogImageLink ? `${import.meta.env.VITE_SERVER_URL}/uploads/${fullBlog.blogImageLink}` : defaultBlogImage}
          alt="Blog cover"
          onError={(e) => { e.currentTarget.src = defaultBlogImage; }}
        />
      </div>

      {/* Main Content */}
      <section
        className="text-lg text-gray-800 leading-loose font-serif
                   [&>p]:mb-6 [&>p]:text-justify
                   [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mt-10 [&>h1]:mb-4
                   [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4
                   [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3
                   [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
                   [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
                   [&>blockquote]:border-l-4 [&>blockquote]:border-purple-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600"
        dangerouslySetInnerHTML={{ __html: blogContent }}
      />

      {/* Comments Section */}
      <section className="mt-16 pt-10 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Discussion 
          <span className="text-lg bg-gray-100 text-gray-600 py-1 px-3 rounded-full">{fullBlog.blogCommentsCount}</span>
        </h2>
        <CommentComponent _id={fullBlog?._id} />
      </section>
    </article>
  );
};

export default CompleteBlogViewPage;
