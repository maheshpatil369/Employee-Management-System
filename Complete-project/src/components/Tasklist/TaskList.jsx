import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask' // Ensure NewTask is imported
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data, handleAcceptTask, handleUpdateTaskStatus }) => { 
    const newTasks = data.tasks.filter(task => task.newTask && !task.active && !task.completed && !task.failed);
    const acceptedTasks = data.tasks.filter(task => task.active && !task.completed && !task.failed);
    const completedTasks = data.tasks.filter(task => task.completed);
    const failedTasks = data.tasks.filter(task => task.failed);

    const renderTasks = (tasks, TaskComponent, title, specificHandler) => {
        if (!tasks || tasks.length === 0) {
            return (
                <div className="p-3 bg-gray-700 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
                    <p className="text-sm text-gray-400">No tasks in this category.</p>
                </div>
            );
        }
        return (
            <div className="p-3 bg-gray-700 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-300 mb-3">{title}</h3>
                <div className="space-y-3">
                    {tasks.map((task, idx) => {
                        let props = { key: `${title}-${idx}`, data: task };
                        if (TaskComponent === NewTask && specificHandler) {
                            props.onAcceptTask = specificHandler;
                        } else if (TaskComponent === AcceptTask && specificHandler) {
                            props.onUpdateTaskStatus = specificHandler;
                        }
                        return <TaskComponent {...props} />;
                    })}
                </div>
            </div>
        );
    };

    return (
        <div id='tasklist' className='w-full mt-6 sm:mt-8 text-white'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {renderTasks(newTasks, NewTask, "New Tasks", handleAcceptTask)}
                {renderTasks(acceptedTasks, AcceptTask, "Accepted Tasks", handleUpdateTaskStatus)}
                {renderTasks(completedTasks, CompleteTask, "Completed Tasks")}
                {renderTasks(failedTasks, FailedTask, "Failed Tasks")}
            </div>
        </div>
    );
};

export default TaskList