import React, { useContext } from 'react'; 
import { AuthContext } from '../../context/AuthProvider'; 
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../Tasklist/TaskList';

const EmployeeDashboard = (props) => {
  const initialLoggedInEmployee = props.data; 
  const { userData: allEmployeesData, setUserData: setAllEmployeesData } = useContext(AuthContext);

  const currentEmployeeData = allEmployeesData?.find(emp => emp.id === initialLoggedInEmployee?.id) || initialLoggedInEmployee;

  const handleAcceptTask = (taskId) => {
    if (!allEmployeesData || !currentEmployeeData) return;

    const updatedAllEmployeesData = allEmployeesData.map(emp => {
      if (emp.id === currentEmployeeData.id) {
        const updatedTasks = emp.tasks.map(task => {
          if (task.id === taskId && task.newTask) { 
            return { ...task, newTask: false, active: true, id: task.id }; 
          }
          return task;
        });
        
        const newTaskCount = updatedTasks.filter(t => t.newTask && !t.active && !t.completed && !t.failed).length;
        const activeTaskCount = updatedTasks.filter(t => t.active && !t.completed && !t.failed).length;
        
        return {
          ...emp,
          tasks: updatedTasks,
          taskCounts: {
            ...emp.taskCounts,
            newTask: newTaskCount,
            active: activeTaskCount,
          }
        };
      }
      return emp;
    });

    setAllEmployeesData(updatedAllEmployeesData);
    localStorage.setItem('employees', JSON.stringify(updatedAllEmployeesData));
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => { 
    if (!allEmployeesData || !currentEmployeeData) return;

    const updatedAllEmployeesData = allEmployeesData.map(emp => {
      if (emp.id === currentEmployeeData.id) {
        const updatedTasks = emp.tasks.map(task => {
          if (task.id === taskId && task.active) { 
            return {
              ...task,
              active: false,
              completed: newStatus === 'completed',
              failed: newStatus === 'failed',
              id: task.id 
            };
          }
          return task;
        });
        
        const activeTaskCount = updatedTasks.filter(t => t.active && !t.completed && !t.failed).length;
        const completedTaskCount = updatedTasks.filter(t => t.completed).length;
        const failedTaskCount = updatedTasks.filter(t => t.failed).length;
        const newTaskCount = updatedTasks.filter(t => t.newTask && !t.active && !t.completed && !t.failed).length;

        return {
          ...emp,
          tasks: updatedTasks,
          taskCounts: {
            newTask: newTaskCount,
            active: activeTaskCount,
            completed: completedTaskCount,
            failed: failedTaskCount,
          }
        };
      }
      return emp;
    });

    setAllEmployeesData(updatedAllEmployeesData);
    localStorage.setItem('employees', JSON.stringify(updatedAllEmployeesData));
  };

  return (
    <div className='p-4 sm:p-6 md:p-10 bg-[#1C1C1C] min-h-screen'>
      <Header changeUser={props.changeUser} userData={currentEmployeeData} />
      <div className="mt-4 sm:mt-6">
        <TaskListNumbers data={currentEmployeeData} />
      </div>
      <div className="mt-4 sm:mt-6">
        <TaskList
          data={currentEmployeeData}
          handleAcceptTask={handleAcceptTask}
          handleUpdateTaskStatus={handleUpdateTaskStatus} 
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
