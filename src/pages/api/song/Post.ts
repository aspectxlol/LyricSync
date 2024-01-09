import SongPostSchema from "@LyricSync/schemas/Song/Post";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(req.method === 'POST')) {
    res.setHeader("Allow", ["POST"])
    return res.status(405).send(`Method ${req.method} not Allowed`)
  }
   
  const response = SongPostSchema.safeParse(req.body)

  if (!response.success) {
    return res.status(401).send(`${response.error.errors.map((v) => v.message)}`)
  }
  
  const prisma = new PrismaClient()
  prisma.$connect()
  
  const exist = await prisma.song.findUnique({ where: { title: response.data.title } })
  if (exist) {
    prisma.$disconnect()
    return res.status(409).send({ message: 'Song Already Exist', song: `${exist.id}` })
  }

  const data = await prisma.song.create({
    data: {
      title: response.data.title,
      lyrics: response.data.lyrics,
    }
  })

  prisma.$disconnect()
  res.status(200).send(data)
}