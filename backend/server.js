import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authroutes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/messageroutes.js";
import userRoutes from "./routes/userroutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./socket/socket.js";
import path from "path"; 

const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'DELETE'], // Allow these methods
  credentials: true // Allow credentials (cookies) to be sent with requests
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// Start server and connect to MongoDB
connectToMongoDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to connect to MongoDB', error);
});
