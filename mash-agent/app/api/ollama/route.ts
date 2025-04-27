import { type NextRequest, NextResponse } from "next/server"
import { generateWithOllama, listOllamaModels, getOllamaModelInfo } from "@/lib/ollama-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { model, prompt, options } = body

    if (!model || !prompt) {
      return NextResponse.json({ error: "Model and prompt are required" }, { status: 400 })
    }

    const result = await generateWithOllama(model, prompt, options)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Ollama generation error:", error)
    return NextResponse.json({ error: "Failed to generate with Ollama" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const model = searchParams.get("model")

    if (model) {
      // Get info for a specific model
      const modelInfo = await getOllamaModelInfo(model)
      return NextResponse.json({ modelInfo })
    } else {
      // List all models
      const models = await listOllamaModels()
      return NextResponse.json({ models })
    }
  } catch (error) {
    console.error("Ollama API error:", error)
    return NextResponse.json({ error: "Failed to fetch Ollama data" }, { status: 500 })
  }
}

