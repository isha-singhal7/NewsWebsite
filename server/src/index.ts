import mongoose from 'mongoose'
import app from './app'

const PORT = process.env.PORT || 3001

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err)
    process.exit(1)
  })
