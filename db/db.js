const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb+srv://jihye:12345@cluster0.5wymn3b.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "front-test",
  })
  .then(() => {
    console.log("db연결");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
