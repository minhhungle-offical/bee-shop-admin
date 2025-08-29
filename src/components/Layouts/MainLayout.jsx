import { useEffect } from "react";
import { NavBar } from "../Common/NavBar";
import { categoryStore } from "@/store/categoryStore";
import { categoryApi } from "@/api/categoryApi";

export const MainLayout = ({ children }) => {
  useEffect(() => {
    (async () => {
      try {
        const data = await categoryApi.getAll();
        categoryStore.getState().setCategoryList(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#e5e7eb]">
      <div className="w-[200px]">
        <NavBar />
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};
