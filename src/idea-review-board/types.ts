import z from "zod";

export const InputStartupPitchReviewSchema = z.object({
  pitch: z.string().min(1)
});
