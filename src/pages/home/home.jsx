import React, { useState } from "react";
// import { jwtToken } from "../../jwt/jwt";
import "../home/home.css";

// import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Timeline from "../../components/timeline/Timeline";
import CreatePostModal from "../../components/createPostModal/createPostModal";
import Suggestion from "../../components/suggestion/Suggestion";

function Home() {
  const [postModal, setPostModal] = useState(false);

  // const Token = localStorage.getItem(jwtToken);

  // useEffect(()=> {
  //   if(Token) {
  //     navigate("/login")
  //   }
  // });

  //FUNCTION TO OPEN AND CLOSE createPostModal
  function openCreateModal() {
    setPostModal(true);
  }

  function closeCreateModal() {
    setPostModal(false);
  }

  return (
    <div className="h-screen flex flex-row">

      <div className="homepage_sidebar">
        <Sidebar openCreateModal={openCreateModal} />
      </div>

      <div className="homepage_timeline">
        <Timeline />
      </div>

      <div>
        <Suggestion />
      </div>
      
      {/* Modal */}
      {postModal && <CreatePostModal PostModalProp={closeCreateModal} />}
    </div>
  );
}

export default Home;
