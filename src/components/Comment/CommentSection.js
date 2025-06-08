import React, { useState, useEffect } from "react";
import { getOwnProfile } from "../../services/accountService";
import instance from "../../Axios/axiosConfig";
import { toast, Bounce } from "react-toastify";
import CommentItem from "./CommentItem";

const CommentSection = ({ postId, commentCount, onCommentCountChange }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [menuOpenCommentId, setMenuOpenCommentId] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!postId) {
          throw new Error("postId không hợp lệ");
        }
        const response = await instance.get(`/api/comment/all-by-post/${postId}`);
        console.log("API comments response:", response.data);

        if (response.data.success) {
          const commentData = Array.isArray(response.data.data) ? response.data.data : [];
          const formattedComments = commentData.map((item) => ({
            CommentId: item.comment.commentId,
            AccId: item.comment.accId,
            PostId: item.comment.postId,
            Content: item.comment.content,
            CreateAt: item.comment.createAt,
            IsDeleted: item.comment.isDeleted,
            fullName: item.account?.fullName || "Unknown User",
            avatar: item.account?.avatar || "https://via.placeholder.com/40",
            likes: item.reactionsOfComment?.length || 0,
            reactionType: null,
          }));
          setComments(formattedComments);
          onCommentCountChange(response.data.count || formattedComments.length);
        } else {
          throw new Error(response.data.message || "Cannot load comments!");
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        toast.error(error.message || "Cannot load comments!", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
        setComments([]);
      }
    };

    const storage = localStorage.getItem("accId") ? localStorage : sessionStorage;
    const accId = storage.getItem("accId");
    if (accId) {
      setUserId(accId);
    } else {
      toast.error("Please log in!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }

    if (postId) {
      fetchComments();
    } else {
      console.warn("postId is undefined or null");
      setComments([]);
    }
  }, [postId, onCommentCountChange]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await instance.post("/api/comment/create", {
        PostId: postId,
        Content: newComment,
      });
      console.log("Create comment response:", response.data);

      if (response.data.success) {
        const newCommentData = response.data.data;
        const profile = await getOwnProfile();
        console.log("New comment profile:", profile.data);
        const formattedNewComment = {
          CommentId: newCommentData.commentId,
          AccId: newCommentData.accId,
          PostId: newCommentData.postId,
          Content: newCommentData.content,
          CreateAt: newCommentData.createAt,
          IsDeleted: newCommentData.isDeleted,
          fullName: profile.data.fullName || "Unknown User",
          avatar: profile.data.avatar || "https://via.placeholder.com/40",
          likes: 0,
          reactionType: null,
        };
        setComments([...comments, formattedNewComment]);
        setNewComment("");
        onCommentCountChange(commentCount + 1);
      } else {
        throw new Error(response.data.message || "Cannot create comment");
      }
    } catch (error) {
      console.error("Failed to create comment:", error);
      toast.error(error.message || "Cannot create comment", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.CommentId);
    setEditContent(comment.Content);
    setMenuOpenCommentId(null);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const response = await instance.put(`/api/comment/update/${commentId}`, {
        postId: postId,
        content: editContent,
      });
      console.log("Update comment response:", response.data);

      if (response.data.success) {
        setComments(
          comments.map((comment) =>
            comment.CommentId === commentId
              ? { ...comment, Content: editContent }
              : comment
          )
        );
        setEditingCommentId(null);
        setEditContent("");
      } else {
        throw new Error(response.data.message || "Cannot update comment");
      }
    } catch (error) {
      console.error("Failed to update comment:", error);
      toast.error(error.message || "Cannot update comment", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await instance.delete(`/api/comment/delete/${commentId}`);
      console.log("Delete comment response:", response.data);

      if (response.data.success) {
        setComments(comments.filter((comment) => comment.CommentId !== commentId));
        onCommentCountChange(commentCount - 1);
        setMenuOpenCommentId(null);
      } else {
        throw new Error(response.data.message || "Cannot delete comment");
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error(error.message || "Cannot delete comment", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }
  };

  const toggleMenu = (commentId) => {
    setMenuOpenCommentId(menuOpenCommentId === commentId ? null : commentId);
  };

  const sortedComments = [...comments].sort(
    (b, a) => new Date(a.CreateAt) - new Date(b.CreateAt)
  );

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <CommentItem
              key={comment.CommentId}
              comment={comment}
              userId={userId}
              editingCommentId={editingCommentId}
              editContent={editContent}
              setEditingCommentId={setEditingCommentId}
              setEditContent={setEditContent}
              menuOpenCommentId={menuOpenCommentId}
              toggleMenu={toggleMenu}
              handleUpdateComment={handleUpdateComment}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
              hoveredCommentId={hoveredCommentId}
              setHoveredCommentId={setHoveredCommentId}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>
      <form
        onSubmit={handleSubmitComment}
        className="mt-4 flex items-center gap-2 comment-input"
      >
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết bình luận..."
          className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Gửi
        </button>
      </form>
    </div>
  );
};

export default CommentSection;