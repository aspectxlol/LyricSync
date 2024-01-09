import { z } from "zod";

export default z.object({
  title: z.string(),
  lyrics: z.array(z.string()),
});