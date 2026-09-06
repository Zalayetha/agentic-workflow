import { Pipeline } from "@anvia/core/pipeline";
import type { ZodObject } from "zod";
import { generateReview } from "./service";

interface ReviewInput {
  id: string,
  inputSchema: ZodObject,
  name: string,
  description: string,
  instructions:string,
}

export function review(reviewInput: ReviewInput) {
  return new Pipeline({
    id: reviewInput.id,
    inputSchema: reviewInput.inputSchema,
    name: reviewInput.name,
    description: reviewInput.description,
  }).step({
    id: "idea-review",
    run: async ({ input }) => generateReview(JSON.stringify(input), reviewInput.instructions)
  });
}
