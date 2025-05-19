const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.json());

app.use("/about", require("./routes/about"));
app.use("/projects", require("./routes/projects"));
app.use("/contact", require("./routes/contact"));
app.use('/api/ai', require('./routes/aiAssistant'));

app.get("/", (req, res) => {
  res.json("👋 Welcome to MeetTalia API – Full Stack Developer Resume in JSON.");
});

app.listen(port, () => {
  console.log(`MeetTalia API listening on port ${port}`);
});
