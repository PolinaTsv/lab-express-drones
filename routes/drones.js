const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model.js");

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((allDrones) => {
      console.log("Retrieved drones from DB:", allDrones);
      res.render("drones/list.hbs", { allDrones });
    })
    .catch((err) => {
      console.log("Error while getting the drones from the DB: ", error);
      next(err);
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
