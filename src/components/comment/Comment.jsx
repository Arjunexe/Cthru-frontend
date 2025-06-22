import ProfileField from '../profileLayouts/ProfileField'

function Comment({comment}) {
  // console.log("commmmmmmmmment picutre :", comment.user.ProfilePic);
  
  return (
    <div className='pt-2 flex'>
       <ProfileField profilePicUrl={comment.user.ProfilePic} />
       <span className='pb-2 mr-2 font-semibold'>{comment.user.Username}</span>
      {comment.text}
    </div>
  )
}

export default Comment