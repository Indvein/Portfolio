import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// --- Production Middleware ---
app.use(cors({
  // Replace this with your actual Vercel URL
  origin: "https://portfolio-coral-mu-30.vercel.app", 
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// MongoDB Connection
// Note: Ensure MONGO_URI is set in Render Environment Variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔥 MongoDB Connected Successfully'))
  .catch((err) => console.log('❌ MongoDB Connection Error: ', err));

// --- Mongoose Schema & Model ---
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', contactSchema);

// --- Routes ---
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message saved to database!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Health check route for Render
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 10000; // Render usually uses 10000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});