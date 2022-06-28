import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Onboarding from "./screens/Onboarding/Onboarding";
import Admin from "./screens/Admin/Admin";

function App() {
  return (
    <><Header /><BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Onboarding />} /> */}
        <Route path="/" element={<Admin />} />
      </Routes>
    </BrowserRouter><Footer/></>
  );
}

export default App;
