import LikesAndComment from "./likesAndComment/likesAndComment";
import { Link, useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { BlogCardProps } from "./types/types";
import defaultBlogImage from "../images/defaultBlogImage.png";

const BlogCard = ({ editOption, blogData }: BlogCardProps) => {
  const navigate = useNavigate();

  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    blog: any
  ) => {
    e.preventDefault();
    navigate("/write", { state: blog }); //sending blogData to write page component
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {blogData?.map((blog) => (
        <div
          className="group flex flex-col sm:flex-row bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          key={blog._id}
        >
          {/* Image Section */}
          <Link to={`/blog/${blog._id}`} className="sm:w-2/5 overflow-hidden shrink-0 h-52 sm:h-full relative">
            <img
              src={blog.blogImageLink ? `${import.meta.env.VITE_SERVER_URL}/uploads/${blog.blogImageLink}` : defaultBlogImage}
              alt="Blog related"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.currentTarget.src = defaultBlogImage; }}
            />
            {/* Soft gradient overlay for text readability if we wanted titles over images, but we're keeping it clean */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Content Section */}
          <div className="flex flex-col justify-between p-5 w-full">
            <Link to={`/blog/${blog._id}`} className="flex flex-col h-full flex-grow">
              <h1 className="text-xl font-bold text-gray-800 leading-tight mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                {blog.blogTitle}
              </h1>
              
              <div className="text-sm text-gray-500 mb-3 flex items-center gap-1.5">
                <span className="font-medium text-purple-500/80">By</span>
                <span className="font-semibold text-gray-700 truncate">{blog.blogAuthor}</span>
              </div>

              <p className="text-gray-600 line-clamp-2 text-sm mb-4 leading-relaxed">
                {blog.blogSubtitle}
              </p>
            </Link>

            {/* Interaction Bar */}
            <div className="pt-4 mt-auto border-t border-gray-50 flex items-center justify-between">
              <LikesAndComment
                _id={blog._id}
                likeCounts={blog.blogLikesCount}
                commentCounts={blog.blogCommentsCount}
              />
              
              {editOption && (
                <button
                  onClick={(e) => handleEdit(e, blog)}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-purple-600 hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <BsPencilSquare size={16} />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
