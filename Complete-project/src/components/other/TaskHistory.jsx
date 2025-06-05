import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const TaskHistory = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed', 'rejected'

  // Flatten all tasks from all employees and add employee info to each task
  const allTasks = userData.reduce((acc, employee) => {
    if (employee.tasks && employee.tasks.length > 0) {
      const employeeTasks = employee.tasks.map(task => ({
        ...task,
        employeeId: employee.id,
        employeeFirstName: employee.firstName,
        employeeLastName: employee.lastName,
      }));
      return acc.concat(employeeTasks);
    }
    return acc;
  }, []);

  const filteredTasks = allTasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.active && !task.completed && !task.failed;
    if (filter === 'completed') return task.completed;
    if (filter === 'rejected') return task.failed;
    return true;
  });

  const updateTaskStatus = (employeeId, taskId, newStatus) => {
    const updatedUserData = userData.map(employee => {
      if (employee.id === employeeId) {
        const updatedTasks = employee.tasks.map(task => {
          if (task.id === taskId) {
            // Admin has interacted, so it's no longer a "new" task in the sense of needing initial review.
            const updatedTask = {
              ...task,
              newTask: false,
              completed: newStatus === 'completed',
              failed: newStatus === 'rejected',
              active: newStatus === 'pending', // A task is active if it's pending. Completed/rejected tasks are not active.
            };
            return updatedTask;
          }
          return task;
        });

        // Recalculate task counts for the employee
        const newTaskCounts = {
          active: updatedTasks.filter(t => t.active && !t.completed && !t.failed).length,
          newTask: updatedTasks.filter(t => t.newTask && t.active).length, // New tasks are also active
          completed: updatedTasks.filter(t => t.completed).length,
          failed: updatedTasks.filter(t => t.failed).length,
        };
        return { ...employee, tasks: updatedTasks, taskCounts: newTaskCounts };
      }
      return employee;
    });

    setUserData(updatedUserData);
    localStorage.setItem('employees', JSON.stringify(updatedUserData)); // Update localStorage
  };

  if (!userData || userData.length === 0) {
    return <p className="text-gray-600">No employee data available.</p>;
  }

  if (allTasks.length === 0) {
    return <p className="text-gray-600">No tasks found for any employee.</p>;
  }

  return (
    <div className="mt-6 w-full">
      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')} className={`px-3 py-1.5 text-sm rounded-md font-medium ${filter === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>All</button>
        <button onClick={() => setFilter('pending')} className={`px-3 py-1.5 text-sm rounded-md font-medium ${filter === 'pending' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Pending</button>
        <button onClick={() => setFilter('completed')} className={`px-3 py-1.5 text-sm rounded-md font-medium ${filter === 'completed' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Completed</button>
        <button onClick={() => setFilter('rejected')} className={`px-3 py-1.5 text-sm rounded-md font-medium ${filter === 'rejected' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Rejected</button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-600 text-center py-4">No tasks match the current filter.</p>
      ) : (
        <ul className="space-y-3 sm:space-y-4">
          {filteredTasks.map(task => (
            <li key={`${task.employeeId}-${task.id}`} className="p-3 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className="mb-3 sm:mb-0 sm:mr-4 flex-grow">
                  <h3 className="text-md sm:text-lg font-semibold text-emerald-700">{task.taskTitle}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Assigned to: {task.employeeFirstName} {task.employeeLastName} (ID: {task.employeeId})</p>
                  <p className="text-xs sm:text-sm text-gray-500">Category: {task.category}</p>
                  <p className="text-xs sm:text-sm text-gray-500">Due: {task.taskDate}</p>
                  {task.taskDescription && <p className="text-xs sm:text-sm text-gray-500 mt-1">Desc: {task.taskDescription}</p>}
                </div>
                <div className="flex flex-col items-start sm:items-end space-y-2 w-full sm:w-auto">
                  <span className={`self-start sm:self-end px-2.5 py-1 text-xs font-semibold rounded-full ${
                    task.completed ? 'bg-green-100 text-green-700' :
                    task.failed ? 'bg-red-100 text-red-700' :
                    task.active ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {task.completed ? 'Completed' : task.failed ? 'Rejected' : task.active ? 'Pending' : 'Unknown'}
                  </span>
                  <div className="flex flex-wrap gap-1 w-full sm:w-auto justify-start sm:justify-end">
                     <button
                        onClick={() => updateTaskStatus(task.employeeId, task.id, 'pending')}
                        disabled={task.active && !task.completed && !task.failed}
                        className="flex-grow sm:flex-grow-0 text-xs bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Set Pending
                      </button>
                    <button
                      onClick={() => updateTaskStatus(task.employeeId, task.id, 'completed')}
                      disabled={task.completed}
                      className="flex-grow sm:flex-grow-0 text-xs bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Set Complete
                    </button>
                    <button
                      onClick={() => updateTaskStatus(task.employeeId, task.id, 'rejected')}
                      disabled={task.failed}
                      className="flex-grow sm:flex-grow-0 text-xs bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Set Reject
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskHistory;