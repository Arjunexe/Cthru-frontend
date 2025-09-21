// import API from "API";
import { jwtToken } from "../jwt/jwt";
import { jwtDecode } from "jwt-decode";
import API from "./axios.js";

// Follow user
export async function handleFollowAPI(following, setUserDetails) {
  const Token = localStorage.getItem(jwtToken);
  if (Token) {
    const decode = jwtDecode(Token);
    const userFollower = decode.userId;

    if (userFollower === following) {
      console.log("You cannot follow yourself");
    } else {
      try {
        const response = await API.post("/user/followUser", {
          userFollower,
          following,
        });
        console.log("response is therererere :", response.data.followerUser);
        // setUserDetails({userFollowData: { ...response.data.followData}})
        setUserDetails((prevDetails) => ({
          ...prevDetails, // Spreads existing userData and userFollowData
          userFollowData: { ...response.data.followerUser }, // Updates userFollowData only
        }));
      } catch (error) {
        console.log("error during handleFollowAPI :", error);
      }
    }
  }
}

// Unfollow user
export async function handleUnfollowApi(following, setUserDetails) {
  const Token = localStorage.getItem(jwtToken);
  if (Token) {
    const decode = jwtDecode(Token);
    const userFollower = decode.userId;
    console.log("followerssssssssssss :", following);

    try {
      const response = await API.post("/user/unFollowUser", {
        userFollower,
        following,
      });
      // console.log(response.data.unFollowData);

      setUserDetails((prevDetails) => ({
        ...prevDetails,
        userFollowData: { ...response.data.unFollowData },
      }));
    } catch (error) {
      console.log("error during handleUnfollowApi :", error);
    }
  }
}

// Get following user list
export async function getFollowing(userId) {
  try {
    const response = await API.get(`/user/getFollowing/${userId}`);
    const followingUserData = response.data.followingData;
    return followingUserData;
  } catch (error) {
    console.log("error during getFollowing: ", error);
  }
}
