
import "./index.css";
import Unauthorised from "./pages/unauthorised/unauthorised";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashboard, Auth } from "/src/components/layouts";
import { AuthProvider } from "@/components/auth/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PageNotFound from "./pages/page-not-found";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route
              path="/dashboard/"
              element={<Navigate to="/dashboard/Explore" replace />}
            />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
          <Route path="/unauthorised" element={<Unauthorised />} />
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;