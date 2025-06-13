import axios from "axios";


export async function getAllUser(){
    try {
        const allUser = await axios.get("/admin/getAllUsers")
        console.log("allUser is here: ", allUser);
        return allUser.data.allUser;
        
        
    } catch (error) {
        console.log("error during getLoggedUser: ", error);
        
    }
}