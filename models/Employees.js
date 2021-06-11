const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeesData = new Schema({
  name: String,
  employeeId: Number,
  Attendence: Number,
  LateComing: Number,
  Reason: String,
  Behaviour: Number,
  Work: Number,
  Culture: Number,
  HRname: String,
  HREmpId: Number,
});

mongoose.model("users", employeesData);
