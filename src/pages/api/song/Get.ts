import { NextApiRequest, NextApiResponse } from "next";
import GetSchema from "@LyricSync/schemas/Song/Get";
import { PrismaClient } from "@prisma/client";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse
) {
  if (!(req.method === 'GET')) {
    res.setHeader("Allow", ["GET"])
    return res.status(405).send(`Method ${req.method} not Allowed`)
  }

  const response = GetSchema.safeParse(req.query);

  if (!response.success) {
    return res.status(400).send(`Invalid query parameters: ${response.error.errors.map((v) => v.message)}`)
  }

  const prisma = new PrismaClient();
  prisma.$connect();

  let songs = await prisma.song.findMany({ where: { id: response.data.id, title: response.data.title } });

  if (response.data.lyric) {
    songs = songs.filter(song => song.lyrics.includes(response.data.lyric!));
  }
  prisma.$disconnect();
  res.status(200).send(songs);
}