// import { Children } from "react";
import InstagramProfile from "../../pages/Admin/Dashboard/DashBoard";
import UsersAdmin from "../../pages/Admin/usersAdmin/UsersAdmin";
import Error from "../../pages/error/Error";

export const adminRouter = {
  path: "/admin",
  element: <InstagramProfile />,
  errorElement: <Error />,
  children: [
    {
      path: "/admin",
      element: <InstagramProfile />,
    },
    {
      path: "/admin/UsersAdmin",
      element: <InstagramProfile />,
    },
  ],
};

export default adminRouter