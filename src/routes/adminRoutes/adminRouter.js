// import { Children } from "react";
import AdminApp from "../../pages/Admin/AdminApp/AdminApp";
import DashBoard from "../../pages/Admin/Dashboard/DashBoard";
import UsersAdmin from "../../pages/Admin/usersAdmin/UsersAdmin";
import Error from "../../pages/error/Error";
import ZigFile from "../../pages/Admin/zIgfile/ZigFile";

export const adminRouter = {
  path: "/admin",
  element: <AdminApp />,
  errorElement: <Error />,
  children: [
    {
      path: "/admin/dashboard",
      element: <DashBoard />,
    },
    {
      path: "/admin/UsersAdmin",
      element: <UsersAdmin />,
    },
    {
      path: "/admin/igFile",
      element: <ZigFile />,
    },
  ],
};

export default adminRouter;
