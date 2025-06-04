import React, { useState } from "react";
import formatTime from "../../utils/formatTime";
import ReactionPopup from "../Reaction/ReactionPopup";
import { getOwnProfile } from "../../services/accountService";

const CommentSection = ({ postId, commentCount, onCommentCountChange }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      fullName: "User 1",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
      content: "This is a great post!",
      createAt: "2025-05-30T22:05:00Z",
      parentCommentId: null,
      parentFullName: null,
      likes: 5,
      reactionType: null,
    },
    {
      id: 2,
      fullName: "User 2",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
      content: "Thanks for sharing!",
      createAt: "2025-05-30T22:10:00Z",
      parentCommentId: null,
      parentFullName: null,
      likes: 3,
      reactionType: null,
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState({ id: null, fullName: null });
  const [newReply, setNewReply] = useState("");
  const [hoveredCommentId, setHoveredCommentId] = useState(null);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };


  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const profileData = await getOwnProfile();

      const newCommentObj = {
        id: comments.length + 1,
        fullName: profileData.data.fullName,
        avatar: profileData.data.avatar,
        content: newComment,
        createAt: new Date().toISOString(),
        parentCommentId: null,
        parentFullName: null,
        likes: 0,
        reactionType: null,
      };

      setComments([...comments, newCommentObj]);
      setNewComment("");
      onCommentCountChange(commentCount + 1);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };


  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    try {
      const profileData = await getOwnProfile();
      const newReplyObj = {
        id: comments.length + 1,
        fullName: profileData.data.fullName,
        avatar: profileData.data.avatar,
        content: newReply,
        createAt: new Date().toISOString(),
        parentCommentId: replyComment.id,
        parentFullName: replyComment.fullName,
        likes: 0,
        reactionType: null,
      };
      setComments([...comments, newReplyObj]);
      setNewReply("");
      setReplyComment({ id: null, fullName: null });
      onCommentCountChange(commentCount + 1);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const handleReplyClick = (commentId, fullName) => {
    setReplyComment({ id: commentId, fullName });
  };

  const handleReact = (commentId, reaction) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
            ...comment,
            likes: comment.reactionType ? comment.likes : comment.likes + 1,
            reactionType: reaction,
          }
          : comment
      )
    );
    setHoveredCommentId(null);
  };

  // Hàm render một comment
  const renderComment = (comment) => (
    <div key={comment.id} className="flex items-start gap-2">
      <img
        src={comment.avatar}
        alt={comment.fullName}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm text-gray-800">
              {comment.fullName}
              {comment.parentCommentId && (
                <span className="text-blue-500 mx-1">
                  ► {comment.parentFullName}
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500">{formatTime(comment.createAt)}</p>
          </div>
          <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
        </div>
        <div className="flex items-center gap-3 mt-2 comment-actions">
          <div
            className="relative"
            onMouseEnter={() => setHoveredCommentId(comment.id)}
            onMouseLeave={() => setHoveredCommentId(null)}
          >
            <button className="text-sm text-gray-500 hover:text-blue-500">
              <i className="fas fa-thumbs-up mr-1"></i> Like{" "}
              {comment.likes > 0 && `(${comment.likes})`}
            </button>
            {hoveredCommentId === comment.id && (
              <ReactionPopup onReact={(reaction) => handleReact(comment.id, reaction)} />
            )}
          </div>
          <button
            className="text-sm text-gray-500 hover:text-blue-500"
            onClick={() => handleReplyClick(comment.id, comment.fullName)}
          >
            Reply
          </button>
        </div>
        {replyComment.id === comment.id && (
          <form onSubmit={handleSubmitReply} className="mt-2 flex items-center gap-2 comment-input">
            <input
              type="text"
              value={newReply}
              onChange={handleReplyChange}
              placeholder={`Reply to ${comment.fullName}...`}
              className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );

  // Sắp xếp comments theo thời gian (mới nhất ở dưới cùng)
  const sortedComments = [...comments].sort(
    (b, a) => new Date(a.createAt) - new Date(b.createAt)
  );

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => renderComment(comment))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>
      <form onSubmit={handleSubmitComment} className="mt-4 flex items-center gap-2 comment-input">
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default CommentSection;