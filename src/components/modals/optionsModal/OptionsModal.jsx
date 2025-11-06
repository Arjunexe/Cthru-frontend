import { extractPublicId } from "cloudinary-build-url";
import React, { useEffect, useState } from "react";
import "../optionsModal/optionsModal.css";
import { deletePost } from "../../../api/prfileUploadAPI";
import { blockUser, savePost } from "../../../api/settingsAPi";

function OptionsModal({
  postUserId,
  realImg,
  onClose,
  setImgUploaded,
  loggedUserId,
  postId,
  flowstate,
  handleUnfollow,
  saved,
}) {
  const [loader, setLoader] = useState(false);
  const [saveState, setSaveState] = useState(saved.includes(loggedUserId));
  const [loggedInUser, setItsLoggedUser] = useState(false);
  const optionSpan = "text-white";
  const buttonStyle =
    "w-80 h-12 items-center justify-center hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-150 shadow shadow-black/20";
  // shadow-[0_1px_10px_0_rgba(255,255,255,0.70)]

  useEffect(() => {
    if (loggedUserId === postUserId) {
      setItsLoggedUser(true);
    } else {
      setItsLoggedUser(false);
    }
  }, []);

  async function handleDelete() {
    setLoader(true);
    const PublicId = extractPublicId(realImg);

    try {
      const postDeleted = await deletePost(PublicId, realImg, setImgUploaded);
      if (postDeleted) onClose();
    } catch (error) {
      console.error("Failed to Delete: ", error);
    }
  }

  async function handleSave() {
    try {
      const savedPost = await savePost(loggedUserId, postId);
      if (savedPost) {
        setSaveState(true);
      } else {
        setSaveState(false);
      }
    } catch (error) {
      console.error("Failed to Save Post: ", error);
    }
  }

  async function handleBlock() {
    try {
      const blockedUser = await blockUser(loggedUserId, postUserId);
      if (blockedUser.success && blockedUser.blocked) {
        console.log("User is blocked");
      } else if (blockedUser.success && !blockedUser.blocked) {
        console.log("User is unblocked");
      } else {
        console.log("Something's wrong, try again");
      }
    } catch (error) {
      console.log("error during handleBlock: ", error);
    }
  }

  return (
    <div
      className="w-full h-full fixed top-0 left-0 inset-0 bg-black bg-opacity-25 z-30 flex justify-center items-center"
      onClick={onClose}
    >
      {loader ? (
        <div className="w-36 h-36 border-4 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        // Modal body
        <div
          className="w-80 items-center relative flex flex-col bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white border-opacity-30  shadow-xl noise-texture"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Options */}

          {loggedInUser && (
            <button className={buttonStyle} onClick={handleDelete}>
              <span className={optionSpan}>Delete</span>
            </button>
          )}
          <button className={buttonStyle} onClick={handleSave}>
            {saveState ? (
              <span className={optionSpan}>Unsave</span>
            ) : (
              <span className={optionSpan}>Save</span>
            )}
          </button>

          {/* remove Delete from here later  */}
          <button className={buttonStyle} onClick={handleDelete}>
            <span className={optionSpan}>Delete</span>
          </button>

          {flowstate && (
            <button className={buttonStyle} onClick={handleUnfollow}>
              <span className={optionSpan}>Unfollow</span>
            </button>
          )}
          {!loggedInUser && (
            <>
              <button className={buttonStyle} onClick={handleBlock}>
                <span className={optionSpan}>Block</span>
              </button>

              <button className={buttonStyle}>
                <span className={optionSpan}>Report</span>
              </button>
            </>
          )}
          <button className={buttonStyle}>
            <span className={optionSpan}>Copy link</span>
          </button>

          <button className={buttonStyle} onClick={onClose}>
            <span className={optionSpan}>Cancel</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default OptionsModal;
