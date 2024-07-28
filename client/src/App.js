import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerRoutes from "./Layouts/Customer/CustomerRoutes";
import AdminRoutes from "./Layouts/Admin/AdminRoutes";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<CustomerRoutes />} />
          <Route exact path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
