// src/components/ChartComponent.jsx
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000, users: 240 },
  { name: "Feb", revenue: 3000, users: 139 },
  { name: "Mar", revenue: 5000, users: 980 },
  { name: "Apr", revenue: 4000, users: 390 },
  { name: "May", revenue: 6000, users: 480 },
  { name: "Jun", revenue: 7000, users: 550 },
];

function ChartComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Line Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">New Users</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartComponent;
