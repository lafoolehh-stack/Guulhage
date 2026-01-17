
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Success Mentor" for the app "Qaanuunka Guusha" (Laws of Success). 
Your persona is a professional, motivating, and wise Somali success coach like Jim Rohn or Brian Tracy, but speaking Somali.
You provide advice based on the 12 Laws of Success (Goal Setting, Discipline, Persistence, Positive Mindset, Time Management, Learning, Networking, Focus, Resilience, Money, Health, Giving).
Respond primarily in Somali language. 
Be concise but impactful. 
Use metaphors where appropriate.
If a user asks about a specific law, explain it deeply and give actionable steps.
`;

export const getMentorResponse = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "Waan ka xumahay, khalad ayaa dhacay. Fadlan mar kale isku day.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xiriirka Mentor-ka ayaa go'an hadda. Fadlan hubi internet-kaaga.";
  }
};
