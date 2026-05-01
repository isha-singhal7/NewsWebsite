import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import app from '../src/app'

if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGODB_URI!)
}

export default app