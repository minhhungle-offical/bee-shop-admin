import { navList } from "@/constants/nav";
import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="bg-white w-full shadow-md w-64 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <ul className="space-y-2">
        {navList.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
