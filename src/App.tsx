import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Waitlist from "./pages/Waitlist";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/howto" element={<Info />} />
          <Route path="/waitlist" element={<Waitlist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
