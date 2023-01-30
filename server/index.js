const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
dotenv.config();
const mongoose = require("mongoose");
const scoresRoute = require("./routes/scoresRoute.js");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.use('/user', userRoutes);

app.use("/scores", scoresRoute);


app.use("*", (req, res) => {
  res.status(404).send({ message: "Oops page not found" });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send(err.message);
});

async function init() {
  const connection = await mongoose
    .set("strictQuery", true)
    .connect(process.env.MONGO_URI, { 
      dbName: "memoryGameDb",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  if (connection) {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  }
}

init();
