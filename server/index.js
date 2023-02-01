var config = require('./config.js');
var ALLOWED_ORIGIN = config.ALLOWED_ORIGIN;
var MONGODB_URI = config.MONGODB_URI;
const onConnection = require('./socket_io/onConnection.js');
const { getFilePath } = require('./utils/file.js');
const onError = require('./utils/onError.js');
const upload = require('./utils/upload.js');
const dotenv = require("dotenv");
const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
dotenv.config();
const mongoose = require("mongoose");
const scoresRoute = require("./routes/scoresRoute.js");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'https://meme-memory-game.vercel.app/'], credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use('/user', userRoutes);

app.use("/scores", scoresRoute);


app.use("*", (req, res) => {
  res.status(404).send({ message: "Oops page not found" });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send(err.message);
});

app.use('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.sendStatus(400)

  const relativeFilePath = req.file.path
    .replace(/\\/g, '/')
    .split('server/files')[1]

  res.status(201).json(relativeFilePath)
})

app.use('/files', (req, res) => {
  const filePath = getFilePath(req.url)

  res.status(200).sendFile(filePath)
})

app.use(onError)

const server = createServer(app)

const io = new Server(server, {
  cors: ALLOWED_ORIGIN,
  serveClient: false
})

io.on('connection', (socket) => {
  onConnection(io, socket)
})

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
