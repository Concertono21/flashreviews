import React, { useState } from 'react';
import Image from 'next/image';

const styleSettings = {
  "classic-white": {
    backgroundColor: "#fff",
    color: "#000"
  },
  "dark-mode": {
    backgroundColor: "#333",
    color: "#fff"
  },
  "style4": {
    backgroundColor: "#ffcacb",
    color: "#000"
  },
  "style5": {
    backgroundColor: "#ffcd9c",
    color: "#000"
  }
};

const PreviewPopup = ({ popupSettings, handleClose }) => {
  const [comments, setComments] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);

  const handleStarHover = (star) => {
    setHoverRating(star);
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleMouseLeave = () => {
    setHoverRating(0); // Reset hover rating when the mouse leaves the star area
  };

  const currentStyle = styleSettings[popupSettings.style] || styleSettings["classic-white"];

  return (
    <div
      id="previewNotification"
      className={popupSettings.style}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: currentStyle.backgroundColor,
        color: currentStyle.color,
        borderRadius: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'opacity 0.5s, transform 0.5s',
        opacity: 1,
        transform: 'translateX(0)',
        width: '300px',
        maxWidth: '100%',
        cursor: 'default',
        zIndex: 1000, // Ensure popup is above other elements
      }}
    >
      <div
        className="notification-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: popupSettings.logo ? 'space-between' : 'flex-start',
          padding: '10px',
          position: 'relative',
        }}
      >
        {popupSettings.logo && (
          <div
            className="notification-icon"
            style={{
              flex: '0 0 auto',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px', // More space between logo and text
            }}
          >
            <Image
              src={popupSettings.logo}
              alt="Logo"
              width={40}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
        <div
          className="notification-title-container"
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: '100%', // Ensures text takes up available space
            paddingRight: '30px', // Padding to the right if no logo
          }}
        >
          <div
            className="notification-title"
            style={{
              fontWeight: 600,
              fontSize: '14px',
              textAlign: 'justify',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              width: '100%',
              color: currentStyle.color,
            }}
          >
            {popupSettings.title}
          </div>
          {popupSettings.enableStars && (
            <div
              className="rating"
              onMouseLeave={handleMouseLeave} // Reset hover state when mouse leaves
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                marginTop: '5px',
              }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onMouseEnter={() => handleStarHover(star)}
                  onClick={() => handleStarClick(star)}
                  className="w-4 h-4"
                  fill={hoverRating >= star || rating >= star ? 'gold' : 'gray'}
                  viewBox="0 0 24 24"
                  stroke="none"
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    marginRight: '5px',
                  }}
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              ))}
            </div>
          )}
        </div>
        <button
          className="close-button"
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#cecece',
            flex: '0 0 auto',
            alignSelf: 'flex-start',
            padding: 0,
            margin: 0,
            transition: 'color 0.3s',
            lineHeight: 1,
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '20px',
            height: '20px',
            textAlign: 'center',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          &times;
        </button>
      </div>
      <div
        className="notification-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0 10px 10px',
          alignItems: 'flex-start',
        }}
      >
        <textarea
          placeholder="Add your comments here..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="text-black"
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            resize: 'none',
            width: '100%',
            height: '50px',
            fontSize: '12px',
            boxSizing: 'border-box',
          }}
        ></textarea>
        <button
          onClick={() => {}}
          style={{
            backgroundColor: '#acacac',
            color: 'white',
            border: 'none',
            padding: '10px',
            cursor: 'not-allowed',
            borderRadius: '5px',
            fontSize: '14px',
            width: '100%',
          }}
          disabled
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PreviewPopup;