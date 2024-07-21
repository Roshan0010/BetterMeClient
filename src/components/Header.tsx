import React from 'react'
import { useNavigate } from 'react-router'

const Header = () => {

const navigate=useNavigate();
    const handleClick = ():void => {
        localStorage.setItem('token',"");
        navigate("/login");
    }


  return (
    <div className='bg-[#020913] flex justify-end mr-5 mt-2'>
        <button onClick={handleClick} className='bg-[#135DA0] px-2 py-1 rounded-lg text-xl text-white'>
            logout
        </button>
    </div>
  )
}

export default Header