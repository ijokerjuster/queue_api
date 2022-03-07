const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    phone: { type: String },
    coordinates: { type: [Number], defaut: [] },
    isActived: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', schema);
