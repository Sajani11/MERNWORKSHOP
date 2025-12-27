import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import noteRoutes from './routes/noteRoutes.js' 
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notesapp'
const PORT = process.env.PORT || 5001

const app = express()

// Middleware
app.use(cors())  //error check garxa max chai update garda error ayo vane 
app.use(express.json()) // jun kunai data json format maa xa ki n ai check garxa 

// Health check endpoint
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
