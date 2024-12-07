import React, { useRef, useState, useEffect } from 'react';
import './Modal.css'; // Import the CSS styles

const SlidingModal = ({ isOpen, title, children, onClose }) => {

  const modalRef  = useRef(null);

setTimeout(() => {
  if (isOpen) {
    if(modalRef.current) modalRef.current.style.right = '0';
  }else{
    if(modalRef.current) modalRef.current.style.right = '-50%';
  }
}, 50);

//${isAnimating ? 'slide-in' : 'slide-out'}

  return (
<div>
<div className={`modal-overlay ${isOpen ? "" : "d-none"}`}  >
      
    </div>
    <div className={`modalx `} ref={modalRef} >
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
</div>
  );
};



export default SlidingModal;
