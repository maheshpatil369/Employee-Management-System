import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Header from '../other/Header'; 
import TaskHistory from '../other/TaskHistory'; 

const AdminDashboard = ({ changeUser, data }) => { 
  const { userData, setUserData } = useContext(AuthContext); 

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [viewMode, setViewMode] = useState('assignTask'); // Reverted: only 'assignTask' or 'taskHistory'
  const [showPopup, setShowPopup] = useState(false);

  const handleAssignTask = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!taskTitle || !selectedEmployeeId || !taskDate || !taskCategory) {
      setError('Please fill in all required fields: Title, Assignee, Date, and Category.');
      return;
    }

    const employeeIdNum = parseInt(selectedEmployeeId, 10);
    // Ensure userData is not null before using findIndex
    const employeeIndex = userData ? userData.findIndex(emp => emp.id === employeeIdNum) : -1;


    if (employeeIndex === -1) {
      setError('Selected employee not found.');
      return;
    }

    const updatedUserData = [...userData]; 
    const employeeToUpdate = { ...updatedUserData[employeeIndex] }; 

    const newTask = {
      id: employeeToUpdate.tasks && employeeToUpdate.tasks.length > 0 ? Math.max(...employeeToUpdate.tasks.map(t => t.id || 0)) + 1 : 1,
      taskTitle,
      taskDescription,
      taskDate,
      category: taskCategory,
      active: true, // Tasks are active
      newTask: true, // Tasks are new
      completed: false,
      failed: false,
    };

    employeeToUpdate.tasks = Array.isArray(employeeToUpdate.tasks) ? [...employeeToUpdate.tasks, newTask] : [newTask];

    employeeToUpdate.taskCounts = employeeToUpdate.taskCounts || { active: 0, newTask: 0, completed: 0, failed: 0 };
    employeeToUpdate.taskCounts.active = (employeeToUpdate.taskCounts.active || 0) + 1;
    employeeToUpdate.taskCounts.newTask = (employeeToUpdate.taskCounts.newTask || 0) + 1; // Increment newTask

    updatedUserData[employeeIndex] = employeeToUpdate;

    setUserData(updatedUserData); 
    localStorage.setItem('employees', JSON.stringify(updatedUserData)); 

    const message = `Task "${taskTitle}" assigned to ${employeeToUpdate.firstName}.`;
    setSuccessMessage(message);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 3000);

    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
    setTaskCategory('');
    setSelectedEmployeeId('');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#0d0d0d] text-white px-4 py-8 relative">
      {showPopup && (
        <div className="absolute top-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg transition-opacity duration-500">
          {successMessage}
        </div>
      )}

      <div className="bg-[#1a1a1a] p-6 sm:p-10 rounded-2xl shadow-lg w-full max-w-4xl">
        <Header changeUser={changeUser} userData={data} />

        <div className="flex flex-col sm:flex-row justify-end gap-4 my-6">
          <button
            onClick={() => setViewMode('assignTask')}
            className={`px-5 py-2 rounded-full font-semibold transition ${viewMode === 'assignTask' ? 'bg-emerald-600 text-white' : 'bg-[#2d2d2d] text-gray-300 hover:bg-[#333]'}`}
          >
            Assign Task
          </button>
          <button
            onClick={() => setViewMode('taskHistory')}
            className={`px-5 py-2 rounded-full font-semibold transition ${viewMode === 'taskHistory' ? 'bg-emerald-600 text-white' : 'bg-[#2d2d2d] text-gray-300 hover:bg-[#333]'}`}
          >
            Task History
          </button>
          {/* Removed View Complaints button */}
        </div>

        {viewMode === 'assignTask' && (
          <>
            <p className="text-lg text-gray-400 mb-6">Assign tasks to employees below.</p>
            <form onSubmit={handleAssignTask} className="space-y-6 bg-[#121212] p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold text-emerald-400">Create & Assign Task</h2>
              {error && <p className="text-red-400 bg-red-900 bg-opacity-30 p-3 rounded-md">{error}</p>}
              {/* Success message is now a popup */}
              
              <div>
                <label htmlFor="taskTitle" className="block text-sm mb-1">Task Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="taskTitle"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] border border-emerald-500 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="taskDescription" className="block text-sm mb-1">Task Description</label>
                <textarea
                  id="taskDescription"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] border border-emerald-500 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div>
                <label htmlFor="taskDate" className="block text-sm mb-1">Due Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  id="taskDate"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] border border-emerald-500 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="taskCategory" className="block text-sm mb-1">Category <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="taskCategory"
                  value={taskCategory}
                  onChange={(e) => setTaskCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] border border-emerald-500 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="employee" className="block text-sm mb-1">Assign to Employee <span className="text-red-500">*</span></label>
                <select
                  id="employee"
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] border border-emerald-500 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">-- Select Employee --</option>
                  {userData && userData.map(emp => (
                    <option key={emp.id} value={emp.id} className="text-black">
                      {emp.firstName} (ID: {emp.id})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-full"
              >
                Assign Task
              </button>
            </form>
          </>
        )}

        {viewMode === 'taskHistory' && <TaskHistory />}
        {/* Removed View Complaints section */}
      </div>
    </div>
  );
};

export default AdminDashboard;
