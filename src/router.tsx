import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./auth";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";

interface PrivateRouteProps {
  children: any;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const token = getToken();

  return token ? children : <Navigate to="/login" />;
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
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
