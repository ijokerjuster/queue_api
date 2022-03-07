const mongoose = require("mongoose");

const QueueStatus = {
  PENDING: "pending",
  SKIP: "skip",
  COMPLETE: "complete",
  CANCEL: "cancel",
  REJECT: "reject",
  EXPIRE: "expire",
};

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, required: true },
    queueRestaurantId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    sequence: { type: Number, required: true },
    seat: { type: Number, required: true },
    isActived: { type: Boolean, default: true },
    status: {
      type: String,
      enum: Object.values(QueueStatus),
      default: QueueStatus.PENDING,
    },
  },
  { timestamps: true }
);

schema.index(
  { restaurantId: 1, queueRestaurantId: 1, sequence: 1 },
  { unique: true }
);

module.exports = {
  Queue: mongoose.model("Queue", schema),
  QueueStatus,
}
