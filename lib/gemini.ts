import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export interface AIResponse {
  verified: boolean;
  score: number; // 0 to 100
  feedback: string;
  isAiGenerated: boolean;
  reason?: string;
}

/**
 * Converts an ArrayBuffer to a Base64 string in a browser-compatible way.
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export async function verifyProofWithAI(
  challengeDescription: string,
  proofRequirement: string,
  proofText: string,
  imageBuffer?: ArrayBuffer,
  mimeType?: string
): Promise<AIResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

    const prompt = `
      You are an AI assistant for a "7 Deadly Sins" self-discipline application. 
      Your task is to verify if the provided proof matches the challenge completion requirements and detect if it is AI-generated.

      Challenge: ${challengeDescription}
      Proof Required: ${proofRequirement}
      User's Description: ${proofText}

      INSTRUCTIONS:
      1. Analyze the ${imageBuffer ? "image and text" : "text"} provided. 
      2. Determine if it genuinely represents a completed challenge. 
      3. CRITICAL: Check if the text or image appears to be AI-generated (e.g., synthetic textures, ChatGPT-style writing, impossible details).
      4. Assign a score from 0 to 100 based on authenticity and effort. If it is AI-generated, the score MUST be below 20.

      Respond ONLY with a JSON object in this format:
      {
        "verified": boolean,
        "isAiGenerated": boolean,
        "score": number,
        "feedback": "Feedback about the proof and whether it looks like AI-generated cheating or genuine effort."
      }
    `;

    const contents: any[] = [prompt];

    if (imageBuffer && mimeType) {
      contents.push({
        inlineData: {
          data: arrayBufferToBase64(imageBuffer),
          mimeType,
        },
      });
    }

    const result = await model.generateContent(contents);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as AIResponse;
    }

    return { verified: false, isAiGenerated: false, score: 0, feedback: "Error parsing AI response." };
  } catch (error) {
    console.error("AI Verification Error:", error);
    return { verified: false, isAiGenerated: false, score: 0, feedback: "AI service error. Please check your API key and connection." };
  }
}
