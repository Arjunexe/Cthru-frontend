import React from "react";
import "./card.css"


function Card({ showModal, close }) {
  return (
    <div className="overlay" onClick={close} style={{ display: showModal ? "flex" : "none",overflow : showModal? "none":"auto" }}>
     
      <div className="cardd">
      <h1>hi</h1>
      <button className="bg-red-500 rounded p-3" onClick={close}>bi</button>
      </div>
    </div>
  );
}

export default Card;
