const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    discription: { type: String },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, required: true },
    queueSequence: { type: Number, default: 0 },
    currentSequence: { type: Number, default: 0 },
    prefix: { type: String, required: true },
    digit: { type: Number, default: 4 },
    minSeat: { type: Number, default: 1 },
    isActived: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QueueRestaurant', schema);
