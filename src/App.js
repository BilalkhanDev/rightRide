import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthLayout from "./app/layouts/AuthLayout";
import AppLayout from "./app/layouts/AppLayout";
import routes from "./app/routes/routes";
import "./App.css";
import ProtectedRoute from "./app/routes/protectedRoutes";
import Toast from "./app/components/Toast/Toast";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          {routes
            .filter((route) => route.layout === "auth")
            .map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
        </Route>

        {/* app Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {routes
              .filter((route) => route.layout === "app")
              .map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                  context={{ roles: route.roles }}
                />
              ))}
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toast />
    </Router>
  );
}

export default App;
