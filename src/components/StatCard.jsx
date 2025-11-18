// src/components/StatCard.jsx
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full sm:w-64 hover:shadow-lg transition">
      <div className="flex items-center space-x-4">
        <div className="text-blue-600 text-3xl">{icon}</div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
