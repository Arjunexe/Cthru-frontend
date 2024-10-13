import jwt from "jsonwebtoken";

export function TokenValid(token) {
  try {
    const decodedToken = jwt.decode(token);
    const userName = decodedToken.Username;
    console.log("decoded token is : ", userName);
  } catch (error) {
    console.log("error during tokenValid ", error);
  }
}
