const router = require("express").Router()

const db = require("../models")

router.get("/", (req, res) => {
  db.Driver.find().populate('cars')
    .then((driverArray) => {
      console.log(driverArray)
      res.send(driverArray)
    })
    .catch((error) => {
      console.error(error)
      res.status(503).send({ message: "Did you forget to feed your mongo?" })
    })
})

router.get("/:id", (req, res) => {
  db.Driver.findById(req.params.id)
    .then((foundDriver) => {
      if (foundDriver) {
        res.send(foundDriver)
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
  db.Driver.create(req.body)
    .then((createdDriver) => {
        let newDriver = createdDriver
      res.status(201).send(createdDriver)
    })
    .catch((error) => {
      console.error(error, "Error while creating driver")
      if (error.name === "Validation Error") {
        res.status(406).send({ message: "Validation Error" })
      } else {
        res.status(503).send({ message: "Did you forget to feed your mongo?" })
      }
    })
})


router.put("/:id", (req, res) => {
    db.Driver.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    )
      .then(updatedDriver => {
        res.send(updatedDriver)
      })
      .catch((error) => {
        console.error(error)
        res.status(503).send({ message: "Did you forget to feed your mongo?" })
      })
  })

  router.delete("/:id", (req, res) => {
    db.Driver.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).send()
      })
      .catch((error) => {
        console.error(error)
        res.status(503).send({ message: "Did you forget to feed your mongo?" })
      })
  })

module.exports = router
