const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: String,
    duration: Number,
    date: Date,
  },
  
);

LogSchema.virtual("logItem").get(function () {
  return {
    description: this.description,
    duration: this.duration,
    date: this.date.toDateString(),
  };
});

module.exports = mongoose.model("Log", LogSchema);
