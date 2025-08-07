import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { jwtToken } from "../jwt/jwt";

let socketInstance = null;

export function connectSocket() {
  const token = localStorage.getItem(jwtToken);
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      socketInstance = io("http://localhost:5000", {
        query: {
          userId: userId,
        },
      });
    } catch (error) {
      console.log("error during connectSocket: ", error);
    }
  }

  return socketInstance;
}

export function getSocket() {
  return socketInstance;
}
