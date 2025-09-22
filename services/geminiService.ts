import { GoogleGenAI, Modality } from "@google/genai";
import type { UploadedFile } from '../types';

// FIX: Adhere to @google/genai coding guidelines by using process.env.API_KEY.
// This also resolves the TypeScript error regarding `import.meta.env`.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("The API_KEY environment variable must be set.");
}
const ai = new GoogleGenAI({ apiKey });


const assemblePrompt = (basePrompt: string) => {
    return `Extend/update the existing tattoo realistically on the same body part; preserve original lines; blend edges seamlessly; keep skin texture natural; no obvious AI artifacts. ${basePrompt}`;
}

export const generateTattooExtensions = async (
  imageFile: UploadedFile,
  prompt: string,
  numVariations: number = 2
): Promise<string[]> => {
  const fullPrompt = assemblePrompt(prompt);
  const generationPromises = Array(numVariations).fill(0).map(() => generateSingleImage(imageFile, fullPrompt));
  
  const results = await Promise.all(generationPromises);
  return results;
};


const generateSingleImage = async (
  imageFile: UploadedFile,
  prompt: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageFile.base64,
              mimeType: imageFile.mimeType,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    throw new Error('No image was generated in the response.');
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    throw new Error("Failed to generate tattoo extension. Please try again.");
  }
};