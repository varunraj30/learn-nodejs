const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
async function connectToDb(url) {
  await mongoose.connect(url);
}

module.exports = { connectToDb };
