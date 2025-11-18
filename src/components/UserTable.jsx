// src/components/UserTable.jsx
import { useState } from 'react';

function UserTable({ searchQuery = '' }) {
  // Initialize with sample data but allow modification
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      joined: "2023-01-10",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
      joined: "2022-11-05",
    },
    {
      id: 3,
      name: "David Johnson",
      email: "david@example.com",
      status: "Active",
      joined: "2023-03-21",
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    status: 'Active'
  });

  const [showAddForm, setShowAddForm] = useState(false);

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm)
    );
  });

  // Handle input changes for add user form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new user
  const handleAddUser = (e) => {
    e.preventDefault();
    const userToAdd = {
      ...newUser,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      joined: new Date().toISOString().split('T')[0]
    };
    
    setUsers(prev => [...prev, userToAdd]);
    setNewUser({ name: '', email: '', status: 'Active' });
    setShowAddForm(false);
  };

  // Delete user
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">User List</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Add User
        </button>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-md font-medium mb-3 dark:text-white">Add New User</h3>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Status</label>
              <select
                name="status"
                value={newUser.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex-1"
              >
                Save User
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm text-gray-600 dark:text-gray-300 uppercase">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Joined</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="border-b dark:border-gray-700 text-sm dark:text-gray-200">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-2">{user.joined}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                    title="Delete user"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500 dark:text-gray-400">
                {users.length === 0 ? 'No users available' : 'No matching users found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;