import { z } from "zod";

export default z.object({
 id: z.optional(z.string()),
 title: z.optional(z.string()),
});