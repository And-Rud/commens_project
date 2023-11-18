// Підключаємо роутер до бек-енду
const express = require("express");
const router = express.Router();

// Підключіть файли роутів
const comment = require("./comment");

// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
router.use("/", comment);

// Використовуйте інші файли роутів, якщо є

router.get("/", (req, res) => {
  res.status(200).json("Hello World");
});

// Експортуємо глобальний роутер
module.exports = router;
