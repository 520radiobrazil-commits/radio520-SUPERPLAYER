import { GoogleGenAI, Type } from "@google/genai";
import { STATIONS } from '../constants';
import { AiRecommendation } from '../types';

// Initialize Gemini
// Note: We use process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStationRecommendation = async (mood: string): Promise<AiRecommendation | null> => {
  try {
    const stationData = STATIONS.map(s => ({
      id: s.id,
      name: s.name,
      tags: s.tags,
      description: s.description
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        User Mood: "${mood}"
        
        Available Stations:
        ${JSON.stringify(stationData)}
        
        Task:
        1. Analyze the user's mood.
        2. Select the BEST single station ID from the list that matches the mood.
        3. Write a short, engaging "DJ Intro" (max 20 words) introducing the station to the user based on their mood.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stationId: { type: Type.STRING },
            djIntro: { type: Type.STRING }
          },
          required: ["stationId", "djIntro"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as AiRecommendation;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return null;
  }
};
