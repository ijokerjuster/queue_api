const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: { type: String, index: true, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    isActived: { type: String, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
