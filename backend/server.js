const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Invite Schema
const inviteSchema = new mongoose.Schema({
    email: String,
    inviterName: String,
    accepted: { type: Boolean, default: false },
});

const Invite = mongoose.model("Invite", inviteSchema);

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY, // Replace with your Mailgun API key
    url: "https://api.mailgun.net",
});

// Send Invite API
app.post("/send-invite", async (req, res) => {
    const { email, inviterName } = req.body;
    const inviteLink = `https://your-angular-app.com/accept-invite?email=${email}`;

    try {
        // Save invite to database
        await Invite.create({ email, inviterName });

        // Send email
        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: "Daily Duel <no-reply@yourdomain.com>",
            to: email,
            subject: "You're Invited to Daily Duel!",
            html: `<p>${inviterName} has invited you to Daily Duel! Click <a href="${inviteLink}">here</a> to accept.</p>`,
        });

        res.json({ success: true, message: "Invitation sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send invite.", error });
    }
});

// Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
