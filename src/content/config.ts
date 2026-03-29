import { defineCollection, z } from "astro:content";

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
    series: z
      .object({
        name: z.string(),
        part: z.number(),
      })
      .optional(),
  }),
});

export const collections = { writing };
