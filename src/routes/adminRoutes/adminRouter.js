import { Children } from "react";
import InstagramProfile from "../../pages/Admin/Dashboard/DashBoard";


export const adminRouter = {
    path: "/admin" ,
    element: <InstagramProfile />,
    Children:[
       { 
        path: "/admin",
        element: <InstagramProfile />
       }
    ]
};