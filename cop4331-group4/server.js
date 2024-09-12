require("dotenv").config();
const url =
  "mongodb+srv://User:Password@groupfinderdb.xojgwrj.mongodb.net/GroupFinderDB?retryWrites=true&w=majority&appName=GroupFinderDB";
// process.env.MONGODB_URI;

const path = require("path");
const PORT = process.env.PORT || 5001;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routers = require("./severUtil/routes/routers.js");
const { matchedData } = require("express-validator");
const { User, Table } = require("./severUtil/mongooseSchemas/schemas.js");

// Connect to database
mongoose
  .connect(url)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.set("port", process.env.PORT || 5001);
app.use(express.json());
app.use(cors());
app.use(routers);

// Search
app.get("/api/search/:key", async (request, response) => {
  let data = matchedData(request);

  try {
    const searchString = String(data.searchInput).trim();

    let foundTables = await Table.find({
      $or: [
        { tableNum: { $regex: request.params.key, $options: "i" } },
        { title: { $regex: request.params.key, $options: "i" } },
        { subject: { $regex: request.params.key, $options: "i" } },
      ],
    });

    if (!foundTables || foundTables.length === 0)
      return response.status(400).send({ error: "No table found" });

    return response.status(200).send(foundTables);
  } catch (err) {
    return response.status(400).send({ error: err.message });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

module.exports = app;
