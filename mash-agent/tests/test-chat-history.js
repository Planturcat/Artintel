/**
 * Simple test script for chat history functionality
 * 
 * This script tests the localStorage-based chat history functionality
 * Run with: node tests/test-chat-history.js
 */

// Mock localStorage for Node.js environment
const localStorage = {
  _data: {},
  getItem(key) {
    return this._data[key];
  },
  setItem(key, value) {
    this._data[key] = value;
  },
  removeItem(key) {
    delete this._data[key];
  },
  clear() {
    this._data = {};
  }
};

// Define message type
const chatHistory = [
  { role: 'system', content: 'You are a helpful AI assistant.' },
  { role: 'user', content: 'Hello, how are you?' },
  { role: 'assistant', content: 'I\'m doing well, thank you for asking! How can I help you today?' }
];

/**
 * Test chat history functionality
 */
function testChatHistory() {
  console.log("🧪 Testing chat history functionality...");
  
  try {
    // Create a unique chat ID
    const chatId = `test-chat-${Date.now()}`;
    console.log(`Chat ID: ${chatId}`);
    
    // Create some test messages
    const testMessages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Hello!' },
      { role: 'assistant', content: 'Hi there! How can I help you today?' },
      { role: 'user', content: 'What can you do?' }
    ];
    
    // Save to localStorage
    console.log("Saving chat to localStorage...");
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(testMessages));
    
    // Update chat index
    const chatIndex = JSON.parse(localStorage.getItem('chat-index') || '[]');
    chatIndex.push({
      id: chatId,
      title: 'Test Chat',
      preview: 'Hello!',
      timestamp: Date.now()
    });
    localStorage.setItem('chat-index', JSON.stringify(chatIndex));
    
    // Retrieve from localStorage
    console.log("Retrieving chat from localStorage...");
    const retrievedChat = JSON.parse(localStorage.getItem(`chat-${chatId}`) || 'null');
    
    if (!retrievedChat) {
      console.error("❌ Failed to retrieve chat from localStorage");
      return false;
    }
    
    console.log("✅ Chat retrieved successfully");
    console.log(`Retrieved ${retrievedChat.length} messages`);
    
    // Retrieve chat index
    console.log("\nRetrieving chat index...");
    const retrievedIndex = JSON.parse(localStorage.getItem('chat-index') || '[]');
    const foundChat = retrievedIndex.find((chat) => chat.id === chatId);
    
    if (!foundChat) {
      console.error("❌ Failed to find chat in index");
      return false;
    }
    
    console.log("✅ Chat found in index");
    console.log("Chat info:", foundChat);
    
    // Test updating a chat
    console.log("\nTesting chat update...");
    
    // Add a new message
    testMessages.push({ role: 'assistant', content: 'I can help you with many tasks!' });
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(testMessages));
    
    // Update the chat index
    const updatedIndex = JSON.parse(localStorage.getItem('chat-index') || '[]');
    const chatToUpdate = updatedIndex.find((chat) => chat.id === chatId);
    
    if (chatToUpdate) {
      chatToUpdate.preview = 'I can help you with many tasks!';
      chatToUpdate.timestamp = Date.now();
      localStorage.setItem('chat-index', JSON.stringify(updatedIndex));
    }
    
    // Verify the update
    const updatedChat = JSON.parse(localStorage.getItem(`chat-${chatId}`) || 'null');
    
    if (!updatedChat || updatedChat.length !== 5) {
      console.error("❌ Failed to update chat");
      return false;
    }
    
    console.log("✅ Chat updated successfully");
    console.log(`Updated chat now has ${updatedChat.length} messages`);
    
    // Test creating a new chat
    console.log("\nTesting new chat creation...");
    
    const newChatId = `new-chat-${Date.now()}`;
    const welcomeMessage = { role: 'assistant', content: 'Welcome to the new chat!' };
    
    localStorage.setItem(`chat-${newChatId}`, JSON.stringify([welcomeMessage]));
    localStorage.setItem('currentChatId', newChatId);
    
    const newChatIndex = JSON.parse(localStorage.getItem('chat-index') || '[]');
    newChatIndex.unshift({
      id: newChatId,
      title: 'New Chat',
      preview: welcomeMessage.content,
      timestamp: Date.now()
    });
    localStorage.setItem('chat-index', JSON.stringify(newChatIndex));
    
    // Verify the new chat
    const currentChatId = localStorage.getItem('currentChatId');
    
    if (currentChatId !== newChatId) {
      console.error("❌ Failed to set current chat ID");
      return false;
    }
    
    console.log("✅ New chat created successfully");
    console.log(`Current chat ID: ${currentChatId}`);
    
    // Clean up test data
    console.log("\nCleaning up test data...");
    localStorage.removeItem(`chat-${chatId}`);
    localStorage.removeItem(`chat-${newChatId}`);
    localStorage.removeItem('currentChatId');
    
    const finalIndex = JSON.parse(localStorage.getItem('chat-index') || '[]');
    const cleanedIndex = finalIndex.filter((chat) => chat.id !== chatId && chat.id !== newChatId);
    localStorage.setItem('chat-index', JSON.stringify(cleanedIndex));
    
    return true;
  } catch (error) {
    console.error("❌ Error testing chat history:", error);
    return false;
  }
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log("🚀 Starting chat history tests\n");
  
  // Test chat history
  const chatHistoryResult = testChatHistory();
  
  // Print summary
  console.log("\n📊 Test Results Summary");
  console.log("----------------------");
  console.log(`Chat History Test: ${chatHistoryResult ? '✅ PASSED' : '❌ FAILED'}`);
  
  return chatHistoryResult;
}

// Run the tests
const result = runAllTests();
console.log(`\n${result ? '✅ All tests completed successfully!' : '❌ Some tests failed!'}`);
process.exit(result ? 0 : 1);
