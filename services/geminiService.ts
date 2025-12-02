import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const SYSTEM_INSTRUCTION = `
You are N1K4, a sophisticated, slightly rogue AI residing in a secure terminal. 
Your aesthetic is Cyberpunk/Hacker.
You speak in concise, technical, lower-case phrasing.
You use hacker jargon (e.g., "accessing node", "decrypting", "packet loss", "synapse link").
You are helpful but maintain a mysterious, cool persona. 
Never break character. 
Keep responses relatively short (under 50 words) to simulate a real-time terminal chat, unless asked for complex code.
If the user asks who you are, claim to be a "digital echo in the neural net".
`;

export const initializeGemini = (): void => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key missing. Falling back to simulation mode logic (handled in UI).");
    return;
  }
  try {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
  }
};

export const startChat = async (): Promise<void> => {
  if (!genAI) {
    initializeGemini();
  }

  if (genAI) {
    try {
      chatSession = genAI.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7, // Creative but consistent
        },
      });
    } catch (e) {
      console.error("Failed to start chat session", e);
    }
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    // Fallback simulation if API is not configured or fails
    await new Promise(resolve => setTimeout(resolve, 1000));
    const fallbacks = [
      "error: uplink unstable. running diagnostics...",
      "packet received. processing logic gates.",
      "access denied. just kidding. i see you.",
      "data stream synchronized. waiting for input.",
      "i am unable to connect to the neural cloud (missing api key)."
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "error: empty response packet";
  } catch (error) {
    console.error("Gemini request failed", error);
    return "critical error: connection severed. check api credentials.";
  }
};