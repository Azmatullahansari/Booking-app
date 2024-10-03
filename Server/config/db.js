const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to database ${con.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
