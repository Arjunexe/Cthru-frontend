// import React, { useEffect, useState } from "react";
// import "../egxample/xample.css";

// export default function Xample() {
//   const [count, setCount] = useState(false);
//   const [hi, setHi] = useState("");

//   useEffect(() => {
//     if (!count) {
//       setHi("hello");
//     } else {
//       setHi("myello");
//     }
//   },[count]);

//   function handleClick() {
//     setCount((prevcount) => !prevcount);
//   }

//   return (
//     <div>
//       <button className={hi}>hello</button>
//       <button onClick={handleClick}>Press</button>
//     </div>
//   );
// }

import React, { useState } from "react";
import Card from "./Card";
import ProfileField from "../../components/profileLayouts/ProfileField";

function Xample() {
  const [display, setDisplay] = useState(false);
  function handlClick() {
    setDisplay(true);
  }

  function closeModal() {
    setDisplay(false);
  }

  return (
    <div
      className="my-cardBody"
      style={{ overflow: display ? "hidden" : "auto" }}
    >
      <button onClick={handlClick}>CLick me</button>
      <Card showModal={display} close={closeModal} />
      <h1 className=" bg-primary">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam ab
        fuga quaerat quo voluptas labore voluptatem, dolor officiis blanditiis
        reiciendis excepturi nobis hic amet beatae iste facere porro, et aut!
        Molestias dolorem eligendi nostrum commodi rem pariatur necessitatibus,
        architecto ea distinctio adipisci a veniam? Quis tempore consequuntur
        velit natus eaque nemo soluta non culpa consectetur quas maiores, libero
        aliquam dignissimos amet quae accusamus. Officia, magnam exercitationem
        iure odit impedit delectus. Eius !
      </h1>
      <br />
      <div className="bg-primary">hi</div>

      <div>
        <ProfileField />
      </div>
    </div>
  );
}

export default Xample;
