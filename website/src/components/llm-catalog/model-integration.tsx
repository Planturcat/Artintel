"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function ModelIntegration() {
  const [language, setLanguage] = useState<"javascript" | "python" | "curl">(
    "javascript",
  );
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (language) {
      case "javascript":
        return `// Install the SDK: npm install @artintel/sdk

import { ArtIntelClient } from '@artintel/sdk';

// Initialize the client with your API key
const client = new ArtIntelClient({
  apiKey: 'YOUR_API_KEY',
});

async function generateText() {
  try {
    // Basic text generation
    const response = await client.generate({
      model: 'phoenix-7b',
      prompt: 'Explain quantum computing in simple terms',
      maxTokens: 150,
      temperature: 0.7,
    });
    
    console.log(response.text);
    
    // Streaming response
    const stream = await client.generateStream({
      model: 'phoenix-7b',
      prompt: 'Write a short story about a robot',
      maxTokens: 500,
    });
    
    for await (const chunk of stream) {
      process.stdout.write(chunk.text);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

generateText();`;
      case "python":
        return `# Install the SDK: pip install artintel-sdk

from artintel import ArtIntelClient

# Initialize the client with your API key
client = ArtIntelClient(api_key="YOUR_API_KEY")

# Basic text generation
response = client.generate(
    model="phoenix-7b",
    prompt="Explain quantum computing in simple terms",
    max_tokens=150,
    temperature=0.7
)

print(response.text)

# Streaming response
for chunk in client.generate_stream(
    model="phoenix-7b",
    prompt="Write a short story about a robot",
    max_tokens=500
):
    print(chunk.text, end="")`;
      case "curl":
        return `# Basic text generation
curl -X POST https://api.artintel.ai/v1/generate \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "phoenix-7b",
    "prompt": "Explain quantum computing in simple terms",
    "max_tokens": 150,
    "temperature": 0.7
  }'

# Streaming response
curl -X POST https://api.artintel.ai/v1/generate/stream \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "phoenix-7b",
    "prompt": "Write a short story about a robot",
    "max_tokens": 500
  }'`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 font-mono" data-oid="a-p.asa">
      <div
        className="flex items-center justify-between mb-4"
        data-oid=":.1kjms"
      >
        <div className="text-[#00cddd]" data-oid="69xdmo8">
          &gt; show integration_guide
        </div>
        <div className="flex gap-2" data-oid="o5k5qq1">
          <Button
            size="sm"
            variant={language === "javascript" ? "default" : "outline"}
            className={
              language === "javascript" ? "bg-[#00cddd] text-black" : ""
            }
            onClick={() => setLanguage("javascript")}
            data-oid="0joif1y"
          >
            JavaScript
          </Button>
          <Button
            size="sm"
            variant={language === "python" ? "default" : "outline"}
            className={language === "python" ? "bg-[#00cddd] text-black" : ""}
            onClick={() => setLanguage("python")}
            data-oid="40gdldl"
          >
            Python
          </Button>
          <Button
            size="sm"
            variant={language === "curl" ? "default" : "outline"}
            className={language === "curl" ? "bg-[#00cddd] text-black" : ""}
            onClick={() => setLanguage("curl")}
            data-oid="2krb5dz"
          >
            cURL
          </Button>
        </div>
      </div>

      <div className="relative" data-oid="_ruiq98">
        <pre
          className="bg-background/50 p-4 rounded border border-border/30 text-sm overflow-x-auto"
          data-oid="93iaswz"
        >
          {getCode()}
        </pre>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 p-0"
          onClick={handleCopy}
          data-oid="-:khfvb"
        >
          {copied ? (
            <Check className="h-4 w-4" data-oid="n0knn9." />
          ) : (
            <Copy className="h-4 w-4" data-oid="4yddosk" />
          )}
        </Button>
      </div>

      <div className="mt-6 space-y-4 text-sm" data-oid="2ynkb7y">
        <div data-oid="s-7n0zc">
          <h3 className="font-bold mb-2" data-oid="oa6b6lm">
            Integration Steps:
          </h3>
          <ol
            className="list-decimal list-inside space-y-2 text-muted-foreground"
            data-oid="6071hca"
          >
            <li data-oid="-cszg11">
              Sign up for an account and get your API key from the dashboard.
            </li>
            <li data-oid="rnxg4ew">
              Install the SDK for your preferred language using npm, pip, or
              another package manager.
            </li>
            <li data-oid="0t5az-e">
              Initialize the client with your API key as shown in the example.
            </li>
            <li data-oid="6yzj5m:">
              Make API calls to generate text, with options for streaming or
              non-streaming responses.
            </li>
            <li data-oid="6wr2v-_">
              Handle the response in your application as needed.
            </li>
          </ol>
        </div>

        <div data-oid="lk4:79b">
          <h3 className="font-bold mb-2" data-oid="x0z8_05">
            Key Parameters:
          </h3>
          <ul className="space-y-2" data-oid="oq632jn">
            <li data-oid="qei061f">
              <span className="text-[#00cddd]" data-oid="yd7.l7_">
                model
              </span>
              : The model ID to use (e.g., "phoenix-7b")
            </li>
            <li data-oid="ts3ixmc">
              <span className="text-[#00cddd]" data-oid="42ulxge">
                prompt
              </span>
              : The input text to generate from
            </li>
            <li data-oid="h3:0hig">
              <span className="text-[#00cddd]" data-oid="m85lv:6">
                max_tokens
              </span>
              : Maximum number of tokens to generate
            </li>
            <li data-oid="ivn_etp">
              <span className="text-[#00cddd]" data-oid="2pnlfz2">
                temperature
              </span>
              : Controls randomness (0.0-1.0)
            </li>
            <li data-oid="qg56bg3">
              <span className="text-[#00cddd]" data-oid="rnomy1v">
                top_p
              </span>
              : Controls diversity via nucleus sampling
            </li>
            <li data-oid=":qk6qqt">
              <span className="text-[#00cddd]" data-oid="x0eex2i">
                stop
              </span>
              : Sequences where the API will stop generating
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
