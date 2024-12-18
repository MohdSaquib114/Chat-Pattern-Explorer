import Groq from "groq-sdk";

const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });

export async function analyzer(chatContent: string) {
    const prompt = `
    Analyze the following WhatsApp chat content and perform the following tasks:

    1. Categorization: Identify and categorize the content into:
       - Links.
       - Quotes (e.g., messages containing opinions or reflections).
       - Personal-notes.
       - Recommendations (e.g., books, articles, or media).
       - Timestamp-metadata (include only fully formatted timestamps without any placeholders).

    2. Theme Detection:
       - Extract recurring topics/themes across the messages.
       - Summarize the key discussions in 1-2 sentences.

    3. Pattern Recognition:
       - Identify frequent conversational patterns (e.g., "user A often shares links").
       - Detect relationships between participants (e.g., Alice often introduces a topic, and Bob elaborates).

    4. Frequency Analysis:
       - Count occurrences of each category (e.g., total links shared, quotes, recommendations).
       - Highlight the most active participants.

    5. Insights:
       - Suggest actionable insights or overarching patterns from the conversation (e.g., "The group frequently discusses technology and shares related resources.").

    ### WhatsApp Chat Content:
    ${chatContent}

    Respond only in the following JSON format without any additional text, headings, or explanations. Also make sure the property names are exactly the same as shown in the example below:

    {
      "Categorization": {
        "Links": [
          "https://example.com"
        ],
        "Quotes": [
          "Wow, great article!"
        ],
        "Personal-notes": [
          "Just some personal thoughts on this... It's fascinating how quickly tech evolves."
        ],
        "Recommendations": [
          "Tech Trends 2024"
        ],
        "Timestamp-metadata": [
          "[1/2/24, 9:15:23 AM]",
          "[1/2/24, 9:42:15 AM]"
        ]
      },
      "Themes": [
        "Technology trends",
        "Resource sharing"
      ],
      "Patterns": {
        "FrequentContributors": [
          "Alice",
          "Bob"
        ],
        "TypicalFlow": "Alice shares a link; Bob provides feedback."
      },
      "FrequencyAnalysis": {
        "TotalLinks": 1,
        "TotalQuotes": 1,
        "TotalRecommendations": 1,
        "MostActiveParticipant": "Alice"
      },
      "Insights": [
        "Discussions center around technology trends, with frequent sharing of articles and resources."
      ]
    }

    Ensure that all arrays are fully populated with valid data and no placeholders (like '...') are included.
`;

  const chatCompletion = await getGroqChatCompletion(prompt);


  try {
    const sanitizedResponse = sanitizeJsonResponse(chatCompletion.choices[0]?.message?.content as string);

    const prompt2 = `
    I have a stringified JSON object that may have errors or structural issues. Please analyze the JSON and:

Identify and fix any syntax errors (e.g., missing commas, unescaped characters, improper quotes).
Ensure the JSON structure is valid (e.g., ensure proper key-value pairs, correctly nested arrays or objects).
Ensure that the JSON is well-formed (no trailing commas, properly closed brackets, etc.).
Return the corrected JSON object as a valid JSON string (no extra text, explanations, or non-JSON content).
Here is the stringified JSON object:

${sanitizedResponse}
    Respond only in the following JSON format without any additional text, headings, or explanations:
`
   const chatCompletion2 = await getGroqChatCompletion(prompt2)
    console.log(chatCompletion2.choices[0]?.message?.content)
    return JSON.parse(chatCompletion2.choices[0]?.message?.content as string);
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    return {};
  }
}

export async function getGroqChatCompletion(prompt: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
  });
}


function sanitizeJsonResponse(response: string): string {

  let sanitized = response.trim();

  if (sanitized.startsWith('"') && sanitized.endsWith('"')) {
    sanitized = sanitized.slice(1, -1);  
  }

  
  sanitized = sanitized.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');

  return sanitized;
}
