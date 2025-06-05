import React from 'react'; // Removed useState as it's not used after cleanup
// import { setLocalStorage } from '../../utils/localStorage'; // Not used

const Header = (props) => {

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '');
    props.changeUser('');
    // window.location.reload(); // Usually not needed if state drives re-render
  };
  
  return (
    <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between py-1.5'>
        <div className="mb-2 sm:mb-0">
            <h1 className='text-xl sm:text-2xl font-medium text-gray-500'>Hello,</h1>
            <span className='text-2xl sm:text-3xl font-semibold text-emerald-600'>{props.userData && props.userData.firstName ? props.userData.firstName : 'User'} 👋</span>
        </div>
        <button
            onClick={logOutUser}
            className='w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base font-medium py-2 px-3 sm:px-5 rounded-md cursor-pointer transition-colors duration-150'
        >
            Log Out
        </button>
    </div>
  );
};

export default Header;