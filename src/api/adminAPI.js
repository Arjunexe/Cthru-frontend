import axios from "axios";


export async function getAllUser(){
    try {
        const allUser = await axios.get("http://localhost:5000/admin/getAllUsers")
        console.log("allUser is here: ", allUser);
        return allUser.data.allUser;
        
        
    } catch (error) {
        console.log("error during getLoggedUser: ", error);
        
    }
}