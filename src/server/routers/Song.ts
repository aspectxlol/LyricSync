import SongGetSchema from '@LyricSync/schemas/Song/Get'
import SongPostSchema from '@LyricSync/schemas/Song/Post'
import SongDeleteSchema from '@LyricSync/schemas/Song/Delete'
import { procedure, router } from "../trpc";
import { PrismaClient } from '@prisma/client';

export const SongRouter = router({
  post: procedure.input(SongPostSchema).mutation(async (v) => {
    const prisma = new PrismaClient()
    prisma.$connect()
    
    const exist = await prisma.song.findUnique({ where: { title: v.input.title } })
    if (exist) {
      prisma.$disconnect()
      return {
        message: 'Song Already Exist',
        songId: exist.id
      }
    }

    const data = await prisma.song.create({
      data: {
        title: v.input.title,
        lyrics: v.input.lyrics,
      }
    })

    prisma.$disconnect()
    return data
  }),
  get: procedure.input(SongGetSchema).query(async (v) => {
    const prisma = new PrismaClient();
    prisma.$connect();

    let songs = await prisma.song.findMany({ where: { id: v.input.id, title: v.input.title } });

    if (v.input.lyric) {
      songs = songs.filter(song => song.lyrics.includes(v.input.lyric!));
    }
    prisma.$disconnect();
    return songs
  }),
  delete: procedure.input(SongDeleteSchema).query(async (v) => {
    const prisma = new PrismaClient();
    prisma.$connect();

    const deletedSongs = await prisma.song.deleteMany({ where: v.input });

    prisma.$disconnect();
    return deletedSongs
  })
})