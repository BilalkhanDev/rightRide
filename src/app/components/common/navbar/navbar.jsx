import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div>
      <header className="flex items-center justify-end px-6 py-2 bg-[#FAF9F6] shadow-sm relative z-10">
        <div className="flex items-center justify-between w-full">
          <p className="text-sm font-bold text-primary">{user?.username}</p>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm font-semibold p-2 rounded-md bg-primary text-white hover:bg-primary/80 hover:text-white"
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
