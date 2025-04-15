import React from "react";
import { useRoutes } from "react-router";
import MainLayout from "./pages/layout/MainLayout";
import Home from "./pages/home/home";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminBanner from "./admin/pages/banner/banner";
import AddBanner from "./admin/pages/banner/addbanner";
import UpdateBanner from "./admin/pages/banner/updatebanner";
import CategoryPage from "./pages/home/danhmuc";
import Category from "./admin/pages/danhmuc/danhmuc";
import Login from "./admin/pages/nguoidung/login";
import Register from "./admin/pages/nguoidung/register";
import UserList from "./admin/pages/nguoidung/list";
import SanPham from "./admin/pages/sanpham/sanpham";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/danhmuc", element: <CategoryPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "banner", element: <AdminBanner /> },
      { path: "banner/add", element: <AddBanner /> },
      { path: "banner/update/:id", element: <UpdateBanner /> },
      { path: "nguoidung", element: <UserList /> },
      { path: "sanpham", element: <SanPham /> },
      { path: "danhmuc", element: <Category /> }, 
    ],
  },
];

function App() {
  return useRoutes(routes);
}

export default App;
