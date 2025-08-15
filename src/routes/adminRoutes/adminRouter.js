// import { Children } from "react";
import AdminApp from "../../pages/Admin/AdminApp/AdminApp";
import DashBoard from "../../pages/Admin/Dashboard/DashBoard";
import UsersAdmin from "../../pages/Admin/usersAdmin/UsersAdmin";
import Error from "../../pages/error/Error";
import ZigFile from "../../pages/Admin/zIgfile/ZigFile";
import AllPost from "../../pages/Admin/allPost/AllPost";
import Report from "../../pages/Admin/Report/Report";

export const adminRouter = {
  path: "/admin",
  element: <AdminApp />,
  errorElement: <Error />,
  children: [
    {
      path: "/admin/dashboard", // index: true,
      element: <DashBoard />,
    },
    {
      path: "/admin/UsersAdmin",
      element: <UsersAdmin />,
    },
    {
      path: "/admin/allPost",
      element: <AllPost />,
    },
    {
      path: "/admin/report",
      element: <Report />,
    },
    {
      path: "/admin/igFile",
      element: <ZigFile />,
    },
  ],
};

export default adminRouter;
