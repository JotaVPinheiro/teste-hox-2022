import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DashboardPage } from "./components/DashboardPage"
import { LoginPage } from "./components/LoginPage"

interface PrivateRouteProps {
  children: any
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = false
  return auth ? children : <Navigate to='/login'/>
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path='/dashboard' 
          element={ 
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace/>} />
      </Routes>
    </BrowserRouter>
  )
}