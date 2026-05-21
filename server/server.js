const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const dashboardRoutes =
    require("./routes/dashboardRoutes");

dotenv.config();

const app = express();


// Create HTTP server
const server = http.createServer(app);


// Socket.IO
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: "https://pharmacy-inventory-system-tan.vercel.app",
        methods: ["GET", "POST"]
    }
});


// Socket Connection
io.on("connection", (socket) => {

    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {

        console.log("Client disconnected");
    });
});


// Make io accessible globally
app.set("io", io);


// Middleware
app.use(cors({
  origin: "https://pharmacy-inventory-system-tan.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


// Routes
const authRoutes =
    require("./routes/authRoutes");

const medicineRoutes =
    require("./routes/medicineRoutes");

const storeRoutes =
    require("./routes/storeRoutes");

const transferRoutes =
    require("./routes/transferRoutes");

const logRoutes =
    require("./routes/logRoutes");
const orderRoutes =
    require("./routes/orderRoutes");
const notificationRoutes =
require("./routes/notificationRoutes");
app.use("/api/auth", authRoutes);

app.use("/api/medicines", medicineRoutes);

app.use("/api/stores", storeRoutes);

app.use("/api/transfers", transferRoutes);

app.use("/api/logs", logRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use(
    "/api/orders",
    orderRoutes
);
app.use(
    "/api/notifications",
    notificationRoutes
);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected");

})
.catch((err) => {

    console.log(err);
});


// Test Route
app.get("/", (req, res) => {

    res.send(
        "Pharmacy Inventory System API Running"
    );
});


// Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );
});