const mongoose = require("mongoose");
const UserAuth = mongoose.model("usersAuth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (app) => {
  app.post("/api/login", async (req, res) => {
    try {
      let user = await UserAuth.findOne({ email: req.body.email });
      console.log(user);
      if (!user)
        return res.status(400).json({ message: "User is not registered" });

      let validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validPassword) {
        const token = jwt.sign({ employeeId: user.employeeId }, keys.jwtToken);
        res
          .status(200)
          .header("auth-token", token)
          .send({ message: "Login Successful" });
      } else {
        res.status(401).send({ message: "Login Failed, Check credentials" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
};
