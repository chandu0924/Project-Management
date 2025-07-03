import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Main from "./Main.js";
import ProjectDataProvider from "./context/ProjectDataContext.js";

export default function App() {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  return (
    <ProjectDataProvider>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" replace />}
        />
        <Route
          path="/*"
          element={token ? <Main /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </ProjectDataProvider>
  );
}
