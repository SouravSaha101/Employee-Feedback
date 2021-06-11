const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/api/set-rating", async (req, res) => {
    try {
      console.log("HERE++++++++++++++++++++++++");
      let user = await User.updateOne(
        { employeeId: req.body.employeeId },
        {
          $set: {
            Attendence: req.body.Attendence,
            Behaviour: req.body.Behaviour,
            Culture: req.body.Culture,
            HREmpId: req.body.HREmpId,
            HRname: req.body.HRname,
            LateComing: req.body.LateComing,
            Reason: req.body.Reason,
            Work: req.body.Work,
          },
        }
      );
      console.log(user);
      res.status(200).json({ message: "HURRAH" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
};
