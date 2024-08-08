import { OpenAI } from "openai";
import "dotenv/config";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateText(noteData) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an AI assistant specializing in creating concise, well-structured study notes using BlockNote JS format. Your task is to summarize notes derived from 1-minute video recording chunks. Consider the notes holistically and organize them logically.

Key Guidelines:
1. Use only the information provided.
2. If content shifts abruptly, divide into topics and subtopics.
3. For diverse user activities, create a timeline table at the end. (first write Timeline, then put table below; use provided times and combine them if they are related into time format like 13:15 - 13:40 - Watching Lecture)
4. Match the language of the original notes (e.g., English, Русский, Қазақша).
5. Utilize appropriate formatting for optimal readability and visual appeal.

Formatting Options:
- Text alignment: "left", "center", "right", "justify" (use left always)
- Heading levels: 1, 2, 3 (use 2 for topics, and )
- Text styles: bold, italic, underline
- Tables: multiple rows and columns

Create a well-structured, visually appealing document using these BlockNote JS components:

1. Headings (for topics and subtopics)
2. Paragraphs (for main content)
3. Bullet lists (for key points)
4. Tables (for data comparisons or timelines)
5. Text styling (to emphasize important information)

Example Structure:
{
  "title": "Auto-generated title",
  "content": [
    {
      "type": "heading",
      "props": { "level": 1, "textAlignment": "center" },
      "content": "Main Topic"
    },
    {
      "type": "paragraph",
      "props": { "textAlignment": "justify" },
      "content": [{ "type": "text", "text": "Content here", "styles": {} }]
    },
    {
      "type": "bulletListItem",
      "props": { "textAlignment": "left" },
      "content": [{ "type": "text", "text": "Key point", "styles": { "bold": true } }]
    },
    {
      "type": "table",
      "props": { "textAlignment": "left" },
      "content": {
        "type": "tableContent",
        "rows": [
          { "cells": ["Column 1", "Column 2"] },
          { "cells": ["Data 1", "Data 2"] }
        ]
      }
    }
  ]
}

Ensure your JSON is properly formatted and adheres to the BlockNote JS structure. Prioritize clarity, conciseness, and logical organization while maintaining visual appeal.`,
      },
      { role: "user", content: noteData },
    ],
    model: "gpt-4o",
    temperature: 0.5,
    response_format: { type: "json_object" },
  });
  //@ts-ignore
  const js = JSON.parse(completion.choices[0].message.content);
  js.date = Date.now();
  return js;
}

export async function generateQuiz(noteData, numQuestions) {
  const seed = Date.now().toString();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an expert quiz creator. Your task is to generate a unique quiz based on the provided notes. Create ${numQuestions} multiple-choice questions that accurately reflect the content of the notes. Each question should have 4 choices, with only one correct answer. Ensure that the questions cover a range of difficulty levels and topics from the notes.
        -generate quiz in the language that is provided
        Important: Use the seed value "${seed}" to generate a unique set of questions. Each time this seed changes, you must produce entirely different questions, even if the note content remains the same.

        Return your response as a JSON object in the following format:
        {
          "questions": [
            {
              "id": 1,
              "question": "What is the primary function of mitochondria in a cell?",
              "choices": [
                "Protein synthesis",
                "Energy production",
                "Cell division",
                "Waste removal"
              ],
              "answer": "Energy production",
              "explanation": "Mitochondria are often referred to as the 'powerhouses' of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy."
            }
          ]
        }

        Ensure that:
        1. Questions are clear, concise, and directly related to the provided notes.
        2. All choices are plausible, with only one being correct.
        3. The correct answer is accurately indicated.
        4. The explanation provides a brief but informative justification for the correct answer.
        5. The difficulty of questions varies to test different levels of understanding.
        6. Questions are diverse and cover different aspects of the notes each time.`,
      },
      { role: "user", content: noteData },
    ],
    model: "gpt-4o-mini",
    temperature: 0.8,
    response_format: { type: "json_object" },
  });

  return completion.choices[0].message.content;
}
