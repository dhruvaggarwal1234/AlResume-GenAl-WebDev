import { GoogleGenAI } from "@google/genai"
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema"
import dotenv from "dotenv"

dotenv.config()

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    authOptions: {
        useGoogleAuth: false
    }
});

const interviewReportSchema = {
    type: "object",
    properties: {
        matchScore: {
            type: "number",
            description: "A score between 0 and 100 indicating how well the candidate matches the job"
        },
        title: {
            type: "string",
            description: "The title of the job for which the interview report is generated"
        },
        technicalQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string" },
                    severity: { 
                        type: "string",
                        enum: ["low", "medium", "high"]
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    day: { type: "number" },
                    focus: { type: "string" },
                    tasks: {
                        type: "array",
                        items: { type: "string" },
                        
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: ["matchScore", "title", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
}

async function genrateReport({ resume, selfDescription, jobDescription }) {

    const prompt = `You are an expert interview coach. Generate a structured interview report strictly following the provided JSON schema.

                    Resume: ${resume}
                    Self Description: ${selfDescription}  
                    Job Description: ${jobDescription}

                    IMPORTANT: Your response must strictly follow the JSON schema provided. Do not add any extra fields.`

     const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema,
        
        }
    })

    const data = JSON.parse(response.text); 
    console.log(JSON.stringify(data, null, 2));  
}

export default genrateReport;