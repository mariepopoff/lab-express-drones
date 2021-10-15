// Iteration #1

const droneData = [
  { name: "Vicky", propellers: 4, maxSpeed: 15 },
  { name: "John", propellers: 6, maxSpeed: 13 },
  { name: "Billy", propellers: 8, maxSpeed: 20 },
];

const DroneModel = require("../models/Drone.model");
const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return DroneModel.deleteMany().then(() => {
      DroneModel.create(droneData)
        .then((droneData) => {
          console.log(
            droneData.length + " drones have been imported in the database"
          );
          mongoose.connection.close();
        })
        .catch((error) =>
          console.error("an error happened while seeding the database")
        );
    });
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
