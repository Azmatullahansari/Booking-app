const Room = require("../models/roomModel");
// get rooms
const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    if (!rooms) {
      res.status(400);
      throw new Error("rooms not found");
    }
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
//create a room
const createRoom = async (req, res, next) => {
  try {
    //todo validate data from user with joi
    const room = await Room.create(req.body);
    if (!room) {
      res.status(400);
      throw new Error("there was a problem creating");
    }
    return res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};
// get a single room
const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      res.status(400);
      throw new Error("room not found");
    }
    return res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};
// update rooms
const updatedRooms = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedRoom) {
      res.status(400);
      throw new Error("room not updated");
    }
    return res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
// delete rooms
const deletedRooms = async (req, res, next) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      res.status(400);
      throw new Error("room is not deleted");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};
module.exports = { getRooms, createRoom, getRoom, updatedRooms, deletedRooms };
