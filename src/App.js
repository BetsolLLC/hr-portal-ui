import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Onboarding from "./screens/Onboarding/Onboarding";
import Admin from "./screens/Admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Onboarding />} /> */}
        <Route path="/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
