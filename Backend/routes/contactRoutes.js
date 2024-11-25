const express=require("express");
const router =express.Router();
const Contact=require('../models/Contact')

console.log("contact routes loaded")

router.post("/", async (req, res) => {
  console.log("POST /api/contacts accessed");
    console.log('Request Body:', req.body); 
    const { name, email, subject, message } = req.body;
    try {
      console.log("Creating new contact...");
      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();
      console.log('New Contact Saved:', newContact);
      res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ message: "Error saving message", error });
    }
  });
  
module.exports = router;
