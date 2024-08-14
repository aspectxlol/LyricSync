import express, { type Request, type Response } from 'express'
import multer from 'multer'
import { background } from '../db/schema'
import { db } from '../db'
import { desc, eq } from 'drizzle-orm'
import fs from 'fs/promises'
import path from 'path'

const router = express.Router()
const BackgroundStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'db/backgrounds/')
  },
  filename: (req, file, cb) => {
    cb(null, crypto.randomUUID() + '.png')
  },
})
const backgroundUpload = multer({ storage: BackgroundStorage, limits: { fileSize: 1024 * 1024 * 10 } })

router.post('/add', backgroundUpload.single('background'), async (req: Request, res: Response) => {
  const file = req.file
  if (!file) {
    res.status(400).json({ message: 'No file uploaded' })
    return
  }
  if (file.size > 1024 * 1024 * 10) {
    res.status(400).json({ message: 'File too large' })
    return
  }
  if (file.mimetype !== 'image/png') {
    res.status(400).json({ message: 'File must be a PNG' })
    return
  }

  const result = await db.transaction(async (tx) => {
    const insertedBackground = await tx.insert(background).values({ fileName: file.filename, originalName: file.originalname }).returning()
    return insertedBackground[0]
  })
  res.status(200).json(result)
})

router.get('/get/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await db.transaction(async (tx) => {
    const returnedBackground = await tx.select().from(background).where(eq(background.fileName, id))
    return returnedBackground[0]
  })
  try {
    const file = await fs.readFile(path.join(process.cwd(), 'db/backgrounds/' + result.fileName))
    if (!file) {
      res.status(404).json({ message: 'Background not found' })
      return
    }
    res.setHeader('Content-Type', 'image/png')
    res.send(file)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.get('/get', async (req: Request, res: Response) => {
  const result = await db.transaction(async (tx) => {
    const returnedBackground = await tx.select().from(background).orderBy(desc(background.id))
    return returnedBackground
  })
  res.status(200).json(result)
})  

export default router