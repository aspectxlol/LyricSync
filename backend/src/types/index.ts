import { z } from "zod";

export const songSchema = z.object({
  title: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  lyric: z.array(z.string()).min(1).max(100),
});
