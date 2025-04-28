'use client';

import { useState } from 'react';
import { useLanguage, useAutoTranslate, AutoTranslate, Language } from '@/contexts/LanguageContext';

export default function ExampleTranslationDemo() {
  const { language, setLanguage, t, autoTranslationEnabled, setAutoTranslationEnabled } = useLanguage();
  const [customText, setCustomText] = useState('This is a custom text that will be translated automatically if auto-translation is enabled.');
  
  // Example of content that will be auto-translated with the useAutoTranslate hook
  const manualAutoTranslatedContent = useAutoTranslate(
    <div className="p-4 border rounded-lg mb-4">
      <h3 className="text-lg font-medium mb-2">This heading will be auto-translated</h3>
      <p>This paragraph content will also be auto-translated if enabled.</p>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Translation System Demo</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 p-5 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">1. Manual Translation with t()</h2>
          <p className="mb-2">
            This text uses the <code>t()</code> function: {t('dashboard')}
          </p>
          <p>
            Another translated text: {t('welcomeTitle')}
          </p>
        </div>
        
        <div className="flex-1 p-5 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">2. Auto Translation</h2>
          <p className="mb-2">
            This text will be automatically translated if auto-translation is enabled.
          </p>
          <p>
            Another paragraph that should be translated automatically.
          </p>
        </div>
      </div>
      
      <div className="p-5 border rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-3">3. Manual Auto-Translation with Hook</h2>
        {manualAutoTranslatedContent}
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => setCustomText("New text to translate automatically")}
        >
          Update Content
        </button>
      </div>
      
      <div className="p-5 border rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-3">4. Explicit Auto-Translation Component</h2>
        <AutoTranslate>
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">This content will be translated</h3>
            <p>Even though it might not be within the auto-translation wrapper.</p>
          </div>
        </AutoTranslate>
      </div>
      
      <div className="p-5 border rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Current Language:</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="auto-translate" 
              checked={autoTranslationEnabled}
              onChange={(e) => setAutoTranslationEnabled(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="auto-translate">Enable Auto-Translation</label>
          </div>
        </div>
      </div>
    </div>
  );
} 