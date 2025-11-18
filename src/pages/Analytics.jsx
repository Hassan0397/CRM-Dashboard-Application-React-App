import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import { 
  FaChartPie, 
  FaArrowUp, 
  FaArrowDown, 
  FaDownload,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaMousePointer,
  FaShoppingCart,
  FaBullhorn,
  FaUserFriends
} from "react-icons/fa";
import { useState } from "react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

// Mock data generators
const generateTrafficData = (days) => {
  const labels = ["Organic", "Referral", "Paid", "Social", "Email"];
  const baseValues = [35, 20, 25, 10, 10];
  const multiplier = days === 7 ? 0.3 : days === 30 ? 1 : 3;
  
  return {
    labels,
    datasets: [{
      data: baseValues.map(v => Math.round(v * multiplier)),
      backgroundColor: ["#4f46e5", "#22c55e", "#f97316", "#3b82f6", "#a855f7"],
    }]
  };
};

const generateFunnelData = (days) => {
  const multiplier = days === 7 ? 0.25 : days === 30 ? 1 : 3;
  const current = [5200, 1800, 750, 320, 280].map(v => Math.round(v * multiplier));
  const previous = [4800, 1500, 600, 300, 250].map(v => Math.round(v * multiplier));
  
  return {
    labels: ["Visited Site", "Signed Up", "Booked Demo", "Converted", "Retained"],
    datasets: [
      { label: "Current Period", data: current, backgroundColor: "#4f46e5" },
      { label: "Previous Period", data: previous, backgroundColor: "#c7d2fe" },
    ]
  };
};

const generateTrendData = (days) => {
  const dayCount = days;
  const labels = Array.from({length: dayCount}, (_, i) => 
    days === 7 ? `Day ${i+1}` : 
    days === 30 ? `Week ${Math.floor(i/7)+1}` : 
    `Month ${Math.floor(i/30)+1}`
  );
  
  return {
    labels,
    datasets: [
      {
        label: "Leads",
        data: Array.from({length: dayCount}, () => Math.floor(Math.random() * 100 * (days === 90 ? 3 : 1)) + 20),
        borderColor: "#4f46e5",
        tension: 0.1,
      },
      {
        label: "Conversions",
        data: Array.from({length: dayCount}, () => Math.floor(Math.random() * 30 * (days === 90 ? 3 : 1)) + 5),
        borderColor: "#22c55e",
        tension: 0.1,
      },
    ]
  };
};

const generateTableData = (days) => {
  const multiplier = days === 7 ? 0.25 : days === 30 ? 1 : 3;
  const baseData = [
    { channel: "Google Ads", visits: 2000, leads: 400, conversions: 80, rate: "20%", cost: "$2,400" },
    { channel: "Facebook", visits: 1500, leads: 200, conversions: 30, rate: "13.3%", cost: "$1,200" },
    { channel: "LinkedIn", visits: 800, leads: 100, conversions: 25, rate: "12.5%", cost: "$900" },
    { channel: "Email", visits: 1200, leads: 350, conversions: 70, rate: "29.2%", cost: "$600" },
  ];
  
  return baseData.map(item => ({
    ...item,
    visits: Math.round(item.visits * multiplier),
    leads: Math.round(item.leads * multiplier),
    conversions: Math.round(item.conversions * multiplier),
    cost: `$${Math.round(parseInt(item.cost.slice(1)) * multiplier)}`
  }));
};

const generateKPIs = (days) => {
  const multiplier = days === 7 ? 0.25 : days === 30 ? 1 : 3;
  return [
    {
      title: "Total Visitors",
      value: (12845 * multiplier).toLocaleString(),
      change: days === 7 ? "+5%" : days === 30 ? "+18%" : "+22%",
      icon: <FaUsers className="text-blue-500" />,
      trend: 'up',
    },
    {
      title: "Conversion Rate",
      value: days === 7 ? "5.8%" : days === 30 ? "6.2%" : "6.5%",
      change: days === 7 ? "+0.2%" : days === 30 ? "+0.8%" : "+1.2%",
      icon: <FaChartPie className="text-purple-500" />,
      trend: 'up',
    },
    {
      title: "Avg. Deal Size",
      value: `$${(2450 * (days === 90 ? 1.1 : 1)).toLocaleString()}`,
      change: days === 7 ? "+8%" : days === 30 ? "+12%" : "+15%",
      icon: <FaDollarSign className="text-green-500" />,
      trend: 'up',
    },
    {
      title: "Bounce Rate",
      value: days === 7 ? "41%" : days === 30 ? "43%" : "45%",
      change: days === 7 ? "+1%" : days === 30 ? "+3%" : "+5%",
      icon: <FaMousePointer className="text-red-500" />,
      trend: 'down',
    },
  ];
};

