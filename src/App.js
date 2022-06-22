import React from "react";

import { Routes, Route } from "react-router-dom";
import Onboarding from "./screens/Onboarding/Onboarding";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
    </Routes>
  );
}

export default App;
