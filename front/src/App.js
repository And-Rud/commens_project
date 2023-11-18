import React, { useState } from "react";
import Comment from "./container/Comment/Comment";

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [previousText, setPreviousText] = useState("");

  console.log(comments);

  const handleReply = (commentIndex, replyText) => {
    const updatedComments = [...comments];
    const commentToReply = updatedComments[commentIndex];

    const newReply = {
      text: replyText,
      previousText: previousText, // Зберігаємо попередній текст
      replies: [],
    };

    commentToReply.replies.push(newReply);
    setPreviousText(replyText); // Оновлюємо попередній текст для наступного виклику
    setComments(updatedComments);
  };

  const handleAddComment = () => {
    setComments([...comments, { text: newComment, replies: [] }]);
    setNewComment("");
    setPreviousText(newComment);
  };

  return (
    <div className="comments-section">
      <h2>Comments</h2>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Add Comment</button>

      {comments.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          onReply={(replyText) => handleReply(index, replyText)}
        />
      ))}
    </div>
  );
};

export default CommentsSection;
