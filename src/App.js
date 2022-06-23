import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./screens/Login/Login.jsx";
import SetPass from "./screens/Set_Password/set_password.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/password" element={<SetPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
