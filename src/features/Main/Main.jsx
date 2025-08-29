import { MainLayout } from "@/components/Layouts/MainLayout";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Categories = lazy(() =>
  import("@/features/Categories/pages/CategoryPage")
);
const Products = lazy(() => import("@/features/Products/pages/ProductPage"));

export default function Main() {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="categories" />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="customers" element={<div>customers</div>} />
        <Route path="posts" element={<div>posts</div>} />
      </Routes>
    </MainLayout>
  );
}
