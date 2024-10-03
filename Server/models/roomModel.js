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
  /*
  img: {
    type: [String],
  },*/
  roomsNumber: {
    type: [
      {
        number: {
          type: Number,
        },
        unavailableDates: {
          type: [Date],
          default: [],
        },
        _id: false,
      },
    ],
    required: true,
  },
});
module.exports = mongoose.model("Room", roomSchema);
