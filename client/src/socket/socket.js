import { io } from "socket.io-client";

const socket = io("https://pharmacy-backend.onrender.com");

export default socket;