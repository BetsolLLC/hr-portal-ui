import React, { useContext } from "react";
import Header from "./components/header";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Admin from "./screens/Admin/Admin";

import AuthContext from "./context/AuthProvider.js";
import Login from "./screens/Login/Login.jsx";
import PreOnboarding from "./screens/PreOnboarding/PreOnboarding.jsx";

import SetPass from "./screens/setpassword/SetPass.jsx";
import { Spinner } from "@chakra-ui/react";
//comment

function App() {
  const { user } = useContext(AuthContext);
  return user ? (
    <BrowserRouter>
      {user.id ? (
        <>
          <Header />
          {user.is_admin ? (
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/preonboarding" element={<PreOnboarding />} />

              <Route path="*" element={<Navigate to="/preonboarding" />} />
            </Routes>
          )}

          {/* <Footer /> */}
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

// TEST
export default App;
