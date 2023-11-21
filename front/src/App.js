import React, { useEffect, useState } from "react";
import Comment from "./container/Comment/Comment";
import axios from "axios";
import "./App.css";
import MyInput from "./component/MyInput/MyInput";
import MyButton from "./component/MyButton/MyButton";
import MyAlert from "./component/MyAlert/MyAlert";

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    username: "",
    email: "",
    homepage: "",
    text: "",
  });
  const [formData, setFormData] = useState({ image: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [countComments, setCountComments] = useState(0);

  const calculateTotalComments = (comments) => {
    let count = comments.length || 0;
    comments.forEach((comment) => {
      if (comment.reply && comment.reply.length > 0) {
        count += calculateTotalComments(comment.reply);
      }
    });
    return count;
  };

  useEffect(() => {
    setTimeout(async () => {
      let res = await axios.get("http://localhost:4200/comments");
      setComments(res.data);
    }, 1000);
  }, [countComments]);

  const handleReply = (commentIndex, reply) => {
    const newReply = {
      username: reply.username,
      email: reply.email,
      homepage: reply.homepage,
      text: reply.text,
      commentIndex: commentIndex,
    };
    const fetch = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4200/reply",
          newReply
        );
        const data = response.data;
        console.log("response", response.data);
        console.log("comments", comments);

        if (response) {
          console.log("response", response);
        } else {
          console.log("response", response);
        }
        console.log("Відповідь від сервера:", data);
      } catch (error) {
        console.log("Помилка відправки запиту:", error);
      }
    };
    fetch();
    setCountComments(calculateTotalComments(comments));
  };

  const handleClick = async (event) => {
    event.preventDefault();
    console.log("formData.image", formData.image);
    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("username", newComment.username);
    formDataToSend.append("email", newComment.email);
    formDataToSend.append("homepage", newComment.homepage);
    formDataToSend.append("text", newComment.text);
    console.log("formDataToSend", formDataToSend);
    try {
      const response = await axios.post(
        "http://localhost:4200/comments",
        formDataToSend
      );
      const data = response.data;
      console.log("response", response.data);
      console.log("Відповідь від сервера:", data);
    } catch (error) {
      console.log("Помилка відправки запиту:", error);
    }
    setIsOpen(!isOpen);
    setCountComments(calculateTotalComments(comments));
    setNewComment({
      username: "",
      email: "",
      homepage: "",
      text: "",
    });
    setFormData({
      image: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });

    console.log(e.target.files);
  };

  const handleShowInput = () => {
    setIsOpen(!isOpen);
  };

  const handleRecieveData = async () => {
    try {
      const response = await axios.get("http://localhost:4200/comments");
      const data = response.data;
      console.log("response", response.data);
      setComments(response.data);
      console.log("comments", comments);

      if (response) {
        console.log("response", response);
      } else {
        console.log("response", response);
      }
      console.log("Відповідь від сервера:", data);
    } catch (error) {
      console.log("Помилка відправки запиту:", error);
    }
  };

  const sortByFieldName = (fieldName) => {
    const sortedData = [...comments].sort((a, b) => {
      const modifier = sortDirection === "asc" ? 1 : -1;
      const aValue =
        typeof a[fieldName] === "string"
          ? a[fieldName]
          : a[fieldName].toString();
      const bValue =
        typeof b[fieldName] === "string"
          ? b[fieldName]
          : b[fieldName].toString();
      return (
        modifier *
        aValue.localeCompare(bValue, undefined, { sensitivity: "base" })
      );
    });
    setComments(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="comments-section">
      <h2 className="page__title">Comments</h2>
      <div className="page__button__block">
        <MyButton onClick={handleShowInput}>Add Comment</MyButton>
        <MyButton onClick={handleRecieveData}>Recieve Comment</MyButton>
        <MyButton onClick={() => sortByFieldName("username")}>
          Sort Username
        </MyButton>
        <MyButton onClick={() => sortByFieldName("email")}>
          Sort E-mail
        </MyButton>
        <MyButton onClick={() => sortByFieldName("date")}>Sort Date</MyButton>
      </div>
      {isOpen ? (
        <form
          onSubmit={handleClick}
          className="comment__form"
          encType="multipart/form-data"
        >
          <MyInput
            type="text"
            text="Username"
            name="username"
            value={newComment.username}
            onChange={handleChange}
            placeholder="Add a username"
          />
          <MyInput
            text="Email"
            type="email"
            name="email"
            value={newComment.email}
            placeholder="Add a email"
            onChange={handleChange}
            isRequired={true}
          />
          <MyInput
            text="Homepage"
            type="text"
            name="homepage"
            value={newComment.homepage}
            onChange={handleChange}
            placeholder="Add a homepage"
            isRequired={false}
          />
          <label htmlFor="text">Comment</label>
          <textarea
            name="text"
            value={newComment.text}
            onChange={handleChange}
            placeholder="Add a comment..."
            className="textarea__input"
            required
          />
          <MyInput
            type="file"
            name="image"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
          <MyButton type="submit">Submit</MyButton>
        </form>
      ) : (
        <span></span>
      )}
      {countComments < 25 ? (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={(reply) => handleReply(comment.id, reply)}
          />
        ))
      ) : (
        <MyAlert children="Коментарів більше ніж 25" />
      )}
    </div>
  );
};

export default CommentsSection;
