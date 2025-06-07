import React from 'react'

function Exampl({onClose}) {


  return (
    <div className='fixed inset-0 bg-black-50 flex items-center bg-gray-800 justify-center z-50'>
        <div className='bg-white h-56 w-56 relative p-6'>
            <button className='bg-blue-700' onClick={onClose}>close</button>
        </div>
    </div>
  )
}

export default Exampl