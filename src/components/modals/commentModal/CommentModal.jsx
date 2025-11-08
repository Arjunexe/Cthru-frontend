import React, { useEffect, useState } from "react";
import "../commentModal/commentModal.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../../comment/Comment";
import { getCommentList, handleComment } from "../../../api/prfileUploadAPI";

function CommentModal({ onClose, postId, loggedUserId }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasmore] = useState(true);

  // FETCH COMMENT LIST

  async function fetchCommentList(pageNum) {
    try {
      const list = await getCommentList(postId, pageNum);
      console.log("comment List :", list);

      setPage(pageNum + 1);
      setCommentList((prev) => [...prev, ...list]);
      if (list.length < 15) {
        setHasmore(false);
      }
    } catch (error) {
      console.log("error during handleCommentList: ", error);
    }
  }

  // Initial fetch comments
  useEffect(() => {
    fetchCommentList(1);
  }, [postId]);

  // POST COMMENT | SAVE COMMENT TO DB
  async function handlePostClick() {
    if (comment.trim() === "") return;

    try {
      const commentPosted = await handleComment(comment, {
        postId,
        loggedUserId,
      });
      setComment("");
      if (commentPosted) {
        const updatedList = await getCommentList(postId, 1);
        if (updatedList) {
          setCommentList(updatedList);
          setPage(2);
          setHasmore(true);
        }
      }
    } catch (error) {
      console.log("error during handlePostClick: ", error);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePostClick();
    }
  }

  return (
    <div
      className="w-full h-full fixed z-[9999]  top-0 left-0 bg-black bg-opacity-25  flex justify-center items-center"
      onClick={onClose}
    >
      {/* MODAL BODY */}
      <div
        className="w-[750px] h-[800px] p-5 relative flex flex-col rounded-2xl bg-white bg-opacity-10  shadow-xl backdrop-blur-xl border border-white border-opacity-30 noise-textur"
        onClick={(e) => e.stopPropagation()}
      >
        {/*---------- Infinite scroll -----------*/}
        <div id="parentScroll" className="overflow-auto no-scrollbar mb-8">
          <InfiniteScroll
            dataLength={commentList.length}
            next={() => fetchCommentList(page)}
            // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <h4 className="text-white text-opacity-95 font-light"></h4>
            }
            scrollableTarget="parentScroll"
          >
            {commentList.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </InfiniteScroll>
        </div>

        <div className="bg-orange-400">
          <textarea
            className="bg-[rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-black font-medium mb-2 absolute bottom-2 right-24 left-5 rounded-2xl"
            name="cSection"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            id="cSection"
            rows="1"
            placeholder="Write a comment..."
            onKeyDown={handleKeyDown}
          ></textarea>
          <button
            onClick={handlePostClick}
            className="absolute bottom-2 right-2 bg-blue-500 text-white px-4 mb-2 py-2 rounded-2xl font-medium hover:bg-red-600 mr-3"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
