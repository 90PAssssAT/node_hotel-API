const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// for hotel person data api

// GET get data from person collection
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    console.log("Data fetched successfully");
    res.status(200).json(persons);
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// POST post data to person collection
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data saved successfully");
    res.status(201).json(response);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(400).json({ error: "Internal server error" });
  }
});
// GET get data from person collection by work type
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const persons = await Person.find({ work: workType });
      console.log(`Data fetched successfully for work type: ${workType}`);
      res.status(200).json(persons);
    } else {
      res.status(400).json({ error: "Invalid work type" });
      return;
    }
  } catch (error) {
    console.error("Error fetching persons by work type:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// PUT update data in person collection by ID
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extract the person ID from the request parameters
    const updatedData = req.body; // updated data from the request body
    const response = await Person.findByIdAndUpdate(personId, updatedData, {
      returnDocument: "after", // return the updated document
      runValidators: true, // run mongoose validators on the updated data
    });
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log(`Data updated successfully for person with ID: ${personId}`);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// DELETE delete data from person collection by ID
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const deletedPerson = await Person.findByIdAndDelete(personId);
    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log(`Data deleted successfully for person with ID: ${personId}`);
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
