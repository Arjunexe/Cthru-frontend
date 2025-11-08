import ProfileField from "../profileLayouts/ProfileField";

function Comment({ comment }) {
  // console.log("commmmmmmmmment picutre :", comment.user.ProfilePic);

  return (
    <div className="pt-2 flex">
      <ProfileField profilePicUrl={comment.user.ProfilePic} />
      <span className="pb-2 pl-2 mr-2 text-white text-opacity-95 font-semibold">
        {comment.user.Username}
      </span>
      <span className="text-white">{comment.text}</span>
    </div>
  );
}

export default Comment;

