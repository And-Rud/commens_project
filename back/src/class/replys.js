const { Comments } = require("./comments");

class Replys {
  static #list = [];
  static count = 1;

  constructor(username, text, email, homepage, commentIndex) {
    this.id = Replys.count++;
    this.username = username;
    this.email = email;
    this.homepage = homepage;
    this.text = text;
    this.previousText = text;
    this.commentIndex = commentIndex;
    this.date = new Date().getTime();
  }

  static create({ username, text, email, homepage, commentIndex }) {
    const newReply = new Replys(username, text, email, homepage, commentIndex);
    const currentComment = Comments.getById(Number(commentIndex));
    if (currentComment.reply.length === 0) {
      newReply.previousText = currentComment.text;
    } else {
      newReply.previousText =
        currentComment.reply[currentComment.reply.length - 1].text;
    }
    // currentComment.reply[0].previousText = currentComment.text;

    console.log("newReply", newReply);

    currentComment.reply.push(newReply);

    this.#list.push(newReply);
    // if (!newReply.previousText) {
    //   newReply.previousText =
    //     currentComment.reply[currentComment.reply.length - 1].text;
    // } else {
    // }

    console.log("list", this.#list);
    return newReply;
  }

  static getById(id) {
    return this.#list.find((item) => item.id === Number(id)) || null;
  }

  static getList = () => this.#list;
}

module.exports = {
  Replys,
};
