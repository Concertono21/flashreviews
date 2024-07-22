document.addEventListener('DOMContentLoaded', () => {
  const currentScript = document.currentScript || document.querySelector('script[data-website]');
  if (!currentScript) {
    console.error('No script with data-website attribute found.');
    return;
  }

  const website = currentScript.getAttribute('data-website');
  if (!website) {
    console.error('data-website attribute is missing.');
    return;
  }

  console.log(`Fetching popup settings for website: ${website}`);
  fetch(`/api/get-popup-settings?website=${website}`)
    .then(response => response.json())
    .then(data => {
      console.log('Received data:', data);
      if (data && data.popups && data.popups.length > 0) {
        let currentPopupIndex = 0;

        const showPopup = () => {
          const popupData = data.popups[currentPopupIndex];
          if (!popupData) return;

          const popup = document.createElement('div');
          popup.innerHTML = `
            <div
              id="previewNotification"
              style="
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: ${popupData.style === 'dark-mode' ? '#333' : '#fff'};
                color: ${popupData.style === 'dark-mode' ? '#fff' : '#000'};
                border-radius: 20px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                transition: opacity 0.5s, transform 0.5s;
                opacity: 1;
                transform: translateX(0);
                width: 300px;
                max-width: 100%;
                cursor: default;
                padding: 10px;
              "
            >
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <div style="flex: 0 0 auto; width: 40px; height: 40px; margin-right: 10px;">
                  <img src="${popupData.logo}" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <div style="flex-grow: 1; display: flex; flex-direction: column; align-items: flex-start; max-width: calc(100% - 40px);">
                  <div style="font-weight: 600; font-size: 14px; text-align: justify; white-space: normal; word-wrap: break-word; width: 100%;">
                    ${popupData.title}
                  </div>
                </div>
                <button
                  style="
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    color: #cecece;
                    padding: 0;
                    margin: 0;
                    transition: color 0.3s;
                    line-height: 1;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                  onclick="document.getElementById('previewNotification').remove();"
                >
                  &times;
                </button>
              </div>
              <form id="popupForm">
                <div style="padding: 10px 0;">
                  ${popupData.enableStars ? `
                    <div style="display: flex; justify-content: flex-start;">
                      ${[1, 2, 3, 4, 5].map(star => `
                        <svg key="${star}" class="w-4 h-4" fill="gray" viewBox="0 0 24 24" stroke="none" style="font-size: 12px; cursor: pointer; color: grey; margin-right: 5px;" onclick="handleStarClick(${star})">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                      `).join('')}
                    </div>
                  ` : ''}
                  <textarea id="review-comments" placeholder="Add your comments here..." name="comments" style="margin-top: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px; padding: 10px; resize: none; width: 100%; height: 50px; font-size: 12px; box-sizing: border-box;"></textarea>
                  <input type="hidden" name="popupId" value="${popupData._id}">
                  <input type="hidden" name="userEmail" value="${popupData.user}">
                  <button type="submit" style="background-color: #acacac; color: white; border: none; padding: 10px; cursor: pointer; border-radius: 5px; font-size: 14px; width: 100%;">Submit</button>
                </div>
              </form>
            </div>
          `;
          document.body.appendChild(popup);

          let rating = 0;

          window.handleStarClick = (star) => {
            rating = star;
            document.querySelectorAll('svg').forEach((svg, index) => {
              svg.setAttribute('fill', index < star ? 'gold' : 'gray');
            });
          };

          const form = document.getElementById('popupForm');
          form.addEventListener('submit', (event) => {
            event.preventDefault();
            const comments = document.getElementById('review-comments').value;
            if (!popupData.enableStars && !comments.trim()) {
              alert('Please add your comments.');
              return;
            }

            const formData = new FormData(form);
            const formProps = Object.fromEntries(formData);

            fetch('/api/save-popup-answer', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...formProps,
                rating: popupData.enableStars ? rating : null, // Include the rating if stars are enabled
              }),
            })
              .then(response => {
                if (!response.ok) {
                  return response.json().then(err => { throw new Error(err.message); });
                }
                return response.json();
              })
              .then(result => {
                alert('Thank you for your feedback!');
                popup.remove();
                currentPopupIndex++;
                if (currentPopupIndex < data.popups.length) {
                  showPopup();
                }
              })
              .catch(error => {
                console.error('Error saving answer:', error);
                alert('Failed to save your feedback. Please try again.');
              });
          });
        };

        showPopup();
      } else {
        console.log('No popups available for this website.');
      }
    })
    .catch(error => {
      console.error('Error fetching popup settings:', error);
    });
});