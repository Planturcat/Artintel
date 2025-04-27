"use client";

import React from "react";
import { cn } from "@/lib";

interface ThirdLoaderProps {
  className?: string;
}

const ThirdLoader = ({ className }: ThirdLoaderProps) => {
  return (
    <div className={cn("server-loader-container", className)}>
      <svg
        id="svg_svg"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 477 578"
        height="578"
        width="477"
      >
        <g filter="url(#filter0_i_163_1030)">
          <path
            fill="#E9E9E9"
            d="M235.036 304.223C236.949 303.118 240.051 303.118 241.964 304.223L470.072 435.921C473.898 438.13 473.898 441.712 470.072 443.921L247.16 572.619C242.377 575.38 234.623 575.38 229.84 572.619L6.92817 443.921C3.10183 441.712 3.10184 438.13 6.92817 435.921L235.036 304.223Z"
          ></path>
        </g>
        <path
          stroke="white"
          d="M235.469 304.473C237.143 303.506 239.857 303.506 241.531 304.473L469.639 436.171C473.226 438.242 473.226 441.6 469.639 443.671L246.727 572.369C242.183 574.992 234.817 574.992 230.273 572.369L7.36118 443.671C3.77399 441.6 3.774 438.242 7.36119 436.171L235.469 304.473Z"
        ></path>
        <path
          stroke="white"
          fill="#C3CADC"
          d="M234.722 321.071C236.396 320.105 239.111 320.105 240.785 321.071L439.477 435.786C443.064 437.857 443.064 441.215 439.477 443.286L240.785 558.001C239.111 558.967 236.396 558.967 234.722 558.001L36.0304 443.286C32.4432 441.215 32.4432 437.857 36.0304 435.786L234.722 321.071Z"
        ></path>
        <path
          fill="#4054B2"
          d="M234.521 366.089C236.434 364.985 239.536 364.985 241.449 366.089L406.439 461.346L241.247 556.72C239.333 557.825 236.231 557.825 234.318 556.72L69.3281 461.463L234.521 366.089Z"
        ></path>
        <path
          fill="#30439B"
          d="M237.985 364.089L237.984 556.972C236.144 556.941 235.082 556.717 233.13 556.043L69.3283 461.463L237.985 364.089Z"
        ></path>
        <path
          fill="url(#paint0_linear_163_1030)"
          d="M36.2146 117.174L237.658 0.435217V368.615C236.541 368.598 235.686 368.977 233.885 370.124L73.1836 463.678L39.2096 444.075C37.0838 442.229 36.285 440.981 36.2146 438.027V117.174Z"
          id="layer_pared"
        ></path>
        <path
          fill="url(#paint1_linear_163_1030)"
          d="M439.1 116.303L237.657 0.435568V368.616C238.971 368.585 239.822 369.013 241.43 370.135L403.64 462.925L436.128 444.089C437.832 442.715 438.975 441.147 439.1 439.536V116.303Z"
          id="layer_pared"
        ></path>
        <path
          fill="#27C6FD"
          d="M64.5447 181.554H67.5626V186.835L64.5447 188.344V181.554Z"
          id="float_server"
        ></path>
        <path
          fill="#138EB9"
          d="M88.3522 374.347L232.415 457.522C234.202 458.405 234.866 458.629 236.335 458.71V468.291C235.356 468.291 234.086 468.212 232.415 467.275L88.3522 384.1C86.3339 382.882 85.496 382.098 85.4707 380.198V370.428L88.3522 374.347Z"
          id="float_server"
        ></path>
        <path
          fill="#138EB9"
          d="M384.318 374.445L240.254 457.62C238.914 458.385 238.295 458.629 236.335 458.71V468.291C237.315 468.291 238.704 468.211 240.236 467.274L384.318 384.198C386.457 383.091 387.151 382.244 387.258 380.228V370.917C386.768 372.387 386.21 373.295 384.318 374.445Z"
          id="float_server"
        ></path>
        <path
          stroke="url(#paint3_linear_163_1030)"
          fill="url(#paint2_linear_163_1030)"
          d="M240.452 226.082L408.617 323.172C412.703 325.531 412.703 329.355 408.617 331.713L240.452 428.803C238.545 429.904 235.455 429.904 233.548 428.803L65.3832 331.713C61.298 329.355 61.298 325.531 65.3832 323.172L233.548 226.082C235.455 224.982 238.545 224.982 240.452 226.082Z"
          id="float_server"
        ></path>
        <path
          fill="#5B6CA2"
          d="M408.896 332.123L241.489 428.775C240.013 429.68 238.557 430.033 236.934 430.033V464.518C238.904 464.518 239.366 464.169 241.489 463.233L408.896 366.58C411.372 365.292 412.125 363.262 412.312 361.317C412.312 361.317 412.312 326.583 412.312 327.722C412.312 328.86 411.42 330.514 408.896 332.123Z"
          id="float_server"
        ></path>
        <path
          fill="#6879AF"
          d="M240.92 429.077L255.155 420.857V432.434L251.511 439.064V457.432L241.489 463.242C240.116 463.858 239.141 464.518 236.934 464.518V430.024C238.695 430.024 239.862 429.701 240.92 429.077Z"
          id="float_server"
        ></path>
        <path
          fill="url(#paint4_linear_163_1030)"
          d="M65.084 331.984L232.379 428.571C233.882 429.619 235.101 430.005 236.934 430.005V464.523C234.656 464.523 234.285 464.215 232.379 463.214L65.084 366.442C62.4898 365 61.6417 362.992 61.6699 361.29V327.125C61.6899 329.24 62.4474 330.307 65.084 331.984Z"
          id="float_server"
        ></path>
        <path
          fill="#20273A"
          d="M400.199 361.032C403.195 359.302 405.623 355.096 405.623 351.637C405.623 348.177 403.195 346.775 400.199 348.505C397.203 350.235 394.775 354.441 394.775 357.9C394.775 361.359 397.203 362.762 400.199 361.032Z"
          id="float_server"
        ></path>
        {/* Add additional elements here as needed */}
        
        {/* Define filters and gradients */}
        <defs>
          <filter id="filter0_i_163_1030">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_163_1030" />
          </filter>
          <linearGradient id="paint0_linear_163_1030" x1="36.2146" y1="232.057" x2="237.658" y2="232.057" gradientUnits="userSpaceOnUse">
            <stop stopColor="#313F87" stopOpacity="0.45" />
            <stop offset="1" stopColor="#041042" />
          </linearGradient>
          <linearGradient id="paint1_linear_163_1030" x1="439.1" y1="231.68" x2="237.657" y2="231.68" gradientUnits="userSpaceOnUse">
            <stop stopColor="#313F87" stopOpacity="0.45" />
            <stop offset="1" stopColor="#041042" />
          </linearGradient>
          <linearGradient id="paint2_linear_163_1030" x1="237" y1="224.988" x2="237" y2="429.897" gradientUnits="userSpaceOnUse">
            <stop stopColor="#14285C" />
            <stop offset="1" stopColor="#3C73B9" />
          </linearGradient>
          <linearGradient id="paint3_linear_163_1030" x1="237" y1="224.988" x2="237" y2="429.897" gradientUnits="userSpaceOnUse">
            <stop stopColor="#14285C" />
            <stop offset="1" stopColor="#3C73B9" />
          </linearGradient>
          <linearGradient id="paint4_linear_163_1030" x1="149.302" y1="429.783" x2="149.302" y2="393.078" gradientUnits="userSpaceOnUse">
            <stop id="paint13_linear_163_1030" stopColor="#313F87" stopOpacity="0.45" />
            <stop offset="1" stopColor="#041042" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ThirdLoader; 