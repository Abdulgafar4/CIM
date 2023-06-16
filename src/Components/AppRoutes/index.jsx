import {  Route, Routes } from "react-router-dom";
import Expenses from "../../Pages/expenses";
import ExpensesCat from "../../Pages/expenses/categories";
import Attendance from "../../Pages/hrm/attendance";
import Employees from "../../Pages/hrm/employees";
import LeaveRequest from "../../Pages/hrm/leave";
import LeaveType from "../../Pages/hrm/leave/type";
import Customers from "../../Pages/people/customers";
import Suppliers from "../../Pages/people/suppliers";
import ProductBrand from "../../Pages/products/brand";
import ProductCategories from "../../Pages/products/categories";
import ProductList from "../../Pages/products";
import Purchase from "../../Pages/purchases";
import PurchaseReturn from "../../Pages/purchases/purchase_return";
import Sales from "../../Pages/sales";
import Dashboard from "../../Pages/Dashbaord";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/expenses/catagories" element={<ExpensesCat />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/leave" element={<LeaveRequest />} />
      <Route path="/leave/type" element={<LeaveType />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/products/brands" element={<ProductBrand />} />
      <Route path="/products/categories" element={<ProductCategories />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/purchase" element={<Purchase />} />
      <Route path="/purchase/purchase_return" element={<PurchaseReturn />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/sales/sales_return" element={<Dashboard />} />
    </Routes>
  );
}
export default AppRoutes;
