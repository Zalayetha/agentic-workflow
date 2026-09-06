import { generateCompletion } from "@anvia/core";
import { getModel } from "../model";
import type { TicketSchema } from "./types";

// Service for Ticket Triage
export async function generateTriage(rawTicket: string, instructions: string, outputSchema: typeof TicketSchema) {
  const result = await generateCompletion({
    model: getModel("gpt-5.6-luna"),
    instructions: instructions,
    prompt: rawTicket,
    outputSchema
  });

  return result.output;
}
