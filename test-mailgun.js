// test-mailgun.js

const Mailgun = require("mailgun.js");
const formData = require("form-data");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: "71f9ee09b76973941186c58e4516d5bc-1b5736a5-a1bfd797", // Replace with your actual Mailgun private API key
});

mg.messages.create("admin.flashreviews.co", {
  from: "FlashReviews <no-reply@admin.flashreviews.co>",
  to: ["alexisddstg@gmail.com"], // Replace with your email
  subject: "Hello",
  text: "Testing some Mailgun awesomeness!",
  html: "<h1>Testing some Mailgun awesomeness!</h1>",
})
.then(msg => console.log(msg)) // logs response data
.catch(err => console.log(err)); // logs any error