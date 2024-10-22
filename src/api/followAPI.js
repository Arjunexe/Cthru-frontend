import axios from "axios";
import { jwtToken } from "../jwt/jwt";
import { jwtDecode } from "jwt-decode";

export async function handleFollowAPI(following) {
  const Token = localStorage.getItem(jwtToken);

  if (Token) {
    const decode = jwtDecode(Token);
    const follower = decode.userId;
    console.log("follower :", follower);
    console.log("following :", following);
    if (follower === following) {
      console.log("You cannot follow yourself");

    } else {
        try{
            const response = await axios.post("http://localhost:5000/user/follow",{follower,following})
        } catch (error) {
            console.log("error during handleFollowAPI :", error);
            
        }
        
    }

  }
}
