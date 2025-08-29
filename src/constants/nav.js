import {
  Package, // Products
  Users, // Customers
  ShoppingCart, // Orders
  Tags, // Categories
  FileText, // Posts
} from "lucide-react";

export const navList = [
  {
    label: "Products",
    icon: Package,
    path: "/dashboard/products",
  },
  {
    label: "Customers",
    icon: Users,
    path: "/dashboard/customers",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    path: "/dashboard/orders",
  },
  {
    label: "Categories",
    icon: Tags,
    path: "/dashboard/categories",
  },
  {
    label: "Posts",
    icon: FileText,
    path: "/dashboard/posts",
  },
];
