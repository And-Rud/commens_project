// import React from "react";
// import "./Comment.css";
// import Dates from "../../component/Date/Dates";

// const Comment = ({ onClick, item }) => {
//   return (
//     <div>
//       {item ? (
//         <div onClick={onClick} className="comment__container">
//           <header className="comment__header">
//             <img width={35} src="./png/ava.png" alt="Avatar" />
//             <span>{item.username}</span>
//             <Dates time={item.date} />
//             <div className="comment__icon">
//               <img width={15} src="/png/hash.png" alt="Diez" />
//               <img width={15} src="/png/label.png" alt="Diez" />
//               <img width={15} src="/png/chair.png" alt="Diez" />
//               <img width={15} src="/png/circle.png" alt="Diez" />
//             </div>
//             <div className="comment__arrow">
//               <img width={15} src="/png/a_up.png" alt="Diez" />0
//               <img width={15} src="/png/a_down.png" alt="Diez" />
//             </div>
//           </header>
//           <section className="comment__text">{item.text}</section>
//         </div>
//       ) : (
//         <div></div>
//       )}
//     </div>
//   );
// };

// export default Comment;

import React, { useState } from "react";

const Comment = ({ comment, onReply, level = 1 }) => {
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    onReply(replyText);
    setReplyText("");
  };

  const replyStyle = {
    marginLeft: `${level * 20}px`,
  };

  return (
    <div className="comment" style={replyStyle}>
      <div className="comment-text">
        {comment.previousText ? (
          <div>|{comment.previousText}</div>
        ) : (
          <span></span>
        )}
        {comment.text}
      </div>
      <div className="comment-actions">
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Reply..."
        />
        <button onClick={handleReply}>Reply</button>
      </div>
      <div className="comment-replies">
        {comment.replies &&
          comment.replies.map((reply, index) => (
            <Comment
              key={index}
              comment={reply}
              onReply={onReply}
              level={(level = level + 1)}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
