import React from 'react'

const AcceptTask = ({ data, onUpdateTaskStatus }) => {
  return (
    <div className='h-full p-3 sm:p-4 bg-yellow-500 text-white rounded-lg shadow-md flex flex-col justify-between'>
            <div>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2'>
                    <h3 className='bg-red-600 text-xs sm:text-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full self-start mb-1 sm:mb-0'>{data.category}</h3>
                    <h4 className='text-xs sm:text-sm text-yellow-100'>{data.taskDate}</h4>
                </div>
                <h2 className='mt-2 sm:mt-3 text-lg sm:text-xl font-semibold'>{data.taskTitle}</h2>
                <p className='text-xs sm:text-sm mt-1 sm:mt-2 text-yellow-50'>
                    {data.taskDescription}
                </p>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between gap-2 mt-3 sm:mt-4'>
                <button
                    onClick={() => onUpdateTaskStatus(data.id, 'completed')}
                    className='flex-1 bg-green-600 hover:bg-green-700 rounded font-medium py-1.5 px-2 text-xs sm:text-sm cursor-pointer transition-colors duration-150'
                >
                    Mark as Completed
                </button>
                <button
                    onClick={() => onUpdateTaskStatus(data.id, 'failed')}
                    className='flex-1 bg-red-600 hover:bg-red-700 rounded font-medium py-1.5 px-2 text-xs sm:text-sm cursor-pointer transition-colors duration-150'
                >
                    Mark as Failed
                </button>
            </div>
        </div>
  )
}

export default AcceptTask