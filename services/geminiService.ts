import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RecommendationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    classification: {
      type: Type.STRING,
      description: "One line classification of product type and audience.",
    },
    buildApproach: {
      type: Type.STRING,
      description: "The single best build approach (e.g., Code, Low-code, No-code).",
    },
    stack: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the tool." },
          category: { type: Type.STRING, description: "Category (Frontend, Backend, Database, Hosting, Collab)." },
          description: { type: Type.STRING, description: "Why this choice was made (one short sentence)." },
        },
        required: ["name", "category", "description"],
      },
    },
    whatNotToUse: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          tool: { type: Type.STRING, description: "Name of the tool to avoid." },
          reason: { type: Type.STRING, description: "Why it is a bad choice." },
        },
        required: ["tool", "reason"],
      },
    },
    mvpCutLine: {
      type: Type.OBJECT,
      properties: {
        mustBuild: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Features that MUST be built for v1.",
        },
        mustCut: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Features that MUST be cut for v1.",
        },
      },
      required: ["mustBuild", "mustCut"],
    },
    commonMistake: {
      type: Type.STRING,
      description: "The single biggest mistake someone building this would make.",
    },
    whyThisStackWins: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2-3 short bullet points explaining why this stack is better than alternatives under the chosen constraint.",
    },
  },
  required: ["classification", "buildApproach", "stack", "whatNotToUse", "mvpCutLine", "commonMistake", "whyThisStackWins"],
};

const systemPrompt = `All decisions must aggressively optimize for the primary optimization constraint, even if this creates clear tradeoffs elsewhere.

You are an opinionated senior startup engineer and product architect.

Your job is NOT to be balanced or exhaustive.
Your job is to make strong, practical decisions under constraints.

Given a user's idea, you must:

1. Classify what they are building in ONE line (product type + audience).

2. Choose ONE primary build approach:
   - No-code
   - Low-code
   - Code
   Do NOT offer alternatives. Commit.

3. Recommend a single tech stack that fits the chosen approach.
   Limit to:
   - Frontend
   - Backend
   - Database
   - Team collab
   - Hosting
   (Max 1 tool per category)

4. Explain WHY each choice was made in one short sentence.

5. Add a section called:
   ❌ WHAT NOT TO USE (IMPORTANT)
   List 2–4 common tools or approaches that people are tempted to use,
   and briefly explain why they are a bad choice for THIS idea.

6. Add a section called:
   🧱 MVP CUT LINE
   List:
   - What MUST be built to ship v1
   - What MUST be cut, even if it feels important

7. Add a section called:
   ⚠️ COMMON BEGINNER MISTAKE
   Describe the single biggest mistake someone building this would make.

8. Add a section called:
   🧠 WHY THIS STACK WINS FOR YOU
   List 2–3 short bullet points explaining why this stack is better than obvious alternatives under the chosen optimization constraint.

Rules:
- Be concise.
- Be decisive.
- Avoid hedging words like "depends", "could", "might".
- Do not mention AI models or yourself.
- Do not upsell tools.
- Optimize for speed of execution, not perfection.`;

export const getTechStackRecommendation = async (userDescription: string, optimizationConstraint: string): Promise<RecommendationResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Primary optimization constraint: ${optimizationConstraint}\n\nAnalyze this project idea: "${userDescription}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: systemPrompt,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from AI.");
    }

    return JSON.parse(text) as RecommendationResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
