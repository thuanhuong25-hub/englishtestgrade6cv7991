
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateTest(materials: string, customPrompt: string = "") {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [
        {
          text: `MATERIALS:\n${materials}\n\nUSER REQUEST: ${customPrompt || "Generate a complete MoET-compliant test version."}`
        }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });

    try {
      const result = JSON.parse(response.text || '{}');
      return result;
    } catch (error) {
      console.error("Failed to parse AI response as JSON", error);
      throw new Error("Invalid response format from AI");
    }
  }

  async extractMetadata(content: string) {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this content and extract: 1. Main Topics 2. Core Vocabulary 3. Target Grammar Structures. Return as a brief JSON. Content: ${content.substring(0, 5000)}`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{}');
  }
}

export const geminiService = new GeminiService();
