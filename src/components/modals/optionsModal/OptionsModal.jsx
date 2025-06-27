import { extractPublicId } from "cloudinary-build-url";
import React, { useState } from "react";
import { deletePost } from "../../../api/prfileUploadAPI";

function OptionsModal({
  realImg,
  onClose,
  setImgUploaded,
  flowstate,
  handleUnfollow,
}) {
  const [loader, setLoader] = useState(false);

  const optionSpan = "font-semibold";
  const optionDiv =
    "w-80 h-8 items-center justify-center flex flex-col shadow shadow-black/15 cursor-pointer";
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

  return (
    <div
      className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-25 z-30 flex justify-center items-center"
      onClick={onClose}
    >
      {loader ? (
        <div className="w-36 h-36  border-t-transparent rounded-full animate-spin" />
      ) : (
        // Modal body
        <div
          className="w-80 items-center relative flex flex-col bg-[rgba(255,255,255,0.35)]  shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] backdrop-blur-md rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Options */}
          <div className={optionDiv} onClick={handleDelete}>
            <span className={optionSpan}>Delete</span>
          </div>

          {flowstate && (
            <div className={optionDiv} onClick={handleUnfollow}>
              <span className={optionSpan}>Unfollow</span>
            </div>
          )}

          <div className={optionDiv} >
            <span className={optionSpan}>Report</span>
          </div>

          <div className={optionDiv} onClick={onClose}>
            <span className={optionSpan}>Cancel</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default OptionsModal;
