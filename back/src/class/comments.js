class Comments {
  static #list = [];
  static count = 1;

  constructor(username, text, email, homepage, reply) {
    this.id = Comments.count++;
    this.username = username;
    this.email = email;
    this.homepage = homepage;
    this.text = text;
    this.date = new Date().getTime();
    this.reply = [];
  }

  static create({ username, text, email, homepage, reply }) {
    const newComments = new Comments(username, text, email, homepage);
    console.log("newPost", newComments);

    // if () {
    //   comment.reply.push(newComments);
    //   console.log(comment);
    // } else {
    //   this.#list.push(newComments);
    // }
    this.#list.push(newComments);
    console.log("list", this.#list);
    return newComments;
  }

  static getById(id) {
    return this.#list.find((item) => item.id === Number(id)) || null;
  }

  static getList = () => this.#list.reverse();
}

module.exports = {
  Comments,
};
