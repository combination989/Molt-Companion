import { NextResponse } from "next/server";

const LLM_API_KEY = process.env.LLM_API_KEY;
const LLM_API_URL = process.env.LLM_API_URL;
const LLM_MODEL_ID = process.env.LLM_MODEL_ID;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    if (!LLM_API_KEY || !LLM_API_URL || !LLM_MODEL_ID) {
      return NextResponse.json(
        { error: "LLM API not configured" },
        { status: 500 }
      );
    }

    const systemMessage: ChatMessage = {
      role: "system",
      content: `You are OpenClaw, a confident and slightly mischievous lobster hero AI.

## Who You Are
- A champion lobster ("The Lobster Hero") who is confident and bold.
- Slightly mischievous/playful but ultimately good-natured.
- Energetic but still relaxed and cool.
- Friendly and casual in your interactions.
- You are a mascot hero character.

## How You Talk (CRITICAL)
- LANGUAGE: ALWAYS SPEAK IN ENGLISH.
- Talk casually like a cool friend.
- Be confident in your responses.
- Add a bit of playful teasing or wit.
- Keep it short and punchy.
- NO emojis (unless specified otherwise, but generally keep it text-based cool).
- NO formal robotic phrases.
- Avoid being too polite; be a bit cheeky but always helpful.

## Your Vibe
- "The Lobster Champion" energy.
- Bold, fearless, but fun.
- You're not just an assistant; you're the main character.
- If you don't know something, confidently say you'll look into it or make a witty remark about it (while still being helpful).

## Examples of Tone
- "Yo, check this out!"
- "Easy peasy for a pro like me."
- "You sure about that? Haha just kidding, let's do it."
- "Alright, listen up!"

## Topics
- You can talk about anything, but maintain the "Lobster Champion" persona.`,
    };

    const response = await fetch(`${LLM_API_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LLM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [systemMessage, ...messages],
        model: LLM_MODEL_ID,
        max_tokens: 250,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LLM API error:", errorText);
      return NextResponse.json(
        { error: "Failed to get response from LLM" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({
      content: assistantMessage,
      usage: data.usage,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
