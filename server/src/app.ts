import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import articlesRouter from './routes/articles'
import topicsRouter from './routes/topics'
import usersRouter from './routes/users'
import { fetchAndStoreArticles } from './jobs/fetchArticles'
import { clusterAllCategories } from './jobs/clusterTopics'

dotenv.config()

const app = express()

app.use(cors({
  origin: [
    /^http:\/\/localhost:\d+$/,
    'https://news-website-blqw.vercel.app',
    'https://news-website-blqw-m2msbttzi-isha-singhal7s-projects.vercel.app'
  ]
}))

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/articles', articlesRouter)
app.use('/api/topics', topicsRouter)
app.use('/api/users', usersRouter)

app.post('/api/admin/fetch-now', async (_req, res) => {
  await fetchAndStoreArticles()
  res.json({ message: 'done' })
})

app.post('/api/admin/cluster-now', async (_req, res) => {
  await clusterAllCategories()
  res.json({ message: 'done' })
})

export default app
