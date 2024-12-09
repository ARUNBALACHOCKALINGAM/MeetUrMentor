// import React from 'react'
import { AuthFormProps } from '../../abstraction/types/authentication.types';

export const Tasks = ({userType}:AuthFormProps) => {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return (
    <div className='bg-gray-600 rounded-md h-full'>
        <div>Todos {new Date().toLocaleDateString()} {userType}</div>
        <div>Monthly Tasks ({month[new Date().getMonth()]})</div>
        <div>All tasks </div>
    </div>
  )
}
