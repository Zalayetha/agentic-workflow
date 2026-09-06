import { Pipeline } from "@anvia/core/pipeline";
import { Studio } from "@anvia/studio";
import z from "zod";
import { generateCritiqueArticle, generateDraftedArticle, generateRewritedArticle } from "./service";

// Article Refiner
// 1. Draft
// 2. Critique
// 3. Rewrite

const ArticleSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
});

const getRefinedArticle = new Pipeline({
  id: "article-refiner",
  inputSchema: ArticleSchema,
})
  .step({
  id: "draft",
  run: async (context) => {
    const content = context.input.content;
    const title = context.input.title;
    const result = await generateDraftedArticle(title, content);
    return result;
  }
  })
  .step({
    id: "critique",
    run: async (context) => {
      const draftTitle = context.input.draftTitle;
      const draftContent = context.input.draftContent;
      const result = await generateCritiqueArticle(draftTitle, draftContent);
      return result;
  }
  })
  .step({
    id: "rewrite",
    run: async (context) => {
      const title = context.input.draftTitle;
      const content = context.input.draftContent;
      const critique = context.input.draftCritique;

      const result = await generateRewritedArticle(title, content, critique);
      return result;
    }
  })

new Studio([getRefinedArticle]).start();
