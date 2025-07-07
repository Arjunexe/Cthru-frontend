import { extractPublicId } from "cloudinary-build-url";
import React, { useState } from "react";
import "../optionsModal/optionsModal.css";
import { deletePost } from "../../../api/prfileUploadAPI";
import { savePost } from "../../../api/settingsAPi";

function OptionsModal({
  realImg,
  onClose,
  setImgUploaded,
  loggedUserId,
  postId,
  flowstate,
  handleUnfollow,
}) {
  const [loader, setLoader] = useState(false);

  const optionSpan = "text-white text-opacity-95";
  const buttonStyle =
    "w-80 h-12 items-center justify-center hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition duration-150 shadow shadow-black/20";
  // shadow-[0_1px_10px_0_rgba(255,255,255,0.70)]
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
    } catch (error) {
      console.error("Failed to Save Post: ", error);
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
          className="w-80 items-center relative flex flex-col bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white border-opacity-30  shadow-xl noise-texture"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Options */}
          <button className={buttonStyle} onClick={handleDelete}>
            <span className={optionSpan}>Delete</span>
          </button>

          <button className={buttonStyle} onClick={handleSave}>
            <span className={optionSpan}>Save</span>
          </button>

          {flowstate && (
            <button className={buttonStyle} onClick={handleUnfollow}>
              <span className={optionSpan}>Unfollow</span>
            </button>
          )}

          <button className={buttonStyle}>
            <span className={optionSpan}>Report</span>
          </button>

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
