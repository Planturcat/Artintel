"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeTest() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="fixed top-24 right-4 z-50 bg-gray-800 dark:bg-gray-800 light:bg-white p-4 rounded-lg shadow-lg">
      <p className="text-white dark:text-white light:text-[#00031b] mb-2">
        Current theme: <strong>{theme}</strong>
      </p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="bg-white dark:bg-[#00031b] light:bg-white p-2 rounded">
          <p className="text-white dark:text-white light:text-[#00031b] text-sm">White text</p>
        </div>
        <div className="bg-[#00031b] p-2 rounded">
          <p className="text-[#00031b] dark:text-white light:text-white text-sm">Dark text</p>
        </div>
        <div className="bg-[#00031b] p-2 rounded">
          <p className="text-gray-300 dark:text-gray-300 light:text-[#00031b] text-sm">Gray text</p>
        </div>
        <div className="bg-white p-2 rounded">
          <p className="text-[#00cbdd] text-sm">Primary text</p>
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className="mt-3 w-full bg-[#00cbdd] text-white p-2 rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
} 