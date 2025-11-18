import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import 'react-toastify/dist/ReactToastify.css';

// Import upgraded pages
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import SettingsPage from "./pages/SettingPage";

function App() {
  return (
    <div className="flex dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
