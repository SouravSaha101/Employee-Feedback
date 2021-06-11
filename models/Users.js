const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersData = new Schema({
  name: String,
  email: String,
  employeeId: Number,
  role: String,
  accessLevel: Number,
  phoneNo: Number,
  createdOn: Date,
});

mongoose.model("users", usersData);
