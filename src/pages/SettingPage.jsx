import { useState } from "react";
import { 
  FaUser, FaBell, FaEnvelope, FaMobileAlt, FaLock, 
  FaShieldAlt, FaLanguage, FaClock, FaCloudUploadAlt,
  FaCreditCard, FaKey, FaUsersCog, FaCheck, FaTimes
} from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SettingPage() {
  // Notification preferences state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    weeklyDigest: true,
    mentionAlerts: true
  });

  // Profile information state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    jobTitle: "Sales Manager",
    timezone: "GMT-5 (Eastern Time)",
    language: "English",
    profileImage: null
  });

  // Security state
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    activeSessions: [
      { id: 1, device: "MacBook Pro", location: "New York", lastActive: "2 hours ago" },
      { id: 2, device: "iPhone 13", location: "Chicago", lastActive: "5 minutes ago" }
    ]
  });

  // Mock function to toggle notifications
  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    toast.success(`${type.replace(/([A-Z])/g, ' $1')} ${notifications[type] ? 'disabled' : 'enabled'}`);
  };

  // Handle profile changes
  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Mock profile update
  const handleProfileUpdate = () => {
    toast.success("Profile updated successfully!");
  };

  // Mock 2FA toggle
  const toggleTwoFactorAuth = () => {
    setSecurity(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled
    }));
    toast.success(`Two-factor authentication ${security.twoFactorEnabled ? 'disabled' : 'enabled'}`);
  };

  // Mock password change
  const handlePasswordChange = () => {
    toast.info("Password change modal would open here");
  };

  // Mock session termination
  const terminateSession = (sessionId) => {
    setSecurity(prev => ({
      ...prev,
      activeSessions: prev.activeSessions.filter(session => session.id !== sessionId)
    }));
    toast.warning("Session terminated");
  };

  // Mock profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile(prev => ({
          ...prev,
          profileImage: reader.result
        }));
        toast.success("Profile image updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <header>
        <h1 className="text-2xl font-semibold text-gray-800">Account Settings</h1>
        <p className="text-gray-500">Manage your profile, security, and preferences</p>
      </header>

      {/* Profile Settings */}
      <section className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
          <FaUser className="text-blue-500" />
          Profile Information
        </h2>
        
        {/* Profile Image Upload - Updated with default icon */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {profile.profileImage ? (
              <img 
                src={profile.profileImage} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-2 border-gray-200 flex items-center justify-center bg-gray-100">
                <FaUser className="text-3xl text-gray-400" />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600">
              <FaCloudUploadAlt className="text-sm" />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div>
            <p className="font-medium">Profile Photo</p>
            <p className="text-sm text-gray-500">JPG, GIF or PNG. Max 2MB</p>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              value={profile.jobTitle}
              onChange={(e) => handleProfileChange('jobTitle', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select
              value={profile.timezone}
              onChange={(e) => handleProfileChange('timezone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>GMT-5 (Eastern Time)</option>
              <option>GMT-8 (Pacific Time)</option>
              <option>GMT+0 (London)</option>
              <option>GMT+1 (Central Europe)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              value={profile.language}
              onChange={(e) => handleProfileChange('language', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
        
        <div className="pt-4">
          <button 
            onClick={handleProfileUpdate}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Update Profile
          </button>
        </div>
      </section>

      {/* Security Settings */}
      <section className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
          <FaLock className="text-red-500" />
          Security
        </h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <button 
              onClick={toggleTwoFactorAuth}
              className={`px-4 py-2 rounded-lg transition ${
                security.twoFactorEnabled 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {security.twoFactorEnabled ? 'Enabled' : 'Enable 2FA'}
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-800">Password</h3>
              <p className="text-sm text-gray-500">Last changed 3 months ago</p>
            </div>
            <button 
              onClick={handlePasswordChange}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
            >
              Change Password
            </button>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800">Active Sessions</h3>
            <p className="text-sm text-gray-500">{security.activeSessions.length} active sessions</p>
            
            <div className="space-y-2">
              {security.activeSessions.map(session => (
                <div key={session.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-sm text-gray-500">
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                  <button 
                    onClick={() => terminateSession(session.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
          <FaBell className="text-yellow-500" />
          Notification Preferences
        </h2>
        
        <div className="space-y-4">
          {[
            {
              type: "email",
              label: "Email Notifications",
              description: "Receive important updates via email",
              icon: <FaEnvelope className="text-blue-500" />
            },
            {
              type: "sms",
              label: "SMS Alerts",
              description: "Get urgent alerts via text message",
              icon: <FaMobileAlt className="text-green-500" />
            },
            {
              type: "push",
              label: "Push Notifications",
              description: "Get instant notifications on your devices",
              icon: <FaBell className="text-red-500" />
            },
            {
              type: "weeklyDigest",
              label: "Weekly Digest",
              description: "Weekly summary of your activity",
              icon: <FaEnvelope className="text-purple-500" />
            },
            {
              type: "mentionAlerts",
              label: "Mention Alerts",
              description: "When someone mentions you",
              icon: <FaUser className="text-orange-500" />
            }
          ].map((item) => (
            <div key={item.type} className="flex justify-between items-center">
              <div className="flex items-start gap-3">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-800">{item.label}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications[item.type]}
                  onChange={() => toggleNotification(item.type)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 relative transition">
                  <div className="absolute w-5 h-5 bg-white rounded-full shadow left-0.5 top-0.5 transition peer-checked:translate-x-full" />
                </div>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Sections */}
      <section className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
          <FaUsersCog className="text-indigo-500" />
          Team Settings
        </h2>
        <p className="text-gray-500">Manage team members and permissions</p>
        <button 
          onClick={() => toast.info("Team management modal would open here")}
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Manage Team
        </button>
      </section>
    </div>
  );
}