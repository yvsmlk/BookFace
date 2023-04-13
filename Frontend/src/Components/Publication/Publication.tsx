import React, { useState } from "react";
import  PostData  from "./PostData";
import { FaHeart, FaShare, FaComment, FaEllipsisH } from "react-icons/fa";
import { BiSave } from "react-icons/bi";

interface Props {
  data: PostData;
  className: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const Publication: React.FC<Props> = ({ data}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    data.likes++;
  };

  const handleShare = () => {
    data.shares++;
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  const handleComment = () => {
    setIsCommenting(true);
  };

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment = { text: commentText };
    data.comments.push(newComment);
    setIsCommenting(false);
    setCommentText("");
  };

  return (
    <div className="  w-96   md:w-auto lg:w-4/5 xl:w-auto mx-auto rounded-md overflow-hidden shadow-md bg-white">
      <div className="flex items-center justify-between mb-4 mr-1 ml-1">
        <div className="flex items-center">
          <img src={data.author.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
          <div>
            <div className="font-semibold  text-green-800">{data.author.name}</div>
            <div className=" text-green-800">@{data.author.username}</div>
          </div>
        </div>
        <FaEllipsisH className="w-5 h-5  text-green-800 mr-1 ml-1" />
      </div>
      {data.content && (
        <div className="mb-4 mr-2 ml-2">
          <p>{data.content}</p>
        </div>
      )}
      {data.imageUrl && (
        <div className="mb-4 mr-2 ml-2">
          <img src={data.imageUrl} alt="Post" className="w-full" />
        </div>
      )}
      {data.videoUrl && (
        <div className="mb-4 mr-2 ml-2">
          <iframe src={data.videoUrl} title="Post" className="w-full" />
        </div>
      )}
      <div className="flex items-center justify-between mr-2 ml-2">
        <div className="flex items-center">
          <button onClick={handleLike} className="flex items-center mr-4 text-green-700">
            <FaHeart className="w-5 h-5 mr-2" />
            <span>{data.likes}</span>
          </button>
          <button onClick={handleShare} className="flex items-center mr-4 text-green-700">
            <FaShare className="w-5 h-5 mr-2" />
            <span>{data.shares}</span>
          </button>
          <button onClick={handleComment} className="flex items-center text-green-700">
            <FaComment className="w-5 h-5 mr-2" />
            <span>{data.comments.length}</span>
          </button>
        </div>
        <button onClick={handleSave} className="bg-green-700 text-white rounded-lg px-4 py-2 mb-1">
          {isSaved ? "Saved" : <BiSave className="w-4 h-3 mr-2" />} {isSaved ? "" : "Save"}
        </button>
      </div>
      {isCommenting && (
        <div className="mt-4 mr-2 ml-2">
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              className="
                w-full
                rounded-md
                border-gray-300
                focus:outline-none
                focus:ring
                focus:ring-green-800
                py-2
                px-4
                
              "
              placeholder="Write a comment..."
            />
            <button
              type="submit"
              className="bg-green-800 text-white rounded-lg px-4 py-2 mt-2 mb-1"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Publication;
              
          
          
          
          
          