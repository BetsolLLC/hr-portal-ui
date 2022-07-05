import React, { useContext } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Onboarding from "./screens/Onboarding/Onboarding";
import Admin from "./screens/Admin/Admin";



import AuthContext from "./context/AuthProvider.js";
import Login from "./screens/Login/Login.jsx";
import PreOnboarding from "./screens/PreOnboarding/PreOnboarding.jsx";

import SetPass from "./screens/setpassword/SetPass.jsx";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      {user?.id ? (
        <Routes>
          <Route exact path="/preonboarding" element={<PreOnboarding />} />
          <Route path="*" element={<Navigate to="/preonboarding" />} />
          <Route exact path="/admin" element={<Admin />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/password" element={<SetPass />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
