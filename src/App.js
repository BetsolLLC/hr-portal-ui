import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Onboarding from "./screens/Onboarding/Onboarding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
