import React, { useEffect, useState } from 'react'

function ProfileGrid({Post}) {
  const [img, setImage ] = useState("")


  const image = Post.postImage
  useEffect(() => {
    setImage(image)

  }, [Post.postImage])
  

  return (
    <div className='aspect-square bg-lime-600 overflow-hidden'>
      <img className='w-full h-full object-cover' src={img} alt="" />
        </div>
  )
}

export default ProfileGrid