// Tab components
const OverviewTab = ({ days }) => {
  const pieData = generateTrafficData(days);
  const barData = generateFunnelData(days);
  const lineData = generateTrendData(days);
  const tableData = generateTableData(days);
  const kpis = generateKPIs(days);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((item) => (
          <div key={item.title} className="bg-white p-4 rounded-xl shadow flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
              </div>
              <div className="bg-gray-100 p-2 rounded-full">{item.icon}</div>
            </div>
            <div className={`mt-3 text-sm flex items-center ${
              item.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {item.trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
              {item.change} vs previous period
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Conversion Funnel</h2>
          <Bar data={barData} options={{
            indexAxis: "y",
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { x: { beginAtZero: true } },
          }} height={300} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Leads & Conversions Trend</h2>
          <Line data={lineData} options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true } },
          }} height={300} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
          <div className="h-64">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Channel Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-3">Channel</th>
                  <th>Visits</th>
                  <th>Leads</th>
                  <th>Conversions</th>
                  <th>Conversion Rate</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.channel} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{row.channel}</td>
                    <td>{row.visits.toLocaleString()}</td>
                    <td>{row.leads.toLocaleString()}</td>
                    <td>{row.conversions.toLocaleString()}</td>
                    <td>{row.rate}</td>
                    <td>{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const SalesTab = ({ days }) => {
  const salesData = {
    revenue: (days === 7 ? 25000 : days === 30 ? 120000 : 360000),
    deals: (days === 7 ? 12 : days === 30 ? 48 : 150),
    avgDealSize: (days === 7 ? 2083 : days === 30 ? 2500 : 2400),
    winRate: (days === 7 ? "28%" : days === 30 ? "32%" : "35%"),
  };

  const salesTrend = {
    labels: Array.from({length: days === 7 ? 7 : days === 30 ? 4 : 3}, (_, i) => 
      days === 7 ? `Day ${i+1}` : 
      days === 30 ? `Week ${i+1}` : 
      `Month ${i+1}`),
    datasets: [
      {
        label: "Revenue",
        data: Array.from({length: days === 7 ? 7 : days === 30 ? 4 : 3}, () => 
          Math.floor(Math.random() * (days === 7 ? 5000 : days === 30 ? 40000 : 150000)) + 
          (days === 7 ? 1000 : days === 30 ? 10000 : 50000)),
        borderColor: "#4f46e5",
        tension: 0.1,
      }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Revenue",
            value: `$${salesData.revenue.toLocaleString()}`,
            change: days === 7 ? "+8%" : days === 30 ? "+15%" : "+18%",
            icon: <FaDollarSign className="text-green-500" />,
            trend: 'up',
          },
          {
            title: "Closed Deals",
            value: salesData.deals,
            change: days === 7 ? "+5%" : days === 30 ? "+12%" : "+15%",
            icon: <FaShoppingCart className="text-blue-500" />,
            trend: 'up',
          },
          {
            title: "Avg. Deal Size",
            value: `$${salesData.avgDealSize.toLocaleString()}`,
            change: days === 7 ? "+3%" : days === 30 ? "+8%" : "+10%",
            icon: <FaChartPie className="text-purple-500" />,
            trend: 'up',
          },
          {
            title: "Win Rate",
            value: salesData.winRate,
            change: days === 7 ? "+2%" : days === 30 ? "+5%" : "+8%",
            icon: <FaMousePointer className="text-indigo-500" />,
            trend: 'up',
          },
        ].map((item) => (
          <div key={item.title} className="bg-white p-4 rounded-xl shadow flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
              </div>
              <div className="bg-gray-100 p-2 rounded-full">{item.icon}</div>
            </div>
            <div className={`mt-3 text-sm flex items-center text-green-500`}>
              <FaArrowUp className="mr-1" />
              {item.change} vs previous period
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <Line data={salesTrend} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } },
          }} height={300} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Deals by Stage</h2>
          <div className="h-64">
            <Pie data={{
              labels: ["Prospecting", "Qualified", "Proposal", "Negotiation", "Closed Won"],
              datasets: [{
                data: [
                  Math.round(50 * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
                  Math.round(30 * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
                  Math.round(20 * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
                  Math.round(15 * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
                  Math.round(25 * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
                ],
                backgroundColor: ["#6366f1", "#8b5cf6", "#ec4899", "#f97316", "#10b981"],
              }]
            }} />
          </div>
        </div>
      </div>
    </>
  );
};

const MarketingTab = ({ days }) => {
  const marketingData = {
    leads: (days === 7 ? 250 : days === 30 ? 1200 : 3600),
    cost: (days === 7 ? 2500 : days === 30 ? 12000 : 36000),
    cpl: (days === 7 ? 10 : days === 30 ? 10 : 10),
    roi: (days === 7 ? "3.2x" : days === 30 ? "3.5x" : "3.8x"),
  };

  const campaignPerformance = Array.from({length: 5}, (_, i) => ({
    name: `Campaign ${i+1}`,
    impressions: Math.round((10000 + Math.random() * 5000) * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
    clicks: Math.round((500 + Math.random() * 300) * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
    cost: Math.round((500 + Math.random() * 500) * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
    conversions: Math.round((50 + Math.random() * 30) * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
  }));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Leads",
            value: marketingData.leads.toLocaleString(),
            change: days === 7 ? "+12%" : days === 30 ? "+18%" : "+22%",
            icon: <FaUsers className="text-blue-500" />,
            trend: 'up',
          },
          {
            title: "Total Spend",
            value: `$${marketingData.cost.toLocaleString()}`,
            change: days === 7 ? "+8%" : days === 30 ? "+15%" : "+20%",
            icon: <FaDollarSign className="text-purple-500" />,
            trend: 'up',
          },
          {
            title: "Cost per Lead",
            value: `$${marketingData.cpl}`,
            change: days === 7 ? "-5%" : days === 30 ? "-8%" : "-10%",
            icon: <FaChartPie className="text-green-500" />,
            trend: 'down',
          },
          {
            title: "ROI",
            value: marketingData.roi,
            change: days === 7 ? "+0.2x" : days === 30 ? "+0.5x" : "+0.8x",
            icon: <FaBullhorn className="text-indigo-500" />,
            trend: 'up',
          },
        ].map((item) => (
          <div key={item.title} className="bg-white p-4 rounded-xl shadow flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
              </div>
              <div className="bg-gray-100 p-2 rounded-full">{item.icon}</div>
            </div>
            <div className={`mt-3 text-sm flex items-center ${
              item.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {item.trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
              {item.change} vs previous period
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">Campaign Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-3">Campaign</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Cost</th>
                <th>Conversions</th>
                <th>CPL</th>
              </tr>
            </thead>
            <tbody>
              {campaignPerformance.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{row.name}</td>
                  <td>{row.impressions.toLocaleString()}</td>
                  <td>{row.clicks.toLocaleString()}</td>
                  <td>${row.cost.toLocaleString()}</td>
                  <td>{row.conversions.toLocaleString()}</td>
                  <td>${(row.cost / row.conversions).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const CustomersTab = ({ days }) => {
  const customerData = {
    total: (days === 7 ? 50 : days === 30 ? 250 : 750),
    new: (days === 7 ? 12 : days === 30 ? 48 : 150),
    churned: (days === 7 ? 3 : days === 30 ? 15 : 45),
    satisfaction: (days === 7 ? "88%" : days === 30 ? "90%" : "92%"),
  };

  const customerTrend = {
    labels: Array.from({length: days === 7 ? 7 : days === 30 ? 4 : 3}, (_, i) => 
      days === 7 ? `Day ${i+1}` : 
      days === 30 ? `Week ${i+1}` : 
      `Month ${i+1}`),
    datasets: [
      {
        label: "New Customers",
        data: Array.from({length: days === 7 ? 7 : days === 30 ? 4 : 3}, () => 
          Math.floor(Math.random() * (days === 7 ? 5 : days === 30 ? 20 : 60)) + 
          (days === 7 ? 1 : days === 30 ? 5 : 15)),
        borderColor: "#10b981",
        tension: 0.1,
      },
      {
        label: "Churned Customers",
        data: Array.from({length: days === 7 ? 7 : days === 30 ? 4 : 3}, () => 
          Math.floor(Math.random() * (days === 7 ? 2 : days === 30 ? 8 : 25))),
        borderColor: "#ef4444",
        tension: 0.1,
      }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Customers",
            value: customerData.total.toLocaleString(),
            change: days === 7 ? "+5%" : days === 30 ? "+12%" : "+18%",
            icon: <FaUserFriends className="text-blue-500" />,
            trend: 'up',
          },
          {
            title: "New Customers",
            value: customerData.new,
            change: days === 7 ? "+8%" : days === 30 ? "+15%" : "+22%",
            icon: <FaUserFriends className="text-green-500" />,
            trend: 'up',
          },
          {
            title: "Churned Customers",
            value: customerData.churned,
            change: days === 7 ? "-5%" : days === 30 ? "-10%" : "-15%",
            icon: <FaUserFriends className="text-red-500" />,
            trend: 'down',
          },
          {
            title: "Satisfaction",
            value: customerData.satisfaction,
            change: days === 7 ? "+2%" : days === 30 ? "+5%" : "+8%",
            icon: <FaChartPie className="text-purple-500" />,
            trend: 'up',
          },
        ].map((item) => (
          <div key={item.title} className="bg-white p-4 rounded-xl shadow flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
              </div>
              <div className="bg-gray-100 p-2 rounded-full">{item.icon}</div>
            </div>
            <div className={`mt-3 text-sm flex items-center ${
              item.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {item.trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
              {item.change} vs previous period
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Customer Growth</h2>
          <Line data={customerTrend} options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true } },
          }} height={300} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Customer Segments</h2>
          <div className="h-64">
            <Pie data={{
              labels: ["New", "Repeat", "Loyal", "At Risk"],
              datasets: [{
                data: [
                  Math.round(25 * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
                  Math.round(40 * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
                  Math.round(25 * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
                  Math.round(10 * (days === 90 ? 3 : days === 30 ? 1 : 0.3)),
                ],
                backgroundColor: ["#3b82f6", "#10b981", "#6366f1", "#f97316"],
              }]
            }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');
  const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;

  const handleExport = () => {
    const filename = `analytics-${dateRange}-${new Date().toISOString().slice(0,10)}`;
    
    // Create CSV content
    const csvContent = "Category,Metric,Value\n" +
      generateKPIs(days).map(kpi => `${kpi.title},${kpi.value},${kpi.change}`).join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`CSV exported successfully as ${filename}.csv\nFor image export, use browser print (Ctrl+P)`);
  };

  return (
    <div className="p-6 space-y-6" id="analytics-dashboard">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-500">Insights to help drive your business decisions</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
            <FaCalendarAlt className="text-gray-400" />
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent border-none text-sm focus:ring-0"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border text-sm hover:bg-gray-50"
          >
            <FaDownload className="text-gray-400" />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', icon: <FaChartPie className="mr-2" />, label: 'Overview' },
            { id: 'sales', icon: <FaShoppingCart className="mr-2" />, label: 'Sales' },
            { id: 'marketing', icon: <FaBullhorn className="mr-2" />, label: 'Marketing' },
            { id: 'customers', icon: <FaUserFriends className="mr-2" />, label: 'Customers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && <OverviewTab days={days} />}
        {activeTab === 'sales' && <SalesTab days={days} />}
        {activeTab === 'marketing' && <MarketingTab days={days} />}
        {activeTab === 'customers' && <CustomersTab days={days} />}
      </div>
    </div>
  );
}