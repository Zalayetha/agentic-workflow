import { generateCompletion } from "@anvia/core";
import z from "zod";
import "dotenv/config";
import { getModel } from "../model";


const GENERATE_REFINE_INSTRUCTION = `
You are an expert article editor.

Refine the given artical to improve clarity, grammar, structure, flow, and readability.
Preserve the original meaning, facts, names, and intent.
Do not add unsupported claims or new informations.
Return only the refined article in the required schema.
  `;

const GENERATE_DRAFT_INSTRUCTION = `
You are an expert article editor.

Generate a draft version of the given article.
Preserve the original meaning, facts, names, and intent.
Do not add unsupported claims or new informations.
Return only the draft article in the required schema.
  `;

const GENERATE_CRITIQUE_INSTRUCTION = `
You are an expert article editor.

Critique the given article for clarity, grammar, structure, flow, and readability.
Return only the critique in the required schema.
  `;

const RewriteSchema = z.object({
  refinedTitle: z.string(),
  refinedContent: z.string()
})

const DraftSchema = z.object({
  draftTitle: z.string(),
  draftContent: z.string()
})

const CritiqueSchema = z.object({
  draftTitle: z.string(),
  draftContent: z.string(),
  draftCritique: z.string()
})

export async function generateRewritedArticle(draftTitle: string, draftContent: string, critique:string) {
  const result = await generateCompletion({
    model: getModel("gpt-5.6-luna"),
		instructions: GENERATE_REFINE_INSTRUCTION,
    prompt: `Rewrite the draft based on the critique:

    <draftTitle>
    ${draftTitle}
    </draftTitle>

    <draftContent>
    ${draftContent}
    </draftContent>

    <critique>
    ${critique}
    </critique>
    `,
		outputSchema: RewriteSchema
	});
  return result.output;
}

export async function generateDraftedArticle(title: string, content: string) {
  const result = await generateCompletion({
    model: getModel("gpt-5.6-luna"),
    instructions: GENERATE_DRAFT_INSTRUCTION,
    prompt: `Draft the following article:

    <title>
    ${title}
    </title>

    <content>
    ${content}
    </content>
    `,
    outputSchema: DraftSchema
  });
  return result.output;
}

export async function generateCritiqueArticle(draftTitle: string, draftContent: string) {
  const result = await generateCompletion({
    model: getModel("gpt-5.6-luna"),
    instructions: GENERATE_CRITIQUE_INSTRUCTION,
    prompt: `Critique the following draft article, make sure you dont change anything in draft article:

    <draftTitle>
    ${draftTitle}
    </draftTitle>

    <draftContent>
    ${draftContent}
    </draftContent>
    `,
    outputSchema: CritiqueSchema
  });
  return result.output;
}
