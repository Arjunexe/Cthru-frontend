import React, { useEffect, useState } from "react";
import Comment from "../../comment/Comment";
import { getCommentList, handleComment } from "../../../api/prfileUploadAPI";

function CommentModal({ onClose, postId, loggedUserId }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  // FETCH COMMENT LIST
  useEffect(() => {
    async function fetchCommentList() {
      try {
        const list = await getCommentList(postId);
        console.log("fffffffffff", list);

        setCommentList(list);
      } catch (error) {
        console.log("error during handleCommentList: ", error);
      }
    }
    fetchCommentList();
  }, [postId]);

  // POST COMMENT | SAVE COMMENT TO DB
  async function handlePostClick() {
    if (comment.trim() === "") return;

    try {
      await handleComment(comment, { postId, loggedUserId });
      setComment("");
      const updatedList = await getCommentList(postId);
      setCommentList(updatedList);
    } catch (error) {
      console.log("error during handlePostClick: ", error);
    }
  }

  return (
    <div
      className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-25 z-30 flex justify-center items-center"
      onClick={onClose}
    >
      {/* MODAL BODY */}
      <div
        className="w-[750px] h-[800px] p-5 relative flex flex-col rounded-[10px] bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.18)] "
        onClick={(e) => e.stopPropagation()}
      >
        

        <div className="overflow-auto ">
          {commentList.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>


        <div className="bg-orange-400 ">
          <textarea
            className="bg-[rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-black font-medium absolute bottom-2 right-20 left-2 rounded-md"
            name="cSection"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            id="cSection"
            rows="1"
            placeholder="Write a comment..."
          ></textarea>
          <button
            onClick={handlePostClick}
            className="absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
