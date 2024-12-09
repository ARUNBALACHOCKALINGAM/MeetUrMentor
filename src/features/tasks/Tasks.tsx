import React from 'react'

export const Tasks = () => {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return (
    <div className='bg-gray-600 rounded-md h-full'>
        <div>Todos {new Date().toLocaleDateString()}</div>
        <div>Monthly Tasks ({month[new Date().getMonth()]})</div>
        <div>All tasks </div>
    </div>
  )
}
