import { extractPublicId } from "cloudinary-build-url";
import React from "react";
import { deletePost } from "../../../api/prfileUploadAPI";

function OptionsModal({ realImg, onClose, setImgUploaded }) {
  async function handleDelete() {
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
      <div
        className="bg-lime-600 relative w-96 h-96 items-center flex"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="bg-amber-400 cursor-pointer w-full py-2 font-semibold"
          onClick={handleDelete}
        >
          Delete
        </div>
        {/* spinner */}
        <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
         
      </div>
    </div>
  );
}

export default OptionsModal;
