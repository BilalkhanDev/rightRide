import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuthenticated,
  selectIsInitialized,
  selectIsLoading,
} from "../features/auth/auth.selecter";
import { useEffect } from "react";
import { meEffect } from "../features/auth/auth.thunk";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const initialized = useSelector(selectIsInitialized);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !initialized && !loading) {
      dispatch(meEffect());
    }
  }, [dispatch, initialized, loading]);

  const { roles } = useOutletContext() || {};

  // If no token and not authenticated, redirect immediately to login
  const token = localStorage.getItem("accessToken");
  if (!token && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!initialized || (loading && !isAuthenticated)) {
    return (
      <div className="flex h-screen items-center justify-center">
      </div>
    );
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
