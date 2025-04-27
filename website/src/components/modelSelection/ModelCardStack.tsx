"use client";
import Image from "next/image";
import React, { useState } from "react";
import "@/styles/modelSelection/cardStack.css";

// Model data with real PNG logos
const MODEL_DATA = [
  {
    id: 1,
    name: "Llama",
    logo: "/model logos/Llama.png",
    size: "8B",
    metrics: {
      accuracy: "8.4",
      speed: "1.2x",
    },
  },
  {
    id: 2,
    name: "Mistral",
    logo: "/model logos/Mistral.png",
    size: "7B",
    metrics: {
      accuracy: "8.2",
      speed: "1.5x",
    },
  },
  {
    id: 3,
    name: "Falcon",
    logo: "/model logos/Falcon.png",
    size: "7B",
    metrics: {
      accuracy: "7.8",
      speed: "1.3x",
    },
  },
  {
    id: 4,
    name: "Phi",
    logo: "/model logos/Phi.png",
    size: "2.7B",
    metrics: {
      accuracy: "7.3",
      speed: "2.2x",
    },
  },
  {
    id: 5,
    name: "GPT-J",
    logo: "/model logos/gpt-j-6b.png",
    size: "6B",
    metrics: {
      accuracy: "7.5",
      speed: "1.4x",
    },
  },
  {
    id: 6,
    name: "Bloom",
    logo: "/model logos/Bloom.png",
    size: "176B",
    metrics: {
      accuracy: "8.1",
      speed: "0.9x",
    },
  },
  {
    id: 7,
    name: "Qwen",
    logo: "/model logos/Qwen.png",
    size: "7B",
    metrics: {
      accuracy: "7.9",
      speed: "1.3x",
    },
  },
  {
    id: 8,
    name: "DeepSeek",
    logo: "/model logos/DeepSeek.png",
    size: "7B",
    metrics: {
      accuracy: "8.2",
      speed: "1.1x",
    },
  },
  {
    id: 9,
    name: "Santa Coder",
    logo: "/model logos/SantaCoder.png",
    size: "1.1B",
    metrics: {
      accuracy: "7.6",
      speed: "2.4x",
    },
  },
  {
    id: 10,
    name: "MPT",
    logo: "/model logos/mpt-7b.png",
    size: "7B",
    metrics: {
      accuracy: "7.8",
      speed: "1.4x",
    },
  },
];

// CPU architecture lines
const CPU_LINES = [1, 2, 3, 4, 5, 6, 7, 8];

const ModelCardStack: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="model-card-container" data-oid="cjjkeeq">
      {/* Search input at the top */}
      <div className="model-search" data-oid="_b7oz1e">
        <input
          type="text"
          className="model-search-input"
          placeholder="Search models..."
          value={searchTerm}
          onChange={handleSearchChange}
          data-oid="xrfrifw"
        />
      </div>

      {/* CPU architecture lines animation */}
      <div className="cpu-architecture" data-oid="csfv7hk">
        {CPU_LINES.map((num) => (
          <div
            key={num}
            className={`cpu-dot cpu-line-${num}`}
            data-oid=".knn1f:"
          ></div>
        ))}
      </div>

      {/* Model cards marquee */}
      <div className="model-marquee" data-oid="u5gowba">
        {MODEL_DATA.map((model) => (
          <div key={model.id} className="model-card" data-oid="8lm0cdh">
            <div className="model-card-content" data-oid="_3z6mix">
              <div className="model-logo" data-oid="97lfs09">
                <img
                  src={model.logo}
                  alt={`${model.name} logo`}
                  data-oid="3-7n3.r"
                />
              </div>
              <div className="model-name" data-oid="sx.ow-z">
                {model.name}
              </div>
              <div className="model-size" data-oid="y9tnd9w">
                {model.size} parameters
              </div>
              <div className="model-metrics" data-oid="2rkuprr">
                <div className="model-metric" data-oid="menblmv">
                  <span className="metric-label" data-oid="h97j1.4">
                    ACC
                  </span>
                  <span className="metric-value" data-oid="ypa3c5m">
                    {model.metrics.accuracy}
                  </span>
                </div>
                <div className="model-metric" data-oid="s4_-vy8">
                  <span className="metric-label" data-oid="ly2.8_-">
                    SPEED
                  </span>
                  <span className="metric-value" data-oid=":i__84v">
                    {model.metrics.speed}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Duplicate the first few cards for seamless looping */}
        {MODEL_DATA.slice(0, 4).map((model) => (
          <div
            key={`dup-${model.id}`}
            className="model-card"
            data-oid="up53p0_"
          >
            <div className="model-card-content" data-oid="wb_z99b">
              <div className="model-logo" data-oid="s2i762d">
                <img
                  src={model.logo}
                  alt={`${model.name} logo`}
                  data-oid="pjw3c:k"
                />
              </div>
              <div className="model-name" data-oid="_w28-u6">
                {model.name}
              </div>
              <div className="model-size" data-oid="d8m8nfm">
                {model.size} parameters
              </div>
              <div className="model-metrics" data-oid="4hg.:dp">
                <div className="model-metric" data-oid="8_y6u02">
                  <span className="metric-label" data-oid="x3bunsd">
                    ACC
                  </span>
                  <span className="metric-value" data-oid="7xbks:r">
                    {model.metrics.accuracy}
                  </span>
                </div>
                <div className="model-metric" data-oid="f9:3ble">
                  <span className="metric-label" data-oid="xf6-b89">
                    SPEED
                  </span>
                  <span className="metric-value" data-oid="yuxl:5i">
                    {model.metrics.speed}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelCardStack;
