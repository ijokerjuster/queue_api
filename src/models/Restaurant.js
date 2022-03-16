const mongoose = require("mongoose");

const QueueGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    discription: { type: String },
    queueSequence: { type: Number, default: 0 },
    currentSequence: { type: Number, default: 0 },
    prefix: { type: String, required: true },
    digit: { type: Number, default: 4 },
    minSeat: { type: Number, default: 1 },
    isActived: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nameSearch: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    phone: { type: String },
    coordinates: { type: [Number], defaut: [] },
    isActived: { type: Boolean, default: true },
    queueGroups: { type: [QueueGroupSchema], default: [{
      name: 'Default',
      prefix: 'A',
    }] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", schema);
