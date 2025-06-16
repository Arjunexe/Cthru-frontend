import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import ProfileField from "../../components/profileLayouts/ProfileField";

function Xample() {
  const [display, setDisplay] = useState(false);
  const count = useRef(0);

  useEffect(() => {
    count.current+=1
  
  console.log("xampleeee: ", count.current);
  
  })
  

   
 
  function handlClick() {
    setDisplay(true);
  }

  function closeModal() {
    setDisplay(false);
  }

  return (
    <div
      className=" h-screen w-screen p-44 bg-stone-600 "
      style={{ overflow: display ? "hidden" : "auto" }}
    >
      <button className="bg-amber-400 rounded p-1" onClick={handlClick}>
        CLick me
      </button>
      <Card showModal={display} close={closeModal} />
      <h1 className="">
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
      <div className="">hi</div>

      <div>
        <ProfileField />
      </div>
    </div>
  );
}

export default Xample;
