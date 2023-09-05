const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model.js");

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  // line above means the 3 lines below:
  // const name = req.body.name;
  // const propellers = req.body.propellers;
  // const maxSpeed = req.body.maxSpeed;
  Drone.create({ name, propellers, maxSpeed })
    .then(() => res.redirect("/drones"))
    .catch((err) => next(err));
});

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((allDrones) => {
      // console.log("Retrieved drones from DB:", allDrones);
      res.render("drones/list.hbs", { allDrones });
    })
    .catch((err) => {
      //console.log("Error while getting the drones from the DB: ", err);
      next(err);
    });
});

//Playing around
// router.get("/drones", (req, res, next) => {
//   // Iteration #2: List the drones
//   console.log(req.query);
//   Drone.find()
//     .then((allDrones) => {
//       const newDrones = allDrones.filter(
//         (drone) => drone.maxSpeed > req.query.maxSpeed
//       );
//       // console.log("Retrieved drones from DB:", allDrones);
//       console.log(newDrones);
//       res.render("drones/list.hbs", { allDrones: newDrones });
//     })
//     .catch((err) => {
//       console.log("Error while getting the drones from the DB: ", error);
//       next(err);
//     });
// });
// router.post("/responder", (req, res, next) => {
//   console.log(req);
//   const responseMessage = { message: "hi" };
//   res.send(req.body);
// });

router.get("/drones/:droneID/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { droneID } = req.params;
  Drone.findById(droneID)
    .then((droneToEdit) => {
      console.log(droneToEdit);
      res.render("drones/update-form.hbs", { droneToEdit });
    })
    .catch((error) => next(error));
});

// router.post("/drones/:id/edit", (req, res, next) => {
//   // Iteration #4: Update the drone
//   const { name, propellers, maxSpeed } = req.body;
//   const { droneID } = req.params;
//   let updatedDrone;
//   Drone.findByIdAndUpdate(
//     droneID,
//     { name, propellers, maxSpeed },
//     { new: true },
//   )
//     .then((newDrone) =>
//     updatedDrone = newDrone,
//     console.log(newDrone),
//     res.redirect(`/drones/${newDrone}`))
//     .catch((error) => {
//       console.error(error);
//       res.redirect("/drones/update-form.hbs");
//     });
// });

router.post("/drones/:droneID/edit", async (req, res, next) => {
  try {
    const { name, propellers, maxSpeed } = req.body;
    const { droneID } = req.params;
    await Drone.findByIdAndUpdate(
      droneID,
      { name, propellers, maxSpeed },
      { new: true }
    );
    res.redirect(`/drones`);
  } catch (error) {
    console.error(error);
    res.redirect("/drones/update-form.hbs");
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    const { id } = req.params;
    await Drone.findByIdAndDelete(id);
    res.redirect("/drones");
  } catch (error) {
    console.error(error);
    res.redirect("/drones");
  }
});

// router.post("/drones/:id/delete", async (req, res, next) => {
//   // Iteration #5: Delete the drone
//   const { id } = req.params;

//   Book.findByIdAndDelete(id)
//     .then(() => res.redirect("/drones"))
//     .catch((error) => next(error));
// });

module.exports = router;
