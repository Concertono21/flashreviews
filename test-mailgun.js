// test-mailgun.js

import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: "your-mailgun-api-key", // Replace with your actual API key
});

const sendTestEmail = async () => {
  try {
    const response = await mg.messages.create("admin.flashreviews.co", {
      from: "FlashReviews <no-reply@admin.flashreviews.co>",
      to: "your-email@example.com", // Replace with your email
      subject: "Test Email",
      text: "This is a test email from Mailgun.",
      html: "<p>This is a test email from Mailgun.</p>",
    });
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Error sending test email:", error);
  }
};

sendTestEmail();