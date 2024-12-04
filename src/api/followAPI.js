import axios from "axios";
import { jwtToken } from "../jwt/jwt";
import { jwtDecode } from "jwt-decode";

// Follow user
export async function handleFollowAPI(following, setUserDetails) {
  const Token = localStorage.getItem(jwtToken);
  if (Token) {
    const decode = jwtDecode(Token);
    const userFollower = decode.userId;
    console.log("follower :", userFollower);
    
    if (userFollower === following) {
      console.log("You cannot follow yourself");

    } else {
        try{
            const response = await axios.post("http://localhost:5000/user/followUser",{userFollower,following})
            console.log("response is therererere :", response.data.followData);
            // setUserDetails({userFollowData: { ...response.data.followData}})
            setUserDetails((prevDetails) => ({
              ...prevDetails,                       // Spreads existing userData and userFollowData
              userFollowData: { ...response.data.followData } // Updates userFollowData only
            }));
            
            
            
        } catch (error) {
            console.log("error during handleFollowAPI :", error);
            
        }
        
    }

  }
}

// Unfollow user
export async function handleUnfollowApi ( following, setUserDetails ) {

  const Token = localStorage.getItem(jwtToken);
  if (Token) {
    const decode = jwtDecode(Token);
    const userFollower = decode.userId;
    console.log("followerssssssssssss :", following);

    try {

      const response = await axios.post("http://localhost:5000/user/unFollowUser", {userFollower, following})
      // console.log(response.data.unFollowData);
      
      setUserDetails((prevDetails) =>({
        ...prevDetails, userFollowData: { ...response.data.unFollowData }
      }))
      
    } catch (error) {
      console.log("error during handleUnfollowApi :", error);
      
    }
  }
}


// Get following user list

export async function getFollowing(followInfo) {

  try {
    const response = await axios.post(
      "http://localhost:5000/messages/getFollowing",
      { followInfo: followInfo }
    );
  } catch (error) {
    console.log("error during getFollowing: ", error);
  }
}




