const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// for hotel menu data api
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Menu item saved successfully");
    res.status(201).json(response);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(400).json({ error: "Internal server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    console.log("Data fetched successfully");
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "spicy" || taste == "sweet" || taste == "sour") {
      const menuItems = await MenuItem.find({ taste: taste });
      console.log(`Data fetched successfully for taste: ${taste}`);
      res.status(200).json(menuItems);
    } else {
      res.status(400).json({ error: "Invalid taste type" });
      return;
    }
  } catch (error) {
    console.error("Error fetching menu items by taste:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updatedData = req.body;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      menuItemId,
      updatedData,
      {
        returnDocument: "after",
        runValidators: true, // run mongoose validators on the updated data
      },
    );
    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    console.log(
      `Data updated successfully for menu item with ID: ${menuItemId}`,
    );
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(menuItemId);
    if (!deletedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    console.log(
      `Data deleted successfully for menu item with ID: ${menuItemId}`,
    );
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
