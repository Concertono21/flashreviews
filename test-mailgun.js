// test-mailgun.js
require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-3651307a9523a0641e4d7c7246e77c59-1b5736a5-efb323a2', // Ensure the key starts with 'key-'
  url: 'https://api.mailgun.net' // Use 'https://api.eu.mailgun.net' if your domain is in the EU region
});

mg.messages.create('admin.flashreviews.co', { // Use your verified domain here
  from: "FlashReviews <no-reply@admin.flashreviews.co>",
  to: ["alexisddstg@gmail.com"], // Replace with your email
  subject: "Hello",
  text: "Testing some Mailgun awesomeness!",
  html: "<h1>Testing some Mailgun awesomeness!</h1>",
})
.then(msg => console.log("Email sent:", msg)) // logs response data
.catch(err => console.log("Error sending email:", err)); // logs any error