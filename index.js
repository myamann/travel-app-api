const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const server = require("http").createServer(app);
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => console.log(err));

app.use("/api/pins", pinRoute);

app.use("/api/users", userRoute);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("backend server is running..!");
});
