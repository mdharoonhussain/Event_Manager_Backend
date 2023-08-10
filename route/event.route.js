const express = require("express")
const {EventModel} = require("../model/event.model")

const eventRouter = express.Router()

eventRouter.get("/", async (req, res) => {
    try {
        const events = await EventModel.find();
        res.send(events);
    } catch (err) {
        res.send({ "err in getting all notes": err });
    }
})

eventRouter.post('/create', async (req, res) => {
    const newEvent = req.body;
    try {
      const createdEvent = await EventModel.create(newEvent);
      res.status(201).json(createdEvent);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  });

module.exports = {eventRouter}