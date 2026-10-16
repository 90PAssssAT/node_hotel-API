const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

// for hotel person data api

// GET get data from person collection
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const persons = await Person.find();
    console.log("Data fetched successfully");
    res.status(200).json(persons);
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Internal Server error" });
  }
});
// profile route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data", userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Internal Server error" });
  }
});
// POST post data to person collection
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

    const payload = {
      id: response.id,
      username: response.username,
    };
    // console.log(JSON.stringify(payload));
    console.log("Data saved successfully");

    const token = generateToken(payload); // generate a JWT token for the user
    // console.log("JWT token generated:", token);
    // res.setHeader("Authorization", `Bearer ${token}`); // set the token in the response header

    res.status(201).json({ response: response, token: token });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(400).json({ error: "Internal Server error" });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // generate token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server error" });
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
    res.status(500).json({ error: "Internal Server error" });
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
    res.status(500).json({ error: "Internal Server error" });
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
    res.status(500).json({ error: "Internal Server error" });
  }
});
// comment add for testing purpose
module.exports = router;
