const mongoose = require("mongoose");
const { Schema } = mongoose;

const userCredentialSchema = new Schema({
  password: String,
  employeeId: Number,
  email: String,
});

mongoose.model("usersAuth", userCredentialSchema);
