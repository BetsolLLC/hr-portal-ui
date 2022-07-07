import React, { useContext } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Admin from "./screens/Admin/Admin";

import AuthContext from "./context/AuthProvider.js";
import Login from "./screens/Login/Login.jsx";
import PreOnboarding from "./screens/PreOnboarding/PreOnboarding.jsx";

import SetPass from "./screens/setpassword/SetPass.jsx";
import { Spinner } from "@chakra-ui/react";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return user ? (
    <BrowserRouter>
      {user.id ? (
        <>
          <Header />
          <Routes>
            <Route path="/preonboarding" element={<PreOnboarding />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/preonboarding" />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/password" element={<SetPass />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  ) : (
    <Spinner />
  );
}

export default App;
