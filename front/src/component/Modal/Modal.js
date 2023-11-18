import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";
import MyButton from "../MyButton/MyButton";
import MyInput from "../MyInput/MyInput";

const ModalComponent = ({ isModalToggle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [comment, setComment] = useState({
    username: "",
    email: "",
    homepage: "",
    text: "",
  });
  console.log(comment);

  useEffect(() => {
    setIsModalOpen(isModalToggle);
  }, [isModalToggle]);

  const isFormValid = () => {
    if (
      comment.username !== "" &&
      comment.email !== "" &&
      comment.text !== ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const showModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4200/comments",
        comment
      );
      const data = response.data;
      console.log("response", response.data);
      console.log("comment", comment);

      if (response) {
        console.log("response", response);
      } else {
        console.log("response", response);
      }
      console.log("Відповідь від сервера:", data);
    } catch (error) {
      console.log("Помилка відправки запиту:", error);
      setMessage(true);
      setTimeout(() => setMessage(false), 3000);
    }
    setIsModalOpen(!isModalToggle);
    setComment({
      username: "",
      email: "",
      homepage: "",
      text: "",
    });
  };

  const handleCancel = () => {
    let isValidate = isFormValid();
    setIsModalOpen(isValidate);
  };

  const handleCancel2 = () => {
    setIsModalOpen(!isModalToggle);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  return (
    <div>
      <div
        className="modal__container"
        style={{ display: isModalToggle ? "block" : "none" }}
      >
        <div className="modal__content">
          <form onSubmit={handleClick} className="modal__form">
            <MyInput
              onChange={handleChange}
              value={comment.username}
              name="username"
              type="text"
              text="Username"
              isRequired={true}
            />
            <MyInput
              onChange={handleChange}
              value={comment.email}
              name="email"
              type="email"
              text="Email"
              isRequired={true}
              м
            />
            <MyInput
              onChange={handleChange}
              value={comment.homepage}
              name="homepage"
              type="text"
              text="Homepage"
              isRequired={false}
            />
            <MyInput
              onChange={handleChange}
              value={comment.text}
              name="text"
              type="text"
              text="Text"
              isRequired={true}
            />
            <div className="button_container">
              <MyButton
                type="button"
                className={`button__light`}
                onClick={handleCancel2}
              >
                Cancel
              </MyButton>
              <MyButton
                type="submit"
                className={`button__light`}
                onClick={handleCancel}
                disabled={() => isFormValid()}
              >
                Submit
              </MyButton>
            </div>
          </form>
        </div>
      </div>
    </div>

    // <>
    //   <Button type="primary" onClick={showModal}>
    //     Create Comment
    //   </Button>
    //   <Modal
    //     title="Create comment"
    //     open={isModalOpen}
    //     onOk={(e) => handleOk(e)}
    //     onCancel={handleCancel}
    //   >
    //     <Form>
    //       <Form.Item
    //         label="Username"
    //         name="username"
    //         rules={[
    //           {
    //             required: true,
    //           },
    //         ]}
    //       >
    //         <Input
    //           placeholder="input your username"
    //           name="username"
    //           type="text"
    //           value={comment.username}
    //           onChange={handleChange}
    //         />
    //       </Form.Item>
    //       <Form.Item
    //         label="Email"
    //         name="email"
    //         rules={[
    //           {
    //             required: true,
    //           },
    //         ]}
    //       >
    //         <Input
    //           placeholder="input your email"
    //           name="email"
    //           type="email"
    //           value={comment.email}
    //           onChange={handleChange}
    //         />
    //       </Form.Item>
    //       <Form.Item
    //         label="Home page"
    //         name="homepage"
    //         rules={[
    //           {
    //             required: false,
    //           },
    //         ]}
    //       >
    //         <Input
    //           placeholder="input your home page"
    //           name="homepage"
    //           type="text"
    //           value={comment.homepage}
    //           onChange={handleChange}
    //         />
    //       </Form.Item>
    //       <Form.Item
    //         label="Text"
    //         name="text"
    //         rules={[
    //           {
    //             required: true,
    //           },
    //         ]}
    //       >
    //         <TextArea
    //           rows={4}
    //           placeholder="maxLength is 6"
    //           maxLength={6}
    //           name="text"
    //           type="text"
    //           value={comment.text}
    //           onChange={handleChange}
    //         />
    //       </Form.Item>
    //     </Form>
    //   </Modal>
    //</>
  );
};
export default ModalComponent;
