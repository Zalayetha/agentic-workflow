import z from "zod";

export const TicketSchema = z.object({
  category: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  summary: z.string(),
});
