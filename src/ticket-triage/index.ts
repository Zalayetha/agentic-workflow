import { Pipeline } from "@anvia/core/pipeline";
import z from "zod";
import { generateTriage } from "./service";
import { TicketSchema } from "./types";

// Extract type ticket fields behind a schema gate, then route by priority in TypeScript
// schema + .step()

const ticketTriagePipeline = new Pipeline({
	id: "ticket-triage",
	inputSchema: z.object({ rawTicket: z.string() }),
}).step({
	id: "extract-and-validate",
	run: async (context) => {
		const result = await generateTriage(
			context.input.rawTicket,
			"Extract category, priority (low/medium/high), and summary.",
			TicketSchema,
		);
		return result;
	},
});

const ticketDetails = await ticketTriagePipeline.run(
  {
    input: {
      rawTicket: "My payment failed and I was double charged!"
    }
  },
);

// TypeScript takes over to route by priority deterministically
if (ticketDetails.output.priority === "high") {
  console.log("Handle high priority queue");
} else {
  console.log("Handle standard queue");
}
