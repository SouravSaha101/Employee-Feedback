const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersData = new Schema({
  name: String,
  email: String,
  employeeId: Number,
  role: String,
  accessLevel: Number,
  phoneNo: Number,
  Attendance: Number,
  LateComing: Number,
  Reason: String,
  Behaviour: Number,
  Work: Number,
  Culture: Number,
  HRname: String,
  HREmpId: Number,
  createdOn: Date,
});

mongoose.model("users", usersData);
