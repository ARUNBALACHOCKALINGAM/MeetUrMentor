import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserState } from '../../abstraction/types/userData.types';
import { FaEdit, FaSave } from 'react-icons/fa';

export const Profile = () => {
  const userType = useSelector((state: UserState) => state.user.userType);

  const initialUserDetail = {
    userType: 'student',
    email: 'abclingam1@gmail.com',
    username: 'Arunbala',
    about: 'A lead developer at Big4 company',
    highestQualification: 'BTECH',
    university: 'VIT',
    cgpa: '8.8',
    linkedIn: 'linkedin.com/arunbala',
    github: 'github.com/ARUNBALACHOCKALINGAM',
    leetcode: '',
    codechef: '',
    portfolio: '',
    company: 'Natwest',
    role: 'Software developer',
    track: 'Front-end',
    avatar: 'src/assets/aiavatars/jack.png',
  };

  const [userDetail, setUserDetail] = useState(initialUserDetail);
  const [editingField, setEditingField] = useState<string | null>(null);

  const colors =
    userType === 'mentor'
      ? {
          bg: 'bg-white',
          border: 'border-[#FFC400]',
          text: 'text-black',
          hoverBg: 'hover:bg-[#FFF5E6]',
          shadow: 'hover:shadow-sm shadow-[#FFC400]',
        }
      : {
          bg: 'bg-white',
          border: 'border-[#1D4ED8]',
          text: 'text-black',
          hoverBg: 'hover:bg-[#1D4ED8]',
          shadow: 'shadow-xs hover:shadow-[#1D4ED8]',
        };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = (field: string) => {
    setEditingField(field);
  };

  const handleSaveClick = () => {
    setEditingField(null);
    console.log('Updated Details:', userDetail);
  };

  return (
    <div className={`p-6 ${colors.bg} ${colors.border} ${colors.shadow} rounded-lg text-left mx-auto`}>
      <div className="flex items-center mb-6">
        <img
          src={userDetail.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full mr-4 border border-gray-300"
        />
        <div>
          <h2 className={`text-2xl font-bold ${colors.text}`}>{userDetail.username}</h2>
          <p className="text-sm text-gray-600">{userDetail.role} at {userDetail.company}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {['email', 'username', 'role'].map((key) => (
            <div key={key} className="flex items-center justify-between">
              <div className="w-full">
                <label className={`block text-sm font-medium text-gray-700`} htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={userDetail[key as keyof typeof userDetail]}
                    onChange={handleChange}
                    readOnly={editingField !== key}
                    className={`w-full p-2 mt-1 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white ${editingField === key ? 'bg-white' : 'bg-gray-100'}`}
                  />
                  <button
                    onClick={() => (editingField === key ? handleSaveClick() : handleEditClick(key))}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-500 transition"
                  >
                    {editingField === key ? <FaSave /> : <FaEdit />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {['highestQualification', 'university'].map((key) => (
            <div key={key} className="flex items-center justify-between">
              <div className="w-full">
                <label className={`block text-sm font-medium text-gray-700`} htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={userDetail[key as keyof typeof userDetail]}
                    onChange={handleChange}
                    readOnly={editingField !== key}
                    className={`w-full p-2 mt-1 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white ${editingField === key ? 'bg-white' : 'bg-gray-100'}`}
                  />
                  <button
                    onClick={() => (editingField === key ? handleSaveClick() : handleEditClick(key))}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-500 transition"
                  >
                    {editingField === key ? <FaSave /> : <FaEdit />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {['cgpa', 'linkedIn'].map((key) => (
            <div key={key} className="flex items-center justify-between">
              <div className="w-full">
                <label className={`block text-sm font-medium text-gray-700`} htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={userDetail[key as keyof typeof userDetail]}
                    onChange={handleChange}
                    readOnly={editingField !== key}
                    className={`w-full p-2 mt-1 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white ${editingField === key ? 'bg-white' : 'bg-gray-100'}`}
                  />
                  <button
                    onClick={() => (editingField === key ? handleSaveClick() : handleEditClick(key))}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-500 transition"
                  >
                    {editingField === key ? <FaSave /> : <FaEdit />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
