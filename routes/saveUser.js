const mongoose = require("mongoose");
const User = mongoose.model("users");
const UserAuth = mongoose.model("usersAuth");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  app.post("/api/save-user", async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      let userA = await User.find().sort({ _id: -1 }).limit(1);
      let newEmployeeID = userA.length ? userA[0].employeeId + 1 : 1;
      let accessLevel =
        req.body.role === "HR" ? 1 : req.body.role === "Employee" ? 2 : 3;
      if (user) res.status(200).json({ message: "User is already registered" });
      if (!user) {
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.password, salt);

        let newUser = await User.create({
          email: req.body.email,
          name: req.body.name,
          employeeId: newEmployeeID,
          role: req.body.role,
          phoneNo: req.body.phoneNo,
          accessLevel: accessLevel,
          createdOn: Date.now(),
        });
        let newUserAuth = await UserAuth.create({
          password: hashPassword,
          employeeId: newEmployeeID,
          email: req.body.email,
        });
        res.status(201).json({
          message: `User registered successfully: Employee ID = ${newEmployeeID}`,
        });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
};
