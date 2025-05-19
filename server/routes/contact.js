const express = require("express");
const router = express.Router();
const contactData = require("../data/contact.json");

router.get("/", (req, res) => {
  res.json(contactData);
});

module.exports = router;
