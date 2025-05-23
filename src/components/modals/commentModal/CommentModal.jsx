import React from 'react'

function CommentModal({closeCommentModal}) {
  return (
    <div className='w-screen h-screen top-0 left-0 bg-red-600 z-30' onClick={closeCommentModal}>
        <div className='w-32 h-20 bg-yellow-200' onClick={(e) => e.stopPropagation()}>

        </div>
    </div>
  )
}

export default CommentModal