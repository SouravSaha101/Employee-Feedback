const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  app.get("/api/employee", async (req, res) => {
    try {
      let user = await User.find({ accessLevel: 2 });
      if (!user)
        return res.status(400).json({ message: "No employee is registered" });

      if (user) {
        res.status(200).send({ user });
      } else {
        res.status(401).send({ message: "Error" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
};
