import { NextRequest, NextResponse } from "next/server";

interface Message {
  role: string;
  content: string;
}

interface RequestBody {
  messages: Message[];
  model: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as RequestBody;
    const { messages, model = "llama2" } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required" },
        { status: 400 }
      );
    }

    // Format messages for Ollama
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Connect to Ollama API
    // Note: Update the URL if your Ollama instance is hosted elsewhere
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: formattedMessages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Ollama API error:", errorData);
      return NextResponse.json(
        { error: "Error from Ollama API", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      response: data.message?.content || "No response generated",
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Server error processing request" },
      { status: 500 }
    );
  }
} 