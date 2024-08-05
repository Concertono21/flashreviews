import React, { useState } from 'react';
import Image from 'next/image';

const PreviewPopup = ({ popupSettings, handleClose }) => {
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleStarHover = (star) => {
    setRating(star);
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmit = async () => {
    const review = {
      title: popupSettings.title,
      rating,
      comments,
      website: popupSettings.website,
    };

    try {
      const response = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        setComments(''); // Clear the comments after submission
        setRating(0); // Reset the rating after submission
      } else {
        const result = await response.json();
        alert(result.message || 'Failed to submit review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while submitting your review.');
    }

    handleClose();
  };

  const generateCode = () => {
    const code = `
      <script src="${process.env.NEXT_PUBLIC_BASE_URL}/embed.js" data-website="${popupSettings.website}"></script>
    `;
    setGeneratedCode(code);
  };

  return (
    <div
      id="previewNotification"
      className={`notification ${popupSettings.style}`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
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
      }}
    >
      <div
        className="notification-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          position: 'relative',
        }}
      >
        <div
          className="notification-icon"
          style={{
            flex: '0 0 auto',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '5px',
            marginLeft: '10px',
          }}
        >
          {popupSettings.logo && (
            <Image
              src={popupSettings.logo}
              alt="Logo"
              width={40}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>
        <div
          className="notification-title-container"
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: 'calc(100% - 40px)',
            paddingRight: '30px',
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
              color: 'black',
            }}
          >
            {popupSettings.title}
          </div>
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
        {popupSettings.enableStars && (
          <div
            className="rating"
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              margin: 0,
              marginTop: '5px',
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onMouseEnter={() => handleStarHover(star)}
                onClick={() => handleStarClick(star)}
                className="w-4 h-4"
                fill={rating >= star ? 'gold' : 'gray'}
                viewBox="0 0 24 24"
                stroke="none"
                style={{
                  fontSize: '12px',
                  cursor: 'pointer',
                  color: 'grey',
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
          onClick={handleSubmit}
          style={{
            backgroundColor: '#acacac',
            color: 'white',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '14px',
            width: '100%',
          }}
        >
          Submit
        </button>
        <button
          onClick={generateCode}
          style={{
            backgroundColor: '#bafd00',
            color: 'black',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '14px',
            width: '100%',
            marginTop: '10px',
          }}
        >
          Generate Code
        </button>
        {generatedCode && (
          <textarea
            readOnly
            value={generatedCode}
            style={{
              marginTop: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              resize: 'none',
              width: '100%',
              height: '150px',
              fontSize: '12px',
              boxSizing: 'border-box',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PreviewPopup;