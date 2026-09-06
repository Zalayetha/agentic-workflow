import { Pipeline } from "@anvia/core/pipeline";
import { review } from "./review-pipeline";
import {
  ANALYST_INSTRUCTIONS,
  CEO_INSTRUCTIONS,
  CTO_INSTRUCTIONS,
  FINAL_REVIEW_INSTRUCTION,
  generateReview
} from "./service";
import { InputStartupPitchReviewSchema } from "./types";

// Fan one startup pitch to CEO, analyst, and CTO branches, then merge the verdicts
// .parallel() + .step()


const ideaReview = new Pipeline({
  id: 'idea-review-board',
  inputSchema: InputStartupPitchReviewSchema,
  name: "Idea Review Board",
  description: "Reviews a startup pitch by faning it to analyst, CTO, and CEO branches, then merging the verdicts.",
})
  .parallel({
    id: "perspectives",
    branches: {
      analyst: review({
        id: "analyst",
        inputSchema: InputStartupPitchReviewSchema,
        name: "Analyst",
        description: "Reviews the startup pitch from the analyst perspective.",
        instructions: ANALYST_INSTRUCTIONS
      }),
      cto: review({
        id: "cto",
        inputSchema: InputStartupPitchReviewSchema,
        name: "Chief Technology Officer",
        description: "Reviews the startup pitch from the CTO perspective.",
        instructions: CTO_INSTRUCTIONS
      }),
      ceo: review({
        id: "ceo",
        inputSchema: InputStartupPitchReviewSchema,
        name: "Chief Executive Officer",
        description: "Reviews the startup pitch from the CEO perspective.",
        instructions: CEO_INSTRUCTIONS
      }),
    }
  })
  .step({
    id: "merge",
    run: async ({ input }) => generateReview(JSON.stringify(input), FINAL_REVIEW_INSTRUCTION)
  });


const result = await ideaReview.run({
  input: {
    pitch: "An AI agent for GitHub that automatically detects CI/CD test failures, reproduces bugs in a sandbox, and opens a PR with a fix."
  }
});

console.log(result.output);
