import Dashboard from "../pages/Dashboard";
import Login from "../auth/signin/Login";
// import Signup from "../auth/signup/Signup";
import { FaHome, FaUser, FaCar } from "react-icons/fa";
import Drivers from "../pages/Drivers";
import Vehicles from "../pages/Vehicles";

export const routes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    name: "Dashboard",
    icon: FaHome,
    layout: "app",
    roles: [0, 1],
  },
  {
    path: "/login",
    element: <Login />,
    name: "Login",
    layout: "auth",
  },
  // {
  //   path: "/signup",
  //   element: <Signup />,
  //   name: "Signup",
  //   layout: "auth",
  // },
  {
    path: "/drivers",
    element: <Drivers />,
    name: "Drivers",
    layout: "app",
    icon: FaUser,
    roles: [0, 1],
  },
  {
    path: "/vehicles",
    element: <Vehicles />,
    name: "Vehicles",
    layout: "app",
    icon: FaCar,
    roles: [0, 1],
  },
];

export default routes;
