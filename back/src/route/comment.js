// Підключаємо технологію express для back-end сервера
const express = require("express");
const multer = require("multer");
// const upload = require("../middleware/upload");
const upload = multer({ dest: "uploads/" });
const { Comments } = require("../class/comments");
const { Replys } = require("../class/replys");
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
router.post("/comments", upload.single("image"), function (req, res, next) {
  const { username, email, homepage, text } = req.body;
  console.log("req.f", req.file);
  console.log("req.body", req.body);
  const image = req.file;

  if (!username || !email || !text) {
    return res.status(400).json({
      message: "Помилка. ОБовязкові поля відсутні",
    });
  }

  try {
    let comments = Comments.create({
      username,
      email,
      homepage,
      text,
      image: image.filename,
    });
    console.log("comments", comments);
    res.status(200).json({
      message: "Коментар створений",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});
//================================================
router.get("/reply", function (req, res) {
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
router.post("/reply", function (req, res) {
  const { username, email, homepage, text, commentIndex } = req.body;
  console.log("req.body.reply", req.body);
  if (!username || !email || !text || !commentIndex) {
    return res.status(400).json({
      message: "Помилка. ОБовязкові поля відсутні",
    });
  }

  try {
    let reply = Replys.create({
      username,
      email,
      homepage,
      text,
      commentIndex,
    });
    console.log("reply", reply);
    res.status(200).json({
      message: "Відповідь на коментар створена",
      reply,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});
//================================================

//================================================
// Підключаємо роутер до бек-енду
module.exports = router;
