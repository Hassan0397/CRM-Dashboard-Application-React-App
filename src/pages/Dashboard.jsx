import React, { useState, useEffect } from "react";
import {
  FaDollarSign,
  FaUsers,
  FaShoppingCart,
  FaChartLine,
  FaCrown,
  FaFilter,
  FaBell,
  FaCalendarAlt,
  FaSearch,
  FaEllipsisH,
  FaCog,
  FaRegClock,
  FaRegSun,
  FaMoon,
  FaDownload,
  FaExpand,
  FaRegCommentAlt,
  FaRegEnvelope
} from "react-icons/fa";
import { 
  Line, 
  Doughnut,
  Bar 
} from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  LineElement, 
  BarElement,
  ArcElement,
  CategoryScale, 
  LinearScale, 
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  LineElement, 
  BarElement,
  ArcElement,
  CategoryScale, 
  LinearScale, 
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler
);

// Mock data generators with more realistic patterns
const generateRevenueData = (months = 6) => {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].slice(0, months);
  
  // Simulate seasonal trends
  const baseValues = labels.map((_, i) => {
    const seasonFactor = 1 + 0.2 * Math.sin(i * 0.5); // Seasonal fluctuation
    const growthFactor = 1 + (i * 0.03); // Gradual growth
    return Math.floor(15000 * growthFactor * seasonFactor * (0.9 + Math.random() * 0.2));
  });
  
  return {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: baseValues,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#4f46e5",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        pointHitRadius: 20
      },
      {
        label: "Target",
        data: baseValues.map(v => v * 1.1),
        borderColor: "#10b981",
        backgroundColor: "transparent",
        borderDash: [5, 5],
        tension: 0,
        pointRadius: 0
      }
    ],
  };
};

const generateSalesFunnelData = () => ({
  labels: ["Leads", "Prospects", "Negotiation", "Closed Won", "Closed Lost"],
  datasets: [
    {
      label: "Sales Funnel",
      data: [1200, 800, 450, 220, 130],
      backgroundColor: [
        "rgba(79, 70, 229, 0.8)",
        "rgba(79, 70, 229, 0.6)",
        "rgba(79, 70, 229, 0.4)",
        "rgba(79, 70, 229, 0.2)",
        "rgba(255, 99, 132, 0.2)",
      ],
      borderColor: [
        "rgba(79, 70, 229, 1)",
        "rgba(79, 70, 229, 1)",
        "rgba(79, 70, 229, 1)",
        "rgba(79, 70, 229, 1)",
        "rgba(255, 99, 132, 1)",
      ],
      borderWidth: 1,
    },
  ],
});

const generateDealStagesData = () => ({
  labels: ["Discovery", "Qualified", "Proposal", "Negotiation", "Closed Won"],
  datasets: [
    {
      label: "Current Month",
      data: [45, 32, 22, 15, 8],
      backgroundColor: "rgba(79, 70, 229, 0.8)",
      borderRadius: 4
    },
    {
      label: "Previous Month",
      data: [38, 28, 18, 12, 6],
      backgroundColor: "rgba(156, 163, 175, 0.8)",
      borderRadius: 4
    }
  ]
});

const topAgents = [
  { name: "John Doe", sales: 120, region: "USA", avatar: "JD", quota: 150, deals: 18, meetings: 32 },
  { name: "Jane Smith", sales: 110, region: "UK", avatar: "JS", quota: 125, deals: 15, meetings: 28 },
  { name: "Ali Khan", sales: 102, region: "UAE", avatar: "AK", quota: 100, deals: 14, meetings: 25 },
  { name: "Maria Garcia", sales: 98, region: "Spain", avatar: "MG", quota: 110, deals: 12, meetings: 22 },
  { name: "Chen Wei", sales: 85, region: "China", avatar: "CW", quota: 90, deals: 10, meetings: 18 }
];

