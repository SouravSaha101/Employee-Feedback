const mongoose = require("mongoose");

module.exports = (app) => {
  app.get("/api/logout", async (req, res) => {
    try {
      res.status(200).json({ message: "Logout Successful" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
};
