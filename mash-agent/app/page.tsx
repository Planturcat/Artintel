"use client"

import { Background } from "@/components/background"
import { ChatContainer } from "@/components/chat-container"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent text-white overflow-hidden">
      {/* Background */}
      <Background />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 mt-16">
        <ChatContainer />

        {/* Link to Final Version */}
        <div className="mt-8">
          <Link
            href="/final"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00031b] hover:bg-[#00031b]/80 border border-[#00cbdd]/30 hover:border-[#00cbdd]/60 transition-colors"
          >
            <Sparkles className="h-4 w-4 text-[#00cbdd]" />
            <span>Try the Final Version</span>
          </Link>
        </div>
      </div>
    </main>
  )
}