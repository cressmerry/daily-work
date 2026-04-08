const express = require("express");
const cors = require("cors");
//const submissionRoutes = require("./src/routes/submissionRoutes");
const questionRoutes = require("./src/routes/questionsRoutes");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
//app.use("/forms", submissionRoutes);
app.use("/questions", questionRoutes);
app.listen(3001, () => {
  console.log("Server Listening At http://localhost:3001/");
});

module.exports = app;
