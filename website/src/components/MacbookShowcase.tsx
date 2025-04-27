"use client"
import React, { useEffect, useState } from 'react';

interface Feature {
  title: string;
  description: string;
}

interface MacbookShowcaseProps {
  features: Feature[];
  rotationSpeed?: number; // seconds per full rotation
  featureChangeInterval?: number; // milliseconds between feature changes
}

const MacbookShowcase: React.FC<MacbookShowcaseProps> = ({
  features,
  rotationSpeed = 7,
  featureChangeInterval = 3000,
}) => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    // Change the displayed feature periodically
    const intervalId = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, featureChangeInterval);

    return () => clearInterval(intervalId);
  }, [features, featureChangeInterval]);

  return (
    <div className="macbook-showcase-container relative w-full h-[500px] flex items-center justify-center">
      {/* Custom styling for the Macbook animation */}
      <style jsx>{`
        .macbook {
          width: 300px;
          height: 192px;
          position: relative;
          perspective: 1000px;
          margin: 0 auto;
        }

        .shadow {
          position: absolute;
          width: 120px;
          height: 0px;
          left: 80px;
          top: 320px;
          transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
          box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
          animation: shadow infinite ${rotationSpeed}s ease;
        }

        .inner {
          z-index: 20;
          position: absolute;
          width: 300px;
          height: 192px;
          left: 0;
          top: 0;
          transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
          animation: rotate infinite ${rotationSpeed}s ease;
        }

        .screen {
          width: 300px;
          height: 192px;
          position: absolute;
          left: 0;
          bottom: 0;
          border-radius: 14px;
          background: #ddd;
          transform-style: preserve-3d;
          transform-origin: 50% 186px;
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          animation: lid-screen infinite ${rotationSpeed}s ease;
          background-image: linear-gradient(45deg, rgba(0,0,0,0.34) 0%,rgba(0,0,0,0) 100%);
          background-position: left bottom;
          background-size: 300px 300px;
          box-shadow: inset 0 3px 7px rgba(255,255,255,0.5);
        }

        .screen .logo {
          position: absolute;
          width: 40px;
          height: 48px;
          left: 50%;
          top: 50%;
          margin: -24px 0 0 -20px;
          transform: rotateY(180deg) translateZ(0.1px);
        }

        .screen .face-one {
          width: 300px;
          height: 192px;
          position: absolute;
          left: 0;
          bottom: 0;
          border-radius: 14px;
          background: #d3d3d3;
          transform: translateZ(2px);
          background-image: linear-gradient(45deg,rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
        }

        .screen .face-one .camera {
          width: 6px;
          height: 6px;
          border-radius: 100%;
          background: #000;
          position: absolute;
          left: 50%;
          top: 8px;
          margin-left: -3px;
        }

        .screen .face-one .display {
          width: 260px;
          height: 148px;
          margin: 20px;
          background-color: #000;
          background-size: 100% 100%;
          border-radius: 2px;
          position: relative;
          box-shadow: inset 0 0 4px rgba(0,0,0,1);
          overflow: hidden;
        }

        .screen .face-one .display .feature-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          color: white;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          text-align: center;
        }

        .screen .face-one .display .feature-content.active {
          opacity: 1;
        }

        .screen .face-one .display .feature-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          background: linear-gradient(90deg, #a855f7, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .screen .face-one .display .feature-description {
          font-size: 12px;
          line-height: 1.3;
        }

        .screen .face-one .display .shade {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(-135deg, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 47%,rgba(255,255,255,0) 48%);
          animation: screen-shade infinite ${rotationSpeed}s ease;
          background-size: 300px 200px;
          background-position: 0px 0px;
          pointer-events: none;
        }

        .screen .face-one span {
          position: absolute;
          top: 170px;
          left: 114px;
          font-size: 12px;
          color: #666
        }

        .macbody {
          width: 300px;
          height: 192px;
          position: absolute;
          left: 0;
          bottom: 0;
          border-radius: 14px;
          background: #cbcbcb;
          transform-style: preserve-3d;
          transform-origin: 50% bottom;
          transform: rotateX(-90deg);
          animation: lid-macbody infinite ${rotationSpeed}s ease;
          background-image: linear-gradient(45deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
        }

        .macbody .face-one {
          width: 300px;
          height: 192px;
          position: absolute;
          left: 0;
          bottom: 0;
          border-radius: 14px;
          transform-style: preserve-3d;
          background: #dfdfdf;
          animation: lid-keyboard-area infinite ${rotationSpeed}s ease;
          transform: translateZ(-2px);
          background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
        }

        .macbody .touchpad {
          width: 80px;
          height: 62px;
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 8px;
          margin: -88px 0 0 -36px;
          background: #cdcdcd;
          background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
          box-shadow: inset 0 0 3px #888;
        }

        .macbody .keyboard {
          width: 260px;
          height: 90px;
          position: absolute;
          left: 14px;
          top: 82px;
          border-radius: 8px;
          transform-style: preserve-3d;
          background: #cdcdcd;
          background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
          box-shadow: inset 0 0 3px #777;
          padding: 0 0 0 4px;
        }

        .keyboard .key {
          width: 12px;
          height: 12px;
          background: #444;
          float: left;
          margin: 2px;
          transform: translateZ(-2px);
          border-radius: 4px;
          box-shadow: 0 -2px 0 #222;
          animation: keys infinite ${rotationSpeed}s ease;
        }

        .key.space {
          width: 90px;
        }

        .key.f {
          height: 6px;
        }

        .macbody .pad {
          width: 10px;
          height: 10px;
          background: #333;
          border-radius: 100%;
          position: absolute;
        }

        .pad.one {
          left: 40px;
          top: 40px;
        }

        .pad.two {
          right: 40px;
          top: 40px;
        }

        .pad.three {
          right: 40px;
          bottom: 40px;
        }

        .pad.four {
          left: 40px;
          bottom: 40px;
        }

        @keyframes rotate {
          0% {
            transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
          }

          5% {
            transform: rotateX(-20deg) rotateY(-20deg) rotateZ(0deg);
          }

          20% {
            transform: rotateX(30deg) rotateY(200deg) rotateZ(0deg);
          }

          25% {
            transform: rotateX(-60deg) rotateY(150deg) rotateZ(0deg);
          }

          60% {
            transform: rotateX(-20deg) rotateY(130deg) rotateZ(0deg);
          }

          65% {
            transform: rotateX(-20deg) rotateY(120deg) rotateZ(0deg);
          }

          80% {
            transform: rotateX(-20deg) rotateY(375deg) rotateZ(0deg);
          }

          85% {
            transform: rotateX(-20deg) rotateY(357deg) rotateZ(0deg);
          }

          87% {
            transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg);
          }

          100% {
            transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg);
          }
        }

        @keyframes lid-screen {
          0% {
            transform: rotateX(0deg);
            background-position: left bottom;
          }

          5% {
            transform: rotateX(50deg);
            background-position: left bottom;
          }

          20% {
            transform: rotateX(-90deg);
            background-position: -150px top;
          }

          25% {
            transform: rotateX(15deg);
            background-position: left bottom;
          }

          30% {
            transform: rotateX(-5deg);
            background-position: right top;
          }

          38% {
            transform: rotateX(5deg);
            background-position: right top;
          }

          48% {
            transform: rotateX(0deg);
            background-position: right top;
          }

          90% {
            transform: rotateX(0deg);
            background-position: right top;
          }

          100% {
            transform: rotateX(0deg);
            background-position: right center;
          }
        }

        @keyframes lid-macbody {
          0% {
            transform: rotateX(-90deg);
          }

          50% {
            transform: rotateX(-90deg);
          }

          100% {
            transform: rotateX(-90deg);
          }
        }

        @keyframes lid-keyboard-area {
          0% {
            background-color: #dfdfdf;
          }

          50% {
            background-color: #bbb;
          }

          100% {
            background-color: #dfdfdf;
          }
        }

        @keyframes screen-shade {
          0% {
            background-position: -20px 0px;
          }

          5% {
            background-position: -40px 0px;
          }

          20% {
            background-position: 200px 0;
          }

          50% {
            background-position: -200px 0;
          }

          80% {
            background-position: 0px 0px;
          }

          85% {
            background-position: -30px 0;
          }

          90% {
            background-position: -20px 0;
          }

          100% {
            background-position: -20px 0px;
          }
        }

        @keyframes keys {
          0% {
            box-shadow: 0 -2px 0 #222;
          }

          5% {
            box-shadow: 1 -1px 0 #222;
          }

          20% {
            box-shadow: -1px 1px 0 #222;
          }

          25% {
            box-shadow: -1px 1px 0 #222;
          }

          60% {
            box-shadow: -1px 1px 0 #222;
          }

          80% {
            box-shadow: 0 -2px 0 #222;
          }

          85% {
            box-shadow: 0 -2px 0 #222;
          }

          87% {
            box-shadow: 0 -2px 0 #222;
          }

          100% {
            box-shadow: 0 -2px 0 #222;
          }
        }

        @keyframes shadow {
          0% {
            transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
            box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
          }

          5% {
            transform: rotateX(80deg) rotateY(10deg) rotateZ(0deg);
            box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
          }

          20% {
            transform: rotateX(30deg) rotateY(-20deg) rotateZ(-20deg);
            box-shadow: 0 0 50px 30px rgba(0,0,0,0.3);
          }

          25% {
            transform: rotateX(80deg) rotateY(-20deg) rotateZ(50deg);
            box-shadow: 0 0 35px 15px rgba(0,0,0,0.1);
          }

          60% {
            transform: rotateX(80deg) rotateY(0deg) rotateZ(-50deg) translateX(30px);
            box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
          }

          100% {
            box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
          }
        }

        /* Media queries for responsive design */
        @media (max-width: 768px) {
          .macbook {
            transform: scale(0.8);
          }
          
          .shadow {
            transform: scale(0.8) rotateX(80deg) rotateY(0deg) rotateZ(0deg);
          }
        }

        @media (max-width: 480px) {
          .macbook {
            transform: scale(0.6);
          }
          
          .shadow {
            transform: scale(0.6) rotateX(80deg) rotateY(0deg) rotateZ(0deg);
          }
        }
      `}</style>

      <div className="macbook">
        <div className="inner">
          <div className="screen">
            <div className="face-one">
              <div className="camera"></div>
              <div className="display">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`feature-content ${index === currentFeatureIndex ? 'active' : ''}`}
                  >
                    <div className="feature-title">{feature.title}</div>
                    <div className="feature-description">{feature.description}</div>
                  </div>
                ))}
                <div className="shade"></div>
              </div>
              <span>Artintel</span>
            </div>
          </div>
          <div className="macbody">
            <div className="face-one">
              <div className="touchpad"></div>
              <div className="keyboard">
                {/* Generate keyboard keys */}
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className={`key ${i === 32 ? 'space' : ''} ${i > 48 ? 'f' : ''}`}></div>
                ))}
              </div>
            </div>
            <div className="pad one"></div>
            <div className="pad two"></div>
            <div className="pad three"></div>
            <div className="pad four"></div>
          </div>
        </div>
        <div className="shadow"></div>
      </div>
    </div>
  );
};

export default MacbookShowcase; 