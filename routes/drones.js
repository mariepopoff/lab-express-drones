const express = require('express');
const router = express.Router();


// require the Drone model here
const DroneModel= require("./../models/Drone.model.js");

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  DroneModel.find()
  .then((drones) => res.render("drones/list.hbs", {drones}))
.catch((error) => console.error("fatal error"))
})


router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  DroneModel.create(req.body)
  .then((ok) => res.redirect("/drones"))
  .catch((error) => {
    console.error("fatal error");
    res.redirect("/drones/create")
  })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  DroneModel.findById(req.params.id)
  .then((drone) => res.render("drones/update-form.hbs", {drone}))
  .catch((error) => console.error('fatal error'))
  
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  DroneModel.findByIdAndUpdate(req.params.id, req.body)
  .then((drone) => res.redirect("/drones"))
  .catch((error) => {
    console.log("fatal error");
    res.redirect(`/drones/${req.params.id}/edit`)
  })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone

  DroneModel.findByIdAndRemove(req.params.id)
  .then((ok) => res.redirect("/drones"))
  .catch((error) => {
    console.log("fatal error");
  })
});



module.exports = router;
