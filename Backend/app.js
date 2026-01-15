const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const connectDB = require("./DBconnect");
const User = require("./Models/userSchema");
const cp = require("cookie-parser");
const { userAuth } = require("./userAuth");
const userRouter = require("./Routers/userRouter");
const profileRouter = require("./Routers/profileRouter");
const connectRouter = require("./Routers/connectRouter");
app.use(cp());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", connectRouter)
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




