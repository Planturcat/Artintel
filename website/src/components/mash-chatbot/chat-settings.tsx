"use client";

import { useState } from "react";
import { Settings, Thermometer, Zap, Clock, Sparkles } from "lucide-react";

interface ChatSettingsProps {
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
}

export default function ChatSettings({
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
}: ChatSettingsProps) {
  const resetToDefaults = () => {
    setTemperature(0.7);
    setMaxTokens(2048);
  };

  return (
    <div
      className="rounded-xl overflow-hidden border border-cyan-500/30 bg-black/40 backdrop-blur-sm"
      data-oid=".k08k08"
    >
      <div
        className="p-4 border-b border-cyan-500/30 bg-black/60"
        data-oid="5wgppwy"
      >
        <h3 className="text-cyan-400 font-mono" data-oid="s6avico">
          CHAT SETTINGS
        </h3>
      </div>
      <div className="p-4 space-y-4" data-oid="v7-p.jo">
        <div data-oid="v9pteac">
          <label
            className="text-xs text-gray-400 mb-1 block"
            data-oid="_qg0ldj"
          >
            Temperature: {temperature.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            data-oid="b30pq4f"
          />

          <div
            className="flex justify-between text-xs text-gray-500 mt-1"
            data-oid="vw8eec6"
          >
            <span data-oid="mbpbgic">Precise</span>
            <span data-oid="441h56t">Creative</span>
          </div>
        </div>

        <div data-oid="czpk2or">
          <label
            className="text-xs text-gray-400 mb-1 block"
            data-oid="l7lsv3-"
          >
            Max Tokens: {maxTokens}
          </label>
          <input
            type="range"
            min="256"
            max="4096"
            step="256"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            data-oid="avss:ep"
          />

          <div
            className="flex justify-between text-xs text-gray-500 mt-1"
            data-oid="ipajxrn"
          >
            <span data-oid="sy0r5t9">256</span>
            <span data-oid="8a14tl-">4096</span>
          </div>
        </div>

        <div className="pt-2" data-oid="yjhu1ms">
          <button
            onClick={resetToDefaults}
            className="w-full py-2 px-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-cyan-400 transition-colors text-sm font-mono"
            data-oid="0s72j7h"
          >
            RESET DEFAULTS
          </button>
        </div>
      </div>
    </div>
  );
}
