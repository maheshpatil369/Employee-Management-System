import React from 'react'

const TaskListNumbers = ({data}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-white'>
        
        <div className='rounded-lg p-4 sm:p-6 bg-blue-500 shadow-lg'>
            <h2 className='text-2xl sm:text-3xl font-bold'>{data.taskCounts.newTask || 0}</h2>
            <h3 className='text-base sm:text-lg mt-0.5 font-medium'>New Task</h3>
        </div>
        <div className='rounded-lg p-4 sm:p-6 bg-yellow-500 shadow-lg'>
            <h2 className='text-2xl sm:text-3xl font-bold'>{data.taskCounts.active || 0}</h2>
            <h3 className='text-base sm:text-lg mt-0.5 font-medium'>Accepted Task</h3>
        </div>
        <div className='rounded-lg p-4 sm:p-6 bg-green-500 shadow-lg'>
            <h2 className='text-2xl sm:text-3xl font-bold'>{data.taskCounts.completed || 0}</h2>
            <h3 className='text-base sm:text-lg mt-0.5 font-medium'>Completed Task</h3>
        </div>
        <div className='rounded-lg p-4 sm:p-6 bg-red-500 shadow-lg'>
            <h2 className='text-2xl sm:text-3xl font-bold'>{data.taskCounts.failed || 0}</h2>
            <h3 className='text-base sm:text-lg mt-0.5 font-medium'>Failed Task</h3>
        </div>
    </div>
  )
}

export default TaskListNumbers