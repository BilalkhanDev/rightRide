import { Link, useLocation } from "react-router-dom";
import mainIcon from "../../../assets/mainIcon.png";

import routes from "../../../routes/routes";

const Sidebar = () => {
  const location = useLocation();

  const sidebarRoutes = routes.filter(
    (route) => route.layout === "app" && route.icon
  );
  return (
    <aside className="w-28 bg-primary shadow-md flex-shrink-0 hidden md:block">
      <div className="h-[57px] flex items-center justify-center">
        <img className="w-12" src={mainIcon} alt="logo" />
      </div>
      <hr className="border-white/20" />

      <nav className="mt-6">
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
    </aside>
  );
};

export default Sidebar;
