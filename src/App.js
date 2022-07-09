import React, { useContext } from "react";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
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
