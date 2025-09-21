// import axios from "axios";
import API from "./axios.js";

export async function getAllUser() {
  try {
    const allUser = await API.get("/admin/getAllUsers");
    console.log("allUser is here: ", allUser);
    return allUser.data.allUser;
  } catch (error) {
    console.log("error during getLoggedUser: ", error);
  }
}

