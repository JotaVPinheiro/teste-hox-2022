import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DashboardPage } from "./components/DashboardPage";
import { LoginPage } from "./components/LoginPage";
import { selectUser } from "./redux/userSlice";

interface PrivateRouteProps {
  children: any;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useSelector(selectUser);

  return user.token ? children : <Navigate to="/login" />;
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
