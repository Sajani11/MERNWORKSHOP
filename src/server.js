import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import noteRoutes from './routes/noteRoutes.js' 
import dotenv from 'dotenv'

dotenv.config()  //.env file load gareko 

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notesapp'
const PORT = process.env.PORT || 5001

const app = express() //routes control garxa

// Middleware
 //error check garxa max chai update garda error ayo vane   ::: mero backend chai kun kun frontend bata access garna milxa vanera
app.use(cors({
  origin: 'https://mernworkshopfrontend.vercel.app', // your Vercel frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

 app.use(express.json()) // jun kunai data json format maa xa ki n ai check garxa 

// Health check endpoint             test garna ko lagi
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is Live' })
})

// Routes
app.use('/api/notes', noteRoutes)

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB Connection error:', err))

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`)
})
