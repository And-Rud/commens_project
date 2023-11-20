import React, { useState } from "react";

const DownloadImg = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = () => {
    onSubmit({ text, image });
    setText("");
    setImage(null);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your comment"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Submit Comment</button>
    </div>
  );
};

export default DownloadImg;
