import React, { useEffect, useState } from "react";
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
      await handleComment(comment, { postId, loggedUserId });
      setComment("");
      
      // const updatedList = await fetchCommentList(postId, 1);
      // setCommentList(updatedList);
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
        {/*---------- Infinite scroll -----------*/}
        <div id="parentScroll" className="overflow-auto mb-8">
          <InfiniteScroll
            dataLength={commentList.length}
            next={() => fetchCommentList(page)}
            // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<h4>All good</h4>}
            scrollableTarget="parentScroll"
          >
            {commentList.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </InfiniteScroll>
        </div>

        <div className="bg-orange-400 ">
          <textarea
            className="bg-[rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-black font-medium absolute bottom-2 right-24 left-5 rounded-md"
            name="cSection"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            id="cSection"
            rows="1"
            placeholder="Write a comment..."
          ></textarea>
          <button
            onClick={handlePostClick}
            className="absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 mr-3"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
