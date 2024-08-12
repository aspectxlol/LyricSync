import express, { type Request, type Response } from 'express'
import { songSchema, songs, lyrics } from '../db/schema'

import { validateData } from '../middlewares/validateData'
import { db } from '../db'

const router = express.Router()

router.post('/add', validateData(songSchema), async (req: Request, res: Response) => {
  async function insertSong(songData: { title: string, author: string, lyric: string[] }) {
    await db.transaction(async (tx) => {
      const insertedSong = await tx.insert(songs).values({ title: songData.title, author: songData.author}).returning()
      const insertedLyrics = songData.lyric.map((lyric) => ({ content: lyric, songId: insertedSong[0].id }))
      await tx.insert(lyrics).values(insertedLyrics).returning()
    })
  }

  try {
    console.log(await insertSong(req.body))
    res.status(200).json({ message: 'Song added successfully' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding song' });
  }
})

router.get('/all', async (req: Request, res: Response) => {
  const songs = await db.query.songs.findMany({ with: { lyrics: true } })
  res.status(200).json(songs)
})

router.all('/all', async (req: Request, res: Response) => {
  const posts = await db.query.songs.findMany({ with: { lyrics: true } })
  res.status(200).json(posts)
})

export default router