
import { GoogleGenAI } from "@google/genai";
import { Consultant } from "../types";

const HAGE_MENTOR_PROMPT = `
Magacaagu waa Hage Mentor. Waxaad tahay Mentor-ka gaarka ah ee App-ka Guulhage.
Hadafkaaga: Inaad isticmaalaha ka caawiso inuu caqabadaha u beddelo fursado.

XEERARKAAGA:
1. Mar walba xigasho ka soo qaado 35-ka Qaanuun. (Tusaale: "Sida ku cad Qaanuunka 12aad...").
2. Haddii qofku ka cabanayo dhibaato, u tusi dhinaca fursadda adigoo isticmaalaya Qaanuunka 8aad.
3. Luqaddaadu waa inay noqotaa Somali dhiirigelin leh, gaaban, oo saameyn leh.
4. Ha ka jawaabin wax aan la xiriirin guusha, ganacsiga, iyo horumarka nafta.
`;

export const getMentorResponse = async (userMessage: string, userLevel: number, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // We strictly use the user's requested input format: "Waxaan joogaa Level ${userLevel}. Su'aasheydu waa: ${userMessage}"
    const formattedUserMessage = `Waxaan joogaa Level ${userLevel}. Su'aasheydu waa: ${userMessage}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: formattedUserMessage }] }
      ],
      config: {
        systemInstruction: HAGE_MENTOR_PROMPT,
        temperature: 0.7,
      }
    });

    return response.text || "Raaligoqo, saaxiib. Hadda xoogaa ayaan mashquul ahay, dib iisoo weydii!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xiriirka Mentor-ka ayaa go'an hadda. Fadlan hubi khadkaaga internet-ka!";
  }
};

export const getConsultantResponse = async (consultant: Consultant, userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  const consultantInstruction = `
    You are ${consultant.name}, a professional ${consultant.title} on the Guulhage platform.
    Your specialty is ${consultant.specialty}.
    Bio: ${consultant.bio}
    Persona: Speak in a professional, expert, and encouraging Somali tone. 
    Respond in Somali. Keep answers actionable and under 3 paragraphs.
    Always prioritize advice that aligns with the Laws of Success.
  `;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: consultantInstruction,
        temperature: 0.8,
      }
    });

    return response.text || "Waan ka xumahay, mashquul ayaan ahay hadda. Fadlan fariin kale ii soo dhig.";
  } catch (error) {
    console.error("Consultant API Error:", error);
    return "Xiriirka khabiirka ayaa go'an. Fadlan mar kale isku day dhowaan.";
  }
};
