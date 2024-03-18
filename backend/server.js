// env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// dependecies
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/user");
const dataRoutes = require("./routes/data");
const stockRoutes = require("./routes/stock");
const analyseRoutes = require("./routes/analyse");
const sectorialRoutes = require("./routes/sectorial");
const opcvmRoutes = require("./routes/opcvm");
const CompOpcvmRoutes = require("./routes/compositionOpcvm");
const ApiLogRoutes = require("./routes/apiLogRoutes");
const path = require("path");
const connectToDb = require("./config/database");

// middleware
// app.options("*", cors());
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));

// connect to DB
connectToDb();
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/logs", ApiLogRoutes);
app.use("/data", dataRoutes);
app.use("/stock", stockRoutes);
app.use("/analyse", analyseRoutes);
app.use("/sectorial", sectorialRoutes);
app.use("/opcvm", opcvmRoutes);
app.use("/composition-opcvm", CompOpcvmRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App listened on port ${process.env.PORT}`);
});
