const router = require("express").Router()

const db = require("../models")

router.get("/", (req, res) => {
  db.Car.find()
    .then((CarArray) => {
      console.log(CarArray)
      res.send(CarArray)
    })
    .catch((error) => {
      console.error(error)
      res.status(503).send({ message: "Did you forget to feed your mongo?" })
    })
})

router.get("/:id", (req, res) => {
  db.Car.findById(req.params.id)
    .then((foundCar) => {
      if (foundCar) {
        res.send(foundCar)
      } else {
        res.status(404).send({ message: "Resource not located" })
      }
    })
    .catch((error) => {
      console.error(error)
      res.status(503).send({ message: "Did you forget to feed your mongo?" })
    })
})

router.post("/", (req, res) => {
  db.Car.create(req.body)
    .then((createdCar) => {
      res.status(201).send(createdCar)
    })
    .catch((error) => {
      console.error(error, "Error while creating Car")
      if (error.name === "Validation Error") {
        res.status(406).send({ message: "Validation Error" })
      } else {
        res.status(503).send({ message: "Did you forget to feed your mongo?" })
      }
    })
})

router.put("/:id", (req, res) => {
    db.Car.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    )
      .then(updatedCar => {
        res.send(updatedCar)
      })
      .catch((error) => {
        console.error(error)
        res.status(503).send({ message: "Did you forget to feed your mongo?" })
      })
  })

  router.delete("/:id", (req, res) => {
    db.Car.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).send()
      })
      .catch((error) => {
        console.error(error)
        res.status(503).send({ message: "Did you forget to feed your mongo?" })
      })
  })

module.exports = router