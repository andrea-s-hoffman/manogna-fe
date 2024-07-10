import JobBoard from "./components/JobBoard.tsx";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import AppTracker from "./components/AppTracker.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/tracker" element={<AppTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
