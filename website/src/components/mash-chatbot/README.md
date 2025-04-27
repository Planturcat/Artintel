# Artintel Mash Chatbot with Ollama Integration

This component provides an AI-powered chatbot that leverages Ollama to answer questions about Artintel's platform, features, pricing, and AI models.

## Components Overview

### 1. FloatingChatIcon
A floating chat bubble that appears on all pages (except the dedicated chatbot page) that gives users quick access to AI assistance.

- **Context-Aware**: Understands which page the user is currently viewing
- **System Prompts**: Dynamically generates system prompts based on page context
- **Minimizable**: Can be collapsed to save screen space
- **Persistent**: Maintains chat history during the session

### 2. ChatInterface
The core chat UI component that handles:

- Message display and formatting
- User input (text and voice)
- Connection to Ollama models
- Loading states and error handling

## Key Features

### Page Context Awareness
The chatbot automatically detects which page the user is on and tailors its knowledge accordingly:

- **Artintel Pages**: Loads specific context about platform features
- **Features Pages**: Focuses on detailed feature descriptions
- **Pricing Pages**: Provides tier and pricing information
- **Model Pages**: Explains LLM/SLM differences and capabilities

### Ollama Integration

The chatbot connects to locally running Ollama models through a Next.js API route:

```
/api/ollama/route.ts
```

This route handles:
- Properly formatting messages with system prompts
- Error handling and fallback responses
- Processing streaming responses (when enabled)

## Setup Requirements

### 1. Install Ollama
Make sure [Ollama](https://ollama.ai/) is installed on your system or server.

### 2. Run a Compatible Model
Download and run a model that works well with the chatbot:

```bash
ollama pull llama2
# or
ollama pull mistral
```

### 3. Start Ollama
Make sure Ollama is running on the default port (11434):

```bash
ollama serve
```

## Customization

### Default Model
The default model is set to "llama2" but can be changed in:
- `/api/ollama/route.ts`

### System Prompts
System prompts are generated in `floating-chat-icon.tsx` based on the current page. You can modify the `CONTENT_CONTEXT` object to update the information provided for different pages.

### Styling
The chat interface uses Tailwind CSS and can be customized by modifying the class names in:
- `floating-chat-icon.tsx`
- `chat-interface.tsx`

## Security Considerations

- The API route communicates with a locally running Ollama instance
- No user data is stored beyond the current session
- System prompts are carefully crafted to prevent harmful outputs

## Future Enhancements

- Add support for document attachments
- Implement cross-page chat history persistence
- Add visual feedback for when context changes
- Support more Ollama models with model switching UI 