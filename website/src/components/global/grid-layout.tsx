"use client";

import React from "react";
import { cn } from "@/lib";

interface GridLayoutProps {
  className?: string;
}

const GridLayout = ({ className }: GridLayoutProps) => {
  return (
    <div className={cn("grid-wrapper", className)}>
      <div className="my-custom-grid-container">
        <div className="grid-box grid-box1">1</div>
        <div className="grid-box grid-box2">2</div>
        <div className="grid-box grid-box3">3</div>
        <div className="grid-box grid-box4">4</div>
        <div className="grid-box grid-box5">5</div>
        <div className="grid-box grid-box6">6</div>
        <div className="grid-box grid-box7">7</div>
        <div className="grid-box grid-box8">8</div>
        <div className="grid-box grid-box9">9</div>
        <div className="grid-box grid-box10">0</div>
        <div className="grid-box grid-box11">A</div>
        <div className="grid-box grid-box12">B</div>
        <div className="grid-box grid-box13">C</div>
        <div className="grid-box grid-box14">D</div>
      </div>
    </div>
  );
};

export default GridLayout; 