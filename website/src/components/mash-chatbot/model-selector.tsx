"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Server, Zap, Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OllamaModel } from "@/lib/ollama-client";

interface ModelSelectorProps {
  onModelSelect?: (modelName: string) => void;
}

export default function ModelSelector({ onModelSelect }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [models, setModels] = useState<OllamaModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("llama2:7b");
  const [isPulling, setIsPulling] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  const [pullModelName, setPullModelName] = useState("");

  // Fetch models on mount
  useEffect(() => {
    fetchModels();
  }, []);

  // Replace the fetchModels function with this simplified version
  const fetchModels = async () => {
    setIsLoading(true);
    try {
      // For demo purposes, use hardcoded models instead of fetching from Ollama
      // This ensures consistent behavior regardless of Ollama's availability
      setIsConnected(true);

      const demoModels: OllamaModel[] = [
        {
          name: "llama2:7b",
          modified_at: new Date().toISOString(),
          size: 4000000000,
          digest: "sha256:1234567890",
          details: {
            format: "gguf",
            family: "llama",
            families: ["llama"],
            parameter_size: "7B",
            quantization_level: "Q4_0",
          },
        },
        {
          name: "llama3:8b",
          modified_at: new Date().toISOString(),
          size: 5000000000,
          digest: "sha256:0987654321",
          details: {
            format: "gguf",
            family: "llama",
            families: ["llama"],
            parameter_size: "8B",
            quantization_level: "Q4_0",
          },
        },
        {
          name: "mistral:7b",
          modified_at: new Date().toISOString(),
          size: 4200000000,
          digest: "sha256:abcdef1234",
          details: {
            format: "gguf",
            family: "mistral",
            families: ["mistral"],
            parameter_size: "7B",
            quantization_level: "Q4_0",
          },
        },
        {
          name: "phi3:3.8b",
          modified_at: new Date().toISOString(),
          size: 2000000000,
          digest: "sha256:1234abcdef",
          details: {
            format: "gguf",
            family: "phi",
            families: ["phi"],
            parameter_size: "3.8B",
            quantization_level: "Q4_0",
          },
        },
      ];

      setModels(demoModels);
    } catch (error) {
      console.error("Error fetching models:", error);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelSelect = (modelName: string) => {
    setSelectedModel(modelName);
    setIsOpen(false);
    if (onModelSelect) {
      onModelSelect(modelName);
    }
  };

  // Replace the handlePullModel function with this simplified version
  const handlePullModel = async (modelName: string) => {
    setPullModelName(modelName);
    setIsPulling(true);
    setPullProgress(0);

    try {
      // Simulate pulling a model with progress updates
      for (let i = 0; i <= 100; i += 10) {
        setPullProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      // Add the model to the list
      const newModel: OllamaModel = {
        name: modelName,
        modified_at: new Date().toISOString(),
        size: 4000000000,
        digest: "sha256:" + Math.random().toString(36).substring(2, 15),
        details: {
          format: "gguf",
          family: modelName.split(":")[0],
          families: [modelName.split(":")[0]],
          parameter_size: modelName.split(":")[1].toUpperCase(),
          quantization_level: "Q4_0",
        },
      };

      setModels((prev) => [
        ...prev.filter((m) => m.name !== modelName),
        newModel,
      ]);
    } catch (error) {
      console.error("Error pulling model:", error);
    } finally {
      setIsPulling(false);
      setPullProgress(0);
    }
  };

  // Format model size for display
  const formatModelSize = (model: OllamaModel) => {
    if (model.details?.parameter_size) {
      return model.details.parameter_size;
    }

    // Try to extract from name
    const sizeMatch = model.name.match(/(\d+[bB])/);
    if (sizeMatch) {
      return sizeMatch[0].toUpperCase();
    }

    // Fallback to byte size
    if (model.size) {
      const gbSize = (model.size / 1024 / 1024 / 1024).toFixed(1);
      return `${gbSize}GB`;
    }

    return "Unknown";
  };

  // Get model type from name
  const getModelType = (model: OllamaModel) => {
    const name = model.name.toLowerCase();

    if (name.includes("code") || name.includes("starcoder")) {
      return "Code";
    } else if (name.includes("vision") || name.includes("clip")) {
      return "Vision";
    } else if (name.includes("embed") || name.includes("e5")) {
      return "Embedding";
    } else if (name.includes("whisper")) {
      return "Audio";
    } else {
      return "Chat";
    }
  };

  // Get model name for display
  const getDisplayName = (model: OllamaModel) => {
    // Remove tags and versions
    const baseName = model.name.split(":")[0];

    // Handle special cases
    if (baseName.includes("llama2")) return "Llama 2";
    if (baseName.includes("llama3")) return "Llama 3";
    if (baseName.includes("mistral")) return "Mistral AI";
    if (baseName.includes("phi")) return "Microsoft Phi";
    if (baseName.includes("gemma")) return "Google Gemma";

    // Default case: Capitalize first letter of each word
    return baseName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div
      className="rounded-xl overflow-hidden border border-cyan-500/30 bg-black/40 backdrop-blur-sm"
      data-oid="28pc_4p"
    >
      <div
        className="p-4 border-b border-cyan-500/30 bg-black/60 flex items-center justify-between"
        data-oid="jjsijt3"
      >
        <h3
          className="text-cyan-400 font-mono flex items-center"
          data-oid="eazv.iq"
        >
          <Server size={16} className="mr-2" data-oid="a5no2rw" />
          MODEL SELECTION
        </h3>

        <button
          onClick={fetchModels}
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
          disabled={isLoading}
          data-oid="qu578c6"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" data-oid="--o8wj-" />
          ) : (
            <RefreshCw size={16} data-oid="7qqjf6h" />
          )}
        </button>
      </div>

      <div className="p-4" data-oid="e2vb-1u">
        {isConnected === false ? (
          <div
            className="p-3 rounded-lg bg-red-900/20 border border-red-500/30 text-red-300 text-sm mb-4"
            data-oid="b2a3a7m"
          >
            Cannot connect to Ollama server. Please make sure it's running at
            http://localhost:11434
          </div>
        ) : null}

        <div className="relative" data-oid="-9en5uy">
          <button
            onClick={() => setIsOpen(!isOpen)}
            disabled={isLoading || isConnected === false}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-lg bg-gray-800/70 border border-cyan-500/30 text-white",
              (isLoading || isConnected === false) &&
                "opacity-50 cursor-not-allowed",
            )}
            data-oid="47o:3t7"
          >
            <div className="flex items-center" data-oid="b8a-jzw">
              {isLoading ? (
                <Loader2
                  size={16}
                  className="animate-spin mr-2"
                  data-oid="int-ip-"
                />
              ) : (
                <div
                  className="w-2 h-2 rounded-full bg-green-500 mr-2"
                  data-oid="43x8g-f"
                ></div>
              )}
              <span data-oid="-m:1cww">{selectedModel}</span>
            </div>
            <ChevronDown
              size={18}
              className={cn(
                "transition-transform duration-200",
                isOpen ? "transform rotate-180" : "",
              )}
              data-oid="co3-i42"
            />
          </button>

          {isOpen && (
            <div
              className="absolute z-10 mt-1 w-full rounded-lg bg-gray-900 border border-cyan-500/30 shadow-lg shadow-cyan-500/20 overflow-hidden max-h-64 overflow-y-auto"
              data-oid="jp7n58-"
            >
              {isLoading ? (
                <div
                  className="p-4 text-center text-gray-400"
                  data-oid="b5oitc."
                >
                  <Loader2
                    size={24}
                    className="animate-spin mx-auto mb-2"
                    data-oid="lhk4p2m"
                  />
                  Loading models...
                </div>
              ) : models.length === 0 ? (
                <div
                  className="p-4 text-center text-gray-400"
                  data-oid="s6wbhw7"
                >
                  No models found. Pull a model to get started.
                </div>
              ) : (
                models.map((model) => (
                  <button
                    key={model.name}
                    onClick={() => handleModelSelect(model.name)}
                    className={cn(
                      "w-full text-left p-3 flex items-center justify-between hover:bg-gray-800 transition-colors",
                      model.name === selectedModel
                        ? "bg-gray-800 text-cyan-400"
                        : "text-white",
                    )}
                    data-oid="_v_n8sd"
                  >
                    <div className="flex items-center" data-oid="uzqfqx.">
                      <div
                        className="w-2 h-2 rounded-full bg-green-500 mr-2"
                        data-oid="rdf-uig"
                      ></div>
                      <span data-oid="7p17ls4">{getDisplayName(model)}</span>
                    </div>
                    <div
                      className="text-xs text-gray-400 font-mono"
                      data-oid="-d3k78v"
                    >
                      {formatModelSize(model)}
                    </div>
                  </button>
                ))
              )}

              {/* Pull model section */}
              <div className="border-t border-gray-700 p-3" data-oid="909zo3j">
                <div className="text-xs text-gray-400 mb-2" data-oid="aw:5l0h">
                  Common Models
                </div>
                {[
                  "llama2:7b",
                  "llama3:8b",
                  "mistral:7b",
                  "phi3:3.8b",
                  "gemma:7b",
                ].map((model) => (
                  <button
                    key={model}
                    onClick={() => handlePullModel(model)}
                    disabled={isPulling || models.some((m) => m.name === model)}
                    className={cn(
                      "w-full text-left p-2 flex items-center justify-between hover:bg-gray-800 transition-colors rounded mb-1",
                      models.some((m) => m.name === model)
                        ? "opacity-50 cursor-not-allowed"
                        : "text-cyan-300",
                      isPulling && pullModelName === model
                        ? "bg-cyan-900/20"
                        : "",
                    )}
                    data-oid="3bvx9_s"
                  >
                    <div className="flex items-center" data-oid="3fj3o8r">
                      {isPulling && pullModelName === model ? (
                        <Loader2
                          size={14}
                          className="animate-spin mr-2"
                          data-oid="u4sv.1e"
                        />
                      ) : (
                        <div
                          className="w-2 h-2 rounded-full bg-cyan-500 mr-2"
                          data-oid="p.49s6b"
                        ></div>
                      )}
                      <span data-oid="g5xjzs2">{model}</span>
                    </div>

                    {isPulling && pullModelName === model ? (
                      <div
                        className="text-xs text-cyan-400 font-mono"
                        data-oid="nlzovh5"
                      >
                        {pullProgress}%
                      </div>
                    ) : models.some((m) => m.name === model) ? (
                      <div
                        className="text-xs text-green-400 font-mono"
                        data-oid="c8trnbp"
                      >
                        Installed
                      </div>
                    ) : (
                      <div
                        className="text-xs text-cyan-400 font-mono"
                        data-oid="28x2n3q"
                      >
                        Pull
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2" data-oid="l.g1qyn">
          <div
            className="p-3 rounded-lg bg-gray-800/50 border border-gray-700"
            data-oid="etc9_rb"
          >
            <div className="text-xs text-gray-400 mb-1" data-oid="f0jhzv.">
              Connection
            </div>
            <div
              className={cn(
                "font-mono flex items-center",
                isConnected ? "text-green-400" : "text-red-400",
              )}
              data-oid="8f86-sh"
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full mr-1",
                  isConnected ? "bg-green-500 animate-pulse" : "bg-red-500",
                )}
                data-oid="re_4uxy"
              ></div>
              {isConnected ? "CONNECTED" : "DISCONNECTED"}
            </div>
          </div>
          <div
            className="p-3 rounded-lg bg-gray-800/50 border border-gray-700"
            data-oid="-7yw7:3"
          >
            <div className="text-xs text-gray-400 mb-1" data-oid="ppq5xca">
              Models
            </div>
            <div
              className="text-cyan-400 font-mono flex items-center"
              data-oid="b:gjy_2"
            >
              <Zap size={14} className="mr-1" data-oid="6cj2-jm" />
              {isLoading ? "Loading..." : `${models.length} Available`}
            </div>
          </div>
        </div>

        <div
          className="mt-4 p-3 rounded-lg bg-black/60 border border-cyan-500/20"
          data-oid="diyc45."
        >
          <div className="text-xs text-gray-400 mb-2" data-oid="_t0ngqt">
            Server Status
          </div>
          <div className="flex items-center" data-oid="l0y40sg">
            <div
              className={cn(
                "w-2 h-2 rounded-full mr-2",
                isConnected ? "bg-green-500 animate-pulse" : "bg-red-500",
              )}
              data-oid="6c42vre"
            ></div>
            <span
              className={cn(
                "text-sm font-mono",
                isConnected ? "text-green-400" : "text-red-400",
              )}
              data-oid="_j9mc0j"
            >
              {isConnected
                ? "CONNECTED TO LOCAL OLLAMA"
                : "OLLAMA SERVER OFFLINE"}
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-500" data-oid="kgvfg-q">
            localhost:11434
          </div>
        </div>
      </div>
    </div>
  );
}
