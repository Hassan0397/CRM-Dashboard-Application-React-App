import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { title: "Dashboard", path: "/" },
    { title: "Analytics", path: "/analytics" },
    { title: "Customers", path: "/customers" },
    { title: "Settings", path: "/settings" },
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md h-screen p-4 transition-all duration-300 ${open ? "w-64" : "w-20"}`}>
      <button onClick={() => setOpen(!open)} className="mb-6 text-blue-600 font-bold">
        {open ? "Collapse" : "Expand"}
      </button>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block font-medium text-sm p-2 rounded ${
                  isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              {open ? item.title : item.title.charAt(0)}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
