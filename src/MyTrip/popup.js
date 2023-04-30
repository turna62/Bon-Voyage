import React, { useState } from 'react';
import './popup.css';

function PopUp() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="some-text">
      <p>
        This is a <span className="pure">pure</span> CSS Popup.
      </p>
      <button className="button" onClick={togglePopup}>I am a Popup</button>

      {showPopup && (
        <div className="popup" id="popup">
          <div className="popup__content">
            <h2 className="heading-secondary">Start booking now</h2>
            <h3 className="heading-tertiary">Important &ndash; Please read these terms before booking</h3>
            <p className="popup__text">
              Godard health goth green juice +1, helvetica taxidermy synth. Brooklyn wayfarers hoodie twee, keffiyeh XOXO microdosing fashion axe iPhone bespoke vape. Affogato brooklyn offal meditation raclette aesthetic heirloom post-ironic iPhone venmo leggings.
            </p>
            <button className="button" onClick={togglePopup}>Close Popup</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopUp;