const recentActivities = [
  { id: 1, user: "John Doe", action: "closed a deal", value: "$12,000", time: "2 mins ago", priority: "high", type: "sale" },
  { id: 2, user: "Jane Smith", action: "added a new lead", value: "Acme Corp", time: "15 mins ago", priority: "medium", type: "lead" },
  { id: 3, user: "System", action: "scheduled maintenance", value: "Tonight 2-3 AM", time: "1 hour ago", priority: "low", type: "system" },
  { id: 4, user: "Ali Khan", action: "sent proposal to", value: "Global Tech", time: "2 hours ago", priority: "medium", type: "deal" },
  { id: 5, user: "Maria Garcia", action: "completed call with", value: "Ocean View LLC", time: "3 hours ago", priority: "medium", type: "meeting" }
];

const upcomingTasks = [
  { id: 1, title: "Follow up with Acme Corp", due: "Today 3:00 PM", priority: "high", assigned: "You" },
  { id: 2, title: "Prepare Q2 sales report", due: "Tomorrow", priority: "medium", assigned: "You" },
  { id: 3, title: "Team meeting", due: "Jun 15, 10:00 AM", priority: "high", assigned: "Everyone" }
];

const Card = ({ title, value, change, changeType, icon, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className={`p-3 rounded-xl text-lg ${
        changeType === "positive" ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300" : 
        changeType === "negative" ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300" :
        "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400 dark:text-gray-300">{title}</p>
        <p className="text-xl font-bold text-gray-700 dark:text-white">{value}</p>
        {change && (
          <p className={`text-xs font-medium ${
            changeType === "positive" ? "text-green-600 dark:text-green-300" : 
            changeType === "negative" ? "text-red-600 dark:text-red-300" :
            "text-blue-600 dark:text-blue-300"
          }`}>
            {change} {changeType === "positive" ? "↑" : changeType === "negative" ? "↓" : "↔"}
          </p>
        )}
      </div>
    </div>
  );
};

const QuickAction = ({ icon, label, color, onClick }) => {
  return (
    <button 
      className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-sm ${color} hover:opacity-90 transition-opacity dark:shadow-none`}
      onClick={onClick}
    >
      <div className="text-xl mb-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

const PriorityBadge = ({ priority }) => {
  const priorityClasses = {
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  };
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${priorityClasses[priority]}`}>
      {priority}
    </span>
  );
};

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState("6months");
  const [revenueData, setRevenueData] = useState(generateRevenueData());
  const [salesFunnelData] = useState(generateSalesFunnelData());
  const [dealStagesData] = useState(generateDealStagesData());
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("sales");
  const [expandedChart, setExpandedChart] = useState(null);
  const [showAllAgents, setShowAllAgents] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);

  useEffect(() => {
    const months = timeRange === "6months" ? 6 : timeRange === "12months" ? 12 : 1;
    setRevenueData(generateRevenueData(months));
  }, [timeRange]);

  const clearNotifications = () => {
    setUnreadNotifications(0);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleExpandChart = (chart) => {
    setExpandedChart(expandedChart === chart ? null : chart);
  };

  const handleCardClick = (title) => {
    alert(`You clicked on ${title}. In a real app, this would open a detailed view.`);
  };

  const handleQuickAction = (action) => {
    alert(`Quick action: ${action}. In a real app, this would trigger a specific workflow.`);
  };

  const displayedAgents = showAllAgents ? topAgents : topAgents.slice(0, 3);
  const displayedActivities = showAllActivities ? recentActivities : recentActivities.slice(0, 3);

  return (
    <div className={`min-h-screen p-4 md:p-6 space-y-6 transition-colors duration-200 ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-300 text-sm">Overview of key metrics and performance</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button 
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaRegSun /> : <FaMoon />}
          </button>
          <button 
            className="relative p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
            onClick={clearNotifications}
            aria-label="Notifications"
          >
            <FaBell />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
          <button 
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
            aria-label="Settings"
          >
            <FaCog />
          </button>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === "sales" ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
          onClick={() => setActiveTab("sales")}
        >
          Sales
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === "marketing" ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
          onClick={() => setActiveTab("marketing")}
        >
          Marketing
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === "service" ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
          onClick={() => setActiveTab("service")}
        >
          Service
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <QuickAction 
          icon={<FaUsers />} 
          label="Add Lead" 
          color="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300" 
          onClick={() => handleQuickAction("Add Lead")}
        />
        <QuickAction 
          icon={<FaShoppingCart />} 
          label="New Deal" 
          color="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300" 
          onClick={() => handleQuickAction("New Deal")}
        />
        <QuickAction 
          icon={<FaCalendarAlt />} 
          label="Schedule" 
          color="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300" 
          onClick={() => handleQuickAction("Schedule")}
        />
        <QuickAction 
          icon={<FaRegEnvelope />} 
          label="Send Email" 
          color="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" 
          onClick={() => handleQuickAction("Send Email")}
        />
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          title="Revenue" 
          value="$45,231" 
          change="+12.5%" 
          changeType="positive" 
          icon={<FaDollarSign />} 
          onClick={() => handleCardClick("Revenue")}
        />
        <Card 
          title="Users" 
          value="1,234" 
          change="+5.2%" 
          changeType="positive" 
          icon={<FaUsers />} 
          onClick={() => handleCardClick("Users")}
        />
        <Card 
          title="Sales" 
          value="320" 
          change="-3.1%" 
          changeType="negative" 
          icon={<FaShoppingCart />} 
          onClick={() => handleCardClick("Sales")}
        />
        <Card 
          title="Conversion" 
          value="8.2%" 
          change="+1.4%" 
          changeType="positive" 
          icon={<FaChartLine />} 
          onClick={() => handleCardClick("Conversion")}
        />
      </div>

      {/* Main Charts Section */}
      <div className={`grid gap-6 ${expandedChart ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"}`}>
        {/* Revenue Trends Chart */}
        {(!expandedChart || expandedChart === "revenue") && (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow p-6 ${expandedChart ? "lg:col-span-1" : "lg:col-span-2"}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Revenue Trends</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-lg overflow-hidden dark:border-gray-600">
                  <button 
                    onClick={() => setTimeRange("1month")}
                    className={`px-3 py-1 text-sm ${
                      timeRange === "1month" ? "bg-indigo-600 dark:bg-indigo-700 text-white" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    1M
                  </button>
                  <button 
                    onClick={() => setTimeRange("6months")}
                    className={`px-3 py-1 text-sm ${
                      timeRange === "6months" ? "bg-indigo-600 dark:bg-indigo-700 text-white" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    6M
                  </button>
                  <button 
                    onClick={() => setTimeRange("12months")}
                    className={`px-3 py-1 text-sm ${
                      timeRange === "12months" ? "bg-indigo-600 dark:bg-indigo-700 text-white" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    12M
                  </button>
                </div>
                <button className="p-2 rounded-lg border text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600">
                  <FaFilter />
                </button>
                <button 
                  className="p-2 rounded-lg border text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
                  onClick={() => toggleExpandChart("revenue")}
                  aria-label={expandedChart ? "Minimize chart" : "Expand chart"}
                >
                  <FaExpand />
                </button>
                <button className="p-2 rounded-lg border text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600">
                  <FaDownload />
                </button>
              </div>
            </div>
            <div className="h-64">
              <Line 
                data={revenueData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      align: 'end',
                      labels: {
                        color: darkMode ? '#fff' : '#333',
                        usePointStyle: true
                      }
                    },
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                      backgroundColor: darkMode ? '#1f2937' : '#fff',
                      titleColor: darkMode ? '#fff' : '#333',
                      bodyColor: darkMode ? '#fff' : '#333',
                      borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                      borderWidth: 1,
                      padding: 12,
                      callbacks: {
                        label: function(context) {
                          let label = context.dataset.label || '';
                          if (label) {
                            label += ': ';
                          }
                          if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                          }
                          return label;
                        }
                      }
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                      },
                      ticks: {
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }
                    },
                    y: {
                      beginAtZero: false,
                      grid: {
                        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                      },
                      ticks: {
                        color: darkMode ? '#9ca3af' : '#6b7280',
                        callback: function(value) {
                          return '$' + value.toLocaleString();
                        }
                      }
                    }
                  },
                  interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                  }
                }} 
              />
            </div>
          </div>
        )}

        {/* Sales Funnel Chart */}
        {(!expandedChart || expandedChart === "funnel") && (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow p-6 ${expandedChart ? "lg:col-span-1" : ""}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Sales Funnel</h2>
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 rounded-lg border text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
                  onClick={() => toggleExpandChart("funnel")}
                  aria-label={expandedChart ? "Minimize chart" : "Expand chart"}
                >
                  <FaExpand />
                </button>
                <button className="p-2 rounded-lg border text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600">
                  <FaEllipsisH />
                </button>
              </div>
            </div>
            <div className="h-64">
              <Doughnut
                data={salesFunnelData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        color: darkMode ? '#fff' : '#333',
                        usePointStyle: true,
                        padding: 16
                      }
                    },
                    tooltip: {
                      backgroundColor: darkMode ? '#1f2937' : '#fff',
                      titleColor: darkMode ? '#fff' : '#333',
                      bodyColor: darkMode ? '#fff' : '#333',
                      borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                      borderWidth: 1,
                      padding: 12,
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.raw || 0;
                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                          const percentage = Math.round((value / total) * 100);
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  },
                  cutout: '65%'
                }}
              />
            </div>
          </div>
        )}

        {/* Deal Stages Chart - New Addition */}
        {(!expandedChart || expandedChart === "dealStages") && (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow p-6 ${expandedChart ? "lg:col-span-1" : ""}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Deal Stages</h2>
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 rounded-lg border text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
                  onClick={() => toggleExpandChart("dealStages")}
                  aria-label={expandedChart ? "Minimize chart" : "Expand chart"}
                >
                  <FaExpand />
                </button>
                <button className="p-2 rounded-lg border text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600">
                  <FaEllipsisH />
                </button>
              </div>
            </div>
            <div className="h-64">
              <Bar
                data={dealStagesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        color: darkMode ? '#fff' : '#333',
                        usePointStyle: true
                      }
                    },
                    tooltip: {
                      backgroundColor: darkMode ? '#1f2937' : '#fff',
                      titleColor: darkMode ? '#fff' : '#333',
                      bodyColor: darkMode ? '#fff' : '#333',
                      borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                      borderWidth: 1,
                      padding: 12
                    }
                  },
                  scales: {
                    x: {
                      stacked: false,
                      grid: {
                        display: false,
                        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                      },
                      ticks: {
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }
                    },
                    y: {
                      stacked: false,
                      grid: {
                        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                      },
                      ticks: {
                        color: darkMode ? '#9ca3af' : '#6b7280',
                        precision: 0
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Agents */}
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow p-6 ${expandedChart ? "lg:col-span-1" : "lg:col-span-2"}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Top Performing Agents</h2>
            <button 
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              onClick={() => setShowAllAgents(!showAllAgents)}
            >
              {showAllAgents ? "Show Less" : "View All"}
            </button>
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {displayedAgents.map((agent, i) => (
              <li key={i} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-medium">
                    {agent.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-white">{agent.name}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-300">{agent.region}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                        {agent.deals} deals
                      </span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                        {agent.meetings} meetings
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(100, (agent.sales / agent.quota) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 w-20 justify-end">
                    {i < 3 && <FaCrown className={i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-400" : "text-amber-600"} />}
                    <span className="font-semibold">{agent.sales}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Activity and Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6">
          {/* Recent Activity */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Recent Activity</h2>
              <button 
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                onClick={() => setShowAllActivities(!showAllActivities)}
              >
                {showAllActivities ? "Show Less" : "View All"}
              </button>
            </div>
            <ul className="space-y-4">
              {displayedActivities.map(activity => (
                <li key={activity.id} className="flex gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center mt-1 ${
                    activity.type === "system" ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300" :
                    activity.type === "sale" ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300" :
                    "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                  }`}>
                    {activity.user === "System" ? "⚙️" : activity.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.value}</span>
                      </p>
                      <PriorityBadge priority={activity.priority} />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <FaRegClock className="text-xs" /> {activity.time}
                      </p>
                      <button className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <FaRegCommentAlt />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Upcoming Tasks</h2>
            <ul className="space-y-3">
              {upcomingTasks.map(task => (
                <li key={task.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-gray-700 dark:text-white">{task.title}</p>
                    <PriorityBadge priority={task.priority} />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FaRegClock className="text-xs" /> {task.due}
                    </p>
                    <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                      {task.assigned}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;