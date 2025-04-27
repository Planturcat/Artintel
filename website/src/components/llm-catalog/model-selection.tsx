import { Button } from "@/components/ui/button"

export default function ModelSelection() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="border border-border/40 rounded-lg p-6 bg-card/30">
          <h3 className="text-xl font-mono font-bold mb-4">Selection Criteria</h3>
          <div className="space-y-4">
            <div>
              <div className="font-medium mb-1">Task Complexity</div>
              <p className="text-sm text-muted-foreground">
                Consider the complexity of your tasks. Simple tasks like classification or basic Q&A can use smaller models, while complex reasoning or creative generation benefits from larger models.
              </p>
            </div>
            
            <div>
              <div className="font-medium mb-1">Latency Requirements</div>
              <p className="text-sm text-muted-foreground">
                If your application needs fast responses, smaller models like Phoenix-7B offer lower latency. For batch processing where speed is less critical, larger models may be preferable.
              </p>
            </div>
            
            <div>
              <div className="font-medium mb-1">Specialized Knowledge</div>
              <p className="text-sm text-muted-foreground">
                For domain-specific applications, consider specialized models like Scholar-15B for academic content or Codex-12B for programming tasks.
              </p>
            </div>
            
            <div>
              <div className="font-medium mb-1">Budget Constraints</div>
              <p className="text-sm text-muted-foreground">
                Larger models cost more per token. Balance performance needs with budget considerations, especially for high-volume applications.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border border-border/40 rounded-lg p-6 bg-card/30">
          <h3 className="text-xl font-mono font-bold mb-4">Decision Flowchart</h3>
          <div className="text-sm text-muted-foreground mb-4">
            Follow this simplified decision process to choose the right model:
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="p-2 border border-border/30 rounded bg-background/50">
              <div className="font-medium">1. What is your primary use case?</div>
              <div className="ml-4 mt-1">
                <div>• General text generation → Phoenix series</div>
                <div>• Code generation → Codex-12B</div>
                <div>• Academic/research → Scholar-15B</div>
                <div>• Multiple languages → Multilingual-10B</div>
              </div>
            </div>
            
            <div className="p-2 border border-border/30 rounded bg-background/50">
              <div className="font-medium">2. How important is response speed?</div>
              <div className="ml-4 mt-1">\
                <div>• Critical (< 300ms) → Phoenix-7B</div>
                <div>• Important (< 600ms) → Phoenix-20B/Codex-12B</div>
                <div>• Not critical → Phoenix-30B</div>
              </div>
            </div>
            
            <div className="p-2 border border-border/30 rounded bg-background/50">
              <div className="font-medium">3. How complex are your prompts/tasks?</div>
              <div className="ml-4 mt-1">
                <div>• Simple, straightforward → Smaller models</div>
                <div>• Moderate complexity → Mid-size models</div>
                <div>• Highly complex, nuanced → Larger models</div>
              </div>
            </div>
            
            <div className="p-2 border border-border/30 rounded bg-background/50">
              <div className="font-medium">4. What's your budget?</div>
              <div className="ml-4 mt-1">
                <div>• Limited → Start with Phoenix-7B</div>
                <div>• Moderate → Consider mid-tier models</div>
                <div>• Flexible → Test multiple models</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-border/40 rounded-lg p-6 bg-card/30 mb-8">
        <h3 className="text-xl font-mono font-bold mb-4">Recommended Starting Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border/30 rounded bg-background/50">
            <div className="font-medium mb-2">For Beginners</div>
            <div className="text-sm text-muted-foreground mb-4">
              Start with Phoenix-7B for a good balance of performance and cost. It handles most common tasks well and has the lowest learning curve.
            </div>
            <Button className="w-full bg-[#00cddd] hover:bg-[#00cddd]/90 text-black">
              Try Phoenix-7B
            </Button>
          </div>
          
          <div className="p-4 border border-border/30 rounded bg-background/50">
            <div className="font-medium mb-2">For Developers</div>
            <div className="text-sm text-muted-foreground mb-4">
              Codex-12B offers excellent code generation capabilities and technical understanding, making it ideal for developer tools and programming assistance.
            </div>
            <Button className="w-full bg-[#00cddd] hover:bg-[#00cddd]/90 text-black">
              Try Codex-12B
            </Button>
          </div>
          
          <div className="p-4 border border-border/30 rounded bg-background/50">
            <div className="font-medium mb-2">For Enterprises</div>
            <div className="text-sm text-muted-foreground mb-4">
              Phoenix-30B provides the highest quality outputs and handles the most complex tasks, making it suitable for customer-facing and mission-critical applications.
            </div>
            <Button className="w-full bg-[#00cddd] hover:bg-[#00cddd]/90 text-black">
              Try Phoenix-30B
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="inline-block border border-border/40 rounded-lg p-6 bg-card/30">
          <h3 className="text-xl font-mono mb-4">Still not sure which model to choose?</h3>
          <p className="text-muted-foreground mb-6">
            Our team can help you select the right model based on your specific requirements and use case.
          </p>
          <Button className="bg-[#00cddd] hover:bg-[#00cddd]/90 text-black">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </div>
  )
}

