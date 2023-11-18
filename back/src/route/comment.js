// Підключаємо технологію express для back-end сервера
const express = require("express");
const { Comments } = require("../class/comments");
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router();
//======================================================
router.get("/comments", function (req, res) {
  let comments = Comments.getList();
  console.log("comments", comments);
  if (comments) {
    return res.json(comments);
  } else {
    return res.status(400).json({
      message: error.message,
    });
  }
});
//===============================================
router.post("/comments", function (req, res) {
  const { username, email, homepage, text } = req.body;
  console.log("req.body", req.body);
  if (!username || !email || !text) {
    return res.status(400).json({
      message: "Помилка. ОБовязкові поля відсутні",
    });
  }

  try {
    let comment = Comments.create({ username, email, homepage, text });
    console.log("comment", comment);
    res.status(200).json({
      message: "Ви зняли кошти",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});
//================================================
router.get("/comment", function (req, res) {
  const id = req.query.id;
  console.log("id", id);

  if (!id) {
    return res.status(400).json({
      message: "Потрібно передати ID коментаря",
    });
  }

  let comment = Comments.getById(Number(id));

  if (!comment) {
    return res.status(400).json({
      message: "Коментар з таким ID не існує",
    });
  }

  console.log("comments", comment);
  if (comment) {
    return res.json(comment);
  } else {
    return res.status(400).json({
      message: error.message,
    });
  }
});
//================================================
router.post("/comment", function (req, res) {
  const { username, email, homepage, text } = req.body;
  console.log("req.body", req.body);
  if (!username || !email || !text) {
    return res.status(400).json({
      message: "Помилка. ОБовязкові поля відсутні",
    });
  }

  try {
    let comment = Comments.create({ username, email, homepage, text });
    console.log("comment", comment);
    res.status(200).json({
      message: "Ви зняли кошти",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});
//================================================
// Підключаємо роутер до бек-енду
module.exports = router;
