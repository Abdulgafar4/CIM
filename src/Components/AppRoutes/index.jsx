/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from "react-router-dom";
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
import ProductVariants from "../../Pages/products/variants";
import Auth from "../../Pages/Auth/Auth";
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';

function AppRoutes() {
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/auth" />;
  };
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/expenses"
        element={
          <RequireAuth>
            <Expenses />
          </RequireAuth>
        }
      />
      <Route
        path="/expenses/catagories"
        element={
          <RequireAuth>
            <ExpensesCat />
          </RequireAuth>
        }
      />
      <Route
        path="/attendance"
        element={
          <RequireAuth>
            <Attendance />
          </RequireAuth>
        }
      />
      <Route
        path="/employees"
        element={
          <RequireAuth>
            <Employees />
          </RequireAuth>
        }
      />
      <Route
        path="/leave"
        element={
          <RequireAuth>
            <LeaveRequest />
          </RequireAuth>
        }
      />
      <Route
        path="/leave/type"
        element={
          <RequireAuth>
            <LeaveType />
          </RequireAuth>
        }
      />
      <Route
        path="/customers"
        element={
          <RequireAuth>
            <Customers />
          </RequireAuth>
        }
      />
      <Route
        path="/suppliers"
        element={
          <RequireAuth>
            <Suppliers />
          </RequireAuth>
        }
      />
      <Route
        path="/products/brands"
        element={
          <RequireAuth>
            <ProductBrand />
          </RequireAuth>
        }
      />
      <Route
        path="/products/categories"
        element={
          <RequireAuth>
            <ProductCategories />
          </RequireAuth>
        }
      />
      <Route
        path="/products/variants"
        element={
          <RequireAuth>
            <ProductVariants />
          </RequireAuth>
        }
      />
      <Route
        path="/products"
        element={
          <RequireAuth>
            <ProductList />
          </RequireAuth>
        }
      />
      <Route
        path="/purchase"
        element={
          <RequireAuth>
            <Purchase />
          </RequireAuth>
        }
      />
      <Route
        path="/purchase/purchase_return"
        element={
          <RequireAuth>
            <PurchaseReturn />
          </RequireAuth>
        }
      />
      <Route
        path="/sales"
        element={
          <RequireAuth>
            <Sales />
          </RequireAuth>
        }
      />
      <Route
        path="/sales/sales_return"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
export default AppRoutes;
