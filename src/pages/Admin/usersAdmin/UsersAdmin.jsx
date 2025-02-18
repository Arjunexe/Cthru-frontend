import React from 'react'
import UserListBox from '../../../components/admin/userListBox/UserListBox';

function UsersAdmin() {
  
  
  
  return (
    <div className='bg-slate-400 w-full '>
      <div className='font-semibold text-xl pl-9'>Active users</div>
      <div>
        <UserListBox user={'hi'} />
      </div>
    </div>
  )
}

export default UsersAdmin

