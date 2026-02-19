import Dashboard from "../pages/Dashboard";
import Login from "../auth/signin/Login";
import { FaHome } from "react-icons/fa";


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
  
];

export default routes;
