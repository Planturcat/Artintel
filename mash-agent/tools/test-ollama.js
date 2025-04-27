// Test script to check Ollama connectivity
async function testOllamaConnection() {
  const OLLAMA_BASE_URL = process.env.NEXT_PUBLIC_OLLAMA_BASE_URL || "http://127.0.0.1:11434/api";
  
  console.log(`Testing connection to Ollama at: ${OLLAMA_BASE_URL}`);
  
  try {
    // Try to access the /healthz endpoint
    console.log("Test 1: Checking health endpoint...");
    const healthRes = await fetch(`${OLLAMA_BASE_URL.replace('/api', '')}/api/health`, {
      method: 'GET',
    });
    
    console.log(`Health check response status: ${healthRes.status}`);
    if (healthRes.ok) {
      console.log("✅ Health check successful");
    } else {
      console.log("❌ Health check failed with status: " + healthRes.status);
    }
  } catch (err) {
    console.error("❌ Health check error:", err.message);
  }
  
  try {
    // Try to list models
    console.log("\nTest 2: Listing models...");
    const modelsRes = await fetch(`${OLLAMA_BASE_URL}/tags`, {
      method: 'GET',
    });
    
    console.log(`Models endpoint response status: ${modelsRes.status}`);
    
    if (modelsRes.ok) {
      const models = await modelsRes.json();
      console.log("✅ Successfully retrieved models:");
      console.log(JSON.stringify(models, null, 2));
    } else {
      console.log("❌ Failed to list models with status: " + modelsRes.status);
    }
  } catch (err) {
    console.error("❌ Models listing error:", err.message);
  }
  
  // Try alternate URL formats in case the configuration is wrong
  const alternateUrls = [
    "http://http://127.0.0.1:11434/api",
    "http://127.0.0.1:11434",
    "http://localhost:11434",
    "http://0.0.0.0:11434/api",
    "http://0.0.0.0:11434"
  ];
  
  for (const url of alternateUrls) {
    if (url === OLLAMA_BASE_URL || url === OLLAMA_BASE_URL.replace('/api', '')) {
      continue; // Skip if we already tried this URL
    }
    
    console.log(`\nTrying alternate URL: ${url}`);
    try {
      const response = await fetch(`${url}/tags`, {
        method: 'GET',
      });
      
      if (response.ok) {
        console.log(`✅ Success with alternate URL: ${url}`);
        console.log(`Response status: ${response.status}`);
        break;
      } else {
        console.log(`❌ Failed with alternate URL: ${url}`);
      }
    } catch (err) {
      console.error(`❌ Error with alternate URL ${url}:`, err.message);
    }
  }
}

// Run the test
testOllamaConnection().catch(console.error); 