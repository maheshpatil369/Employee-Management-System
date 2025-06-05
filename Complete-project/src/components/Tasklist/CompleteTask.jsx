import React from 'react'

const CompleteTask = ({data}) => {
  return (
    <div className='h-full p-3 sm:p-4 bg-blue-500 text-white rounded-lg shadow-md flex flex-col justify-between'>
            <div>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2'>
                    <h3 className='bg-red-600 text-xs sm:text-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full self-start mb-1 sm:mb-0'>{data.category}</h3>
                    <h4 className='text-xs sm:text-sm text-blue-100'>{data.taskDate}</h4>
                </div>
                <h2 className='mt-2 sm:mt-3 text-lg sm:text-xl font-semibold'>{data.taskTitle}</h2>
                <p className='text-xs sm:text-sm mt-1 sm:mt-2 text-blue-50'>
                    {data.taskDescription}
                </p>
            </div>
            <div className='mt-3 sm:mt-4'>
                <button disabled className='w-full bg-green-600 rounded font-medium py-1.5 px-2 text-xs sm:text-sm opacity-70 cursor-not-allowed'>Completed</button>
            </div>
        </div>
  )
}

export default CompleteTask