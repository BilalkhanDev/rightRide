import { Link, useLocation } from "react-router-dom";
import mainIcon from "../../../assets/mainIcon.png";
import { Button } from "@mui/material"; // Import Material-UI Button
import { ExitToApp as LogoutIcon } from "@mui/icons-material"; // Import Logout icon
import routes from "../../../routes/routes";

const Sidebar = () => {
  const location = useLocation();

  const sidebarRoutes = routes.filter(
    (route) => route.layout === "app" && route.icon
  );

  // Handle Logout functionality (you can adjust this depending on your logic)
  const handleLogout = () => {
    // Clear user authentication (for example, remove tokens or redirect to login)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Redirect to login page (adjust based on your routing setup)
    window.location.href = "/login"; // Or use useNavigate() if using React Router v6
  };

  return (
    <aside className="w-28 bg-primary shadow-md flex-shrink-0 hidden md:flex flex-col h-screen"> {/* Ensure full height with flex column */}
      <div className="h-[57px] flex items-center justify-center">
        <img className="w-12" src={mainIcon} alt="logo" />
      </div>
      <hr className="border-white/20" />

      <nav className="mt-6 flex-grow"> {/* Use flex-grow to allow content to take space */}
        {sidebarRoutes.map((route) => {
          const Icon = route.icon;
          const isActive = location.pathname === route.path;
          return (
            <div key={route.path}>
              <Link
                to={route.path}
                className={`flex flex-col items-center justify-center py-2 text-xs font-semibold text-white gap-2 transition-colors mx-2 rounded-md ${
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                {Icon && <Icon className="text-lg" />}
                <span>{route.name}</span>
              </Link>
              <hr className="border-white/20 my-4" />
            </div>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mb-4"> {/* Removed mt-auto, margin bottom for spacing */}
        <Button
          onClick={handleLogout}
          type="button"
          color="inherit"
          className="w-full hover:bg-white/10" // Make it take full width
          sx={{
            color: "white",
            cursor:"pointer",
           
          }}
          startIcon={<LogoutIcon />} // Add the logout icon
        >
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
