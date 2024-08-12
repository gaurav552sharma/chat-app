import { Server } from "socket.io";
import http from "http";
import express from "express";

const app=express();

const server=http.createServer(app);
const io= new Server(server,{
    cors:{
        origin: 'http://localhost:3000', // Allow requests from this origin
        methods: ['GET', 'POST', 'DELETE'], // Allow these methods
        credentials: true // Allow credentials (cookies) to be sent with requests
    }
});

const userSocketMap={}; //{userId : socketId}

export const getReceiverSocketId = (receiverId) =>{
    return userSocketMap[receiverId];
};

io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);

    const userId=socket.handshake.query.userId;
    if (userId!= "undefined") userSocketMap[userId]=socket.id;
    
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });

});

export {app,io,server};