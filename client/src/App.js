import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./components/auth/Auth";
import Landing from "./components/Layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PostContextProvider from "./contexts/PostContext";
import AuthContextProvider from "./contexts/AuthContext";
import About from "./view/About";
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <PostContextProvider>
          <Routes>
            <Route element={<Landing />} path="/" />
            <Route path="/" element={<Auth />}>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Route>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </PostContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
