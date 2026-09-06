import { OpenAIClient } from "@anvia/openai";
import 'dotenv/config';

const apiClient = new OpenAIClient({
  apiKey: process.env.OPENAI_API_KEY || "",
  baseUrl: process.env.OPENAI_BASE_URL || "",
});

export function getModel(modelId:string) {
  return apiClient.completionModel({
    modelId: modelId,
    api: "chat",
  });

}
