import "./Comment.css";
import Dates from "../../component/Date/Dates";

// const Comment = ({ onClick, item }) => {
//   return (
//     <div>
//       {item ? (

//       ) : (
//         <div></div>
//       )}
//     </div>
//   );
// };

// export default Comment;

import React, { useState } from "react";
import MyInput from "../../component/MyInput/MyInput";
import MyButton from "../../component/MyButton/MyButton";

const Comment = ({ comment, onReply, level = 1 }) => {
  const [reply, setReply] = useState({
    username: "",
    email: "",
    homepage: "",
    text: "",
  });
  const [isOpenReply, setIsOpenReply] = useState(false);

  const handleReply = () => {
    onReply(reply);
    setReply({
      username: "",
      email: "",
      homepage: "",
      text: "",
    });
    setIsOpenReply(!isOpenReply);
  };

  const replyStyle = {
    marginLeft: `${level * 20}px`,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReply({ ...reply, [name]: value });
  };

  const handleReplyClick = () => {
    setIsOpenReply(!isOpenReply);
  };

  return (
    <div className="comment" style={replyStyle}>
      <div className="comment-text" onClick={handleReplyClick}>
        <div className="comment__container">
          <header className="comment__header">
            <img width={35} src="./png/ava.png" alt="Avatar" />
            <span>{comment.username}</span>
            <Dates time={comment.date} />
            <div className="comment__icon">
              <img width={15} src="/png/hash.png" alt="Diez" />
              <img width={15} src="/png/label.png" alt="Diez" />
              <img width={15} src="/png/chair.png" alt="Diez" />
              <img width={15} src="/png/circle.png" alt="Diez" />
            </div>
            <div className="comment__arrow">
              <img width={15} src="/png/a_up.png" alt="Diez" />0
              <img width={15} src="/png/a_down.png" alt="Diez" />
            </div>
          </header>
          <section className="comment__text">
            {comment.previousText ? (
              <>
                <div>|{comment.previousText}</div>
                <div>-------------------------</div>
              </>
            ) : (
              <span></span>
            )}
            {comment.text}
          </section>
        </div>
      </div>
      {isOpenReply ? (
        <div className="reply__input">
          <MyInput
            type="text"
            text="Username"
            name="username"
            value={reply.username}
            onChange={handleChange}
            placeholder="Add a username"
            isRequired={true}
          />
          <MyInput
            text="Email"
            type="email"
            name="email"
            value={reply.email}
            placeholder="Add a email"
            onChange={handleChange}
            isRequired={true}
          />
          <MyInput
            text="Homepage"
            type="text"
            name="homepage"
            value={reply.homepage}
            onChange={handleChange}
            placeholder="Add a homepage"
            isRequired={false}
          />
          <label htmlFor="text">Comment</label>
          <textarea
            name="text"
            value={reply.text}
            onChange={handleChange}
            placeholder="Add a comment..."
            className="textarea__input"
            required
          />
          <div className="button__section__reply">
            <MyButton onClick={handleReply}>Reply</MyButton>
          </div>
        </div>
      ) : (
        <span></span>
      )}
      <div className="comment-replies">
        {comment.reply &&
          comment.reply.map((reply, index) => (
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
