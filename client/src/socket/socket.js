import { io } from "socket.io-client";

const socket = io("https://pharmacy-inventory-system-a1mw.onrender.com/");

export default socket;