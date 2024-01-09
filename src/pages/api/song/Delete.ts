import { NextApiRequest, NextApiResponse } from "next";
import DeleteSchema from "@LyricSync/schemas/Song/Delete";
import { PrismaClient } from "@prisma/client";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse
) {
 if (!(req.method === 'DELETE')) {
 res.setHeader("Allow", ["DELETE"])
 return res.status(405).send(`Method ${req.method} not Allowed`)
 }

 const response = DeleteSchema.safeParse(req.query);

 if (!response.success) {
 return res.status(400).send(`Invalid query parameters: ${response.error.errors.map((v) => v.message)}`)
 }

 const prisma = new PrismaClient();
 prisma.$connect();

 const deletedSongs = await prisma.song.deleteMany({ where: response.data });

 prisma.$disconnect();
 res.status(200).send(deletedSongs);
}