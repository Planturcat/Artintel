"use client"
import React, { useEffect, useState } from 'react';

interface Feature {
  title: string;
  description: string;
}

interface IPhoneShowcaseProps {
  features: Feature[];
  rotationSpeed?: number; // seconds per full rotation
  featureChangeInterval?: number; // milliseconds between feature changes
}

const IPhoneShowcase: React.FC<IPhoneShowcaseProps> = ({
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
    <div className="iphone-showcase-container relative w-full h-[500px] flex items-center justify-center">
      {/* Custom styling for the iPhone animation */}
      <style jsx>{`
        .iphone {
          width: 220px;
          height: 440px;
          position: relative;
          perspective: 1000px;
          margin: 0 auto;
        }

        .shadow {
          position: absolute;
          width: 120px;
          height: 0px;
          left: 50px;
          top: 480px;
          transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
          box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
          animation: shadow infinite ${rotationSpeed}s ease;
        }

        .inner {
          z-index: 20;
          position: absolute;
          width: 220px;
          height: 440px;
          left: 0;
          top: 0;
          transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
          animation: rotate infinite ${rotationSpeed}s ease;
        }

        .iphone-body {
          width: 220px;
          height: 440px;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 36px;
          background: #1a1a1a;
          transform-style: preserve-3d;
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.05) inset,
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(0, 203, 221, 0.2);
          overflow: hidden;
        }

        .notch {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 24px;
          background: #000;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .camera {
          width: 8px;
          height: 8px;
          background: #222;
          border-radius: 50%;
          margin-right: 8px;
          position: relative;
        }

        .camera::after {
          content: '';
          position: absolute;
          width: 3px;
          height: 3px;
          background: #00CBDD;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .speaker {
          width: 40px;
          height: 4px;
          background: #222;
          border-radius: 4px;
        }

        .screen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 36px;
          overflow: hidden;
        }

        .screen .display {
          width: 100%;
          height: 100%;
          background-color: #000;
          position: relative;
          overflow: hidden;
        }

        .screen .display .feature-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px 20px 20px;
          color: white;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          text-align: center;
        }

        .screen .display .feature-content.active {
          opacity: 1;
        }

        .screen .display .feature-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          background: linear-gradient(90deg, #00cbdd, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .screen .display .feature-description {
          font-size: 14px;
          line-height: 1.4;
        }

        .screen .display .shade {
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

        .home-indicator {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 4px;
        }

        .volume-button {
          position: absolute;
          left: -2px;
          width: 2px;
          height: 20px;
          background: #333;
          border-radius: 2px;
        }

        .volume-up {
          top: 100px;
        }

        .volume-down {
          top: 130px;
        }

        .power-button {
          position: absolute;
          right: -2px;
          top: 100px;
          width: 2px;
          height: 30px;
          background: #333;
          border-radius: 2px;
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(0, 203, 221, 0.6);
          border-radius: 50%;
          filter: blur(1px);
          animation: float-particle 5s infinite linear;
        }

        @keyframes rotate {
          0% { transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg); }
          5% { transform: rotateX(-20deg) rotateY(-20deg) rotateZ(0deg); }
          20% { transform: rotateX(30deg) rotateY(200deg) rotateZ(0deg); }
          25% { transform: rotateX(-60deg) rotateY(150deg) rotateZ(0deg); }
          60% { transform: rotateX(-20deg) rotateY(130deg) rotateZ(0deg); }
          65% { transform: rotateX(-20deg) rotateY(120deg) rotateZ(0deg); }
          80% { transform: rotateX(-20deg) rotateY(375deg) rotateZ(0deg); }
          85% { transform: rotateX(-20deg) rotateY(357deg) rotateZ(0deg); }
          87% { transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg); }
          100% { transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg); }
        }

        @keyframes screen-shade {
          0% { background-position: -20px 0px; }
          5% { background-position: -40px 0px; }
          20% { background-position: 200px 0; }
          50% { background-position: -200px 0; }
          80% { background-position: 0px 0px; }
          85% { background-position: -30px 0; }
          90% { background-position: -20px 0; }
          100% { background-position: -20px 0px; }
        }

        @keyframes shadow {
          0% { transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg); box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); }
          5% { transform: rotateX(80deg) rotateY(10deg) rotateZ(0deg); box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); }
          20% { transform: rotateX(30deg) rotateY(-20deg) rotateZ(-20deg); box-shadow: 0 0 50px 30px rgba(0,0,0,0.3); }
          25% { transform: rotateX(80deg) rotateY(-20deg) rotateZ(50deg); box-shadow: 0 0 35px 15px rgba(0,0,0,0.1); }
          60% { transform: rotateX(80deg) rotateY(0deg) rotateZ(-50deg) translateX(30px); box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); }
          100% { box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); }
        }

        @keyframes float-particle {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(20px, -30px); opacity: 0; }
        }

        /* Media queries for responsive design */
        @media (max-width: 768px) {
          .iphone {
            transform: scale(0.8);
          }
          
          .shadow {
            transform: scale(0.8) rotateX(80deg) rotateY(0deg) rotateZ(0deg);
          }
        }

        @media (max-width: 480px) {
          .iphone {
            transform: scale(0.6);
          }
          
          .shadow {
            transform: scale(0.6) rotateX(80deg) rotateY(0deg) rotateZ(0deg);
          }
        }
      `}</style>

      <div className="iphone">
        <div className="inner">
          <div className="iphone-body">
            {/* Notch with camera and speaker */}
            <div className="notch">
              <div className="camera"></div>
              <div className="speaker"></div>
            </div>
            
            <div className="screen">
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
            </div>
            
            {/* Home indicator */}
            <div className="home-indicator"></div>
            
            {/* Side buttons */}
            <div className="volume-button volume-up"></div>
            <div className="volume-button volume-down"></div>
            <div className="power-button"></div>
            
            {/* Particles */}
            <div className="particles">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="shadow"></div>
      </div>
    </div>
  );
};

export default IPhoneShowcase;
