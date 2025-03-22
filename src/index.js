// require("dotenv").config(); 
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const authRoutes = require('./routes/auth.routes');
// const userRoutes = require('./routes/user.routes');
// const adminRoutes = require('./routes/admin.routes');

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const MONGO_URI = process.env.MONGO_URI;
// const PORT = process.env.PORT || 8080;

// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connect ot mongodb"))
//   .catch((error) => console.error("Connection failed", error.message))

//   app.use('/api/auth', authRoutes);

//   app.use('/api/user', userRoutes);
  
//   app.use('/api/admin', adminRoutes);

//   app.listen(PORT, () => console.log(`Server listening at ${PORT}`))


require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const {initialiseAdminAccount} = require("./services/admin.service.js");
const resignRoutes = require("./routes/resignation.route.js");
const authRoutes=require("./routes/auth.route.js");
const adminRoutes = require("./routes/admin.route.js")
const app = express();
const PORT = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error in connecting DB", error.message);
    process.exit(1);
  }
};

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/user", resignRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);

app.listen(PORT, async () => {
  try {
    await initialiseAdminAccount();
    console.log(`Backend listening on Port ${PORT}!`);
} catch (error) {
    console.error("Error initializing admin account:", error);
}
});