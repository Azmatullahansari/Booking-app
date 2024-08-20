const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomsNumber: {
    type: [
      {
        number: Number,
        unavailableDates: [Date],
      },
    ],
    required: true,
  },
});
module.exports = mongoose.model("Room", roomSchema);
