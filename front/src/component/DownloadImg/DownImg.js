import React, { useState } from "react";
import MyButton from "../MyButton/MyButton";
import MyInput from "../MyInput/MyInput";
import "./DownImg.css";

const DownloadImg = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  //   const handleTextChange = (e) => {
  //     setText(e.target.value);
  //   };

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
    <div className="download__image__section">
      <MyInput type="file" accept="image/*" onChange={handleImageChange} />
      <MyButton onClick={handleSubmit}>Download image</MyButton>
    </div>
  );
};

export default DownloadImg;
