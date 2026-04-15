import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderForm from "./pages/order/OrderForm";
import OrderPage from "./pages/order/OrderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/order" element={<OrderForm />} />
        <Route path="/order/:id" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;