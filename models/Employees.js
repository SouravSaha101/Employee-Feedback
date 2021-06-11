const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeesData = new Schema({
  employeeId: Number,
  Attendance: Number,
  LateComing: Number,
  Reason: String,
  Behaviour: Number,
  Work: Number,
  Culture: Number,
});

mongoose.model("users", employeesData);
