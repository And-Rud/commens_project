class Comments {
  static #list = [];
  static count = 1;

  constructor(username, text, email, homepage, image) {
    this.id = Comments.count++;
    this.username = username;
    this.email = email;
    this.homepage = homepage;
    this.image = image;
    this.text = text;
    this.date = new Date().getTime();
    this.reply = [];
  }

  static create({ username, text, email, homepage, image }) {
    const newComments = new Comments(username, text, email, homepage, image);

    this.#list.push(newComments);
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
