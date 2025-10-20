import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Waitlist from "./pages/Waitlist";
import PaymentCallback from "./pages/PaymentCallback";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/howto" element={<Info />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/payment/callback" element={<PaymentCallback />} />
          <Route path="/payment/success" element={<PaymentCallback />} />
          <Route path="/payment/failed" element={<PaymentCallback />} />
          <Route path="/payment/error" element={<PaymentCallback />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
