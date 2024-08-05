// pages/api/dashboard/popups.js

if (req.method === 'POST') {
  const { title, logo, rating, timing, style, website, code, enableStars } = req.body;

  // Validate required fields
  if (!title || !logo || rating === undefined || !timing || !style || !website || !code || enableStars === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate rating
  const validRating = rating === 'yes' ? true : rating === 'no' ? false : null;
  if (validRating === null) {
    return res.status(400).json({ message: 'Rating must be "yes" or "no"' });
  }

  // Validate timing
  const validTiming = parseInt(timing, 10);
  if (isNaN(validTiming) || validTiming < 0) {
    return res.status(400).json({ message: 'Timing must be a non-negative integer' });
  }

  // Validate style
  const validStyles = ['classic-white', 'dark-mode', 'apple-notification', 'style4', 'style5'];
  if (!validStyles.includes(style)) {
    return res.status(400).json({ message: 'Invalid style' });
  }

  const newPopup = {
    title,
    logo,
    rating: validRating,
    timing: validTiming,
    style,
    website,
    user: token.email,
    enableStars: enableStars,
    code, // Store the entire popup code
  };

  const result = await popupsCollection.insertOne(newPopup);
  console.log('New popup created:', newPopup);

  return res.status(201).json({ message: 'Popup saved successfully', popup: { ...newPopup, _id: result.insertedId } });
}