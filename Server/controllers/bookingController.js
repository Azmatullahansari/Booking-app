const Booking = require("../models/bookingModel");
//get bookings
const getBookings = async (req, res) => {
  try {
    const booking = await Booking.find();
    if (!booking) {
      res.status(400);
      throw new Error("cannot find Bookings");
    }
    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};
// create bookings
const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);
    if (!booking) {
      res.status(400);
      throw new Error("booking not created");
    }
    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};
// get single booking
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(400);
      throw new Error("booking not found");
    }
    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};
// updated bookings
const updatedBookings = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedBooking) {
      res.ststus(400);
      throw new Error("booking not updated");
    }
    return res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};
// delete booking
const deletedBookings = async (req, res, next) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      res.status(400);
      throw new Error("bookings deleted");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getBookings,
  createBooking,
  updatedBookings,
  deletedBookings,
  getBooking,
};
