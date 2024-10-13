// import React from "react";
// import "./App.css";
// import { Outlet } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//       <Outlet />
//     </div>
//   );
// }

// export default App;




// import './App.css';
import React from "react";
import { Outlet } from "react-router-dom";
import ImageProvider from "./hooks/provider";

function App() {

  
  return (
    
      <ImageProvider>
      <Outlet />
      </ImageProvider>
   
      
    
  );
}

export default App;
