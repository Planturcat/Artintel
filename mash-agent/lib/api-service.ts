// API service for interacting with FastAPI backend endpoints

// Base URL for the FastAPI backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1"

// Helper function for API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // Add timeout to prevent hanging requests
    signal: options.signal || (typeof AbortSignal !== 'undefined' ? 
      AbortSignal.timeout(15000) : undefined),
  }

  try {
    // Try to fetch with a timeout
    const response = await fetch(url, config)

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `API request failed with status ${response.status}`)
    }

    // Parse and return the JSON response
    return await response.json()
  } catch (error: any) {
    console.error(`Error in API request to ${endpoint}:`, error)
    
    // Return fallback empty responses based on endpoint type
    // This prevents the app from crashing when the backend is unavailable
    if (endpoint.includes('/datasets')) {
      console.warn('Backend API unavailable, returning empty datasets')
      return { datasets: [] }
    } 
    else if (endpoint.includes('/finetune')) {
      console.warn('Backend API unavailable, returning empty jobs')
      return { jobs: [] }
    }
    else if (endpoint.includes('/models/deployments')) {
      console.warn('Backend API unavailable, returning empty deployments')
      return { deployments: [] }
    }
    else if (endpoint.includes('/inference/available-deployments')) {
      console.warn('Backend API unavailable, returning empty available deployments')
      return { deployments: [] }
    }
    
    // For other endpoints, throw the error to be handled by the caller
    throw new Error(`Backend API is unavailable (${error.message}). Please check your connection or try again later.`)
  }
}

// Datasets API
export async function listDatasets() {
  try {
    return await apiRequest("/api/v1/datasets/")
  } catch (error) {
    console.error("Error listing datasets:", error)
    // Provide a fallback response
    return { datasets: [] }
  }
}

export async function uploadDataset(name: string, file: File) {
  const formData = new FormData()
  formData.append("name", name)
  formData.append("file", file)

  return await apiRequest("/api/v1/datasets/upload", {
    method: "POST",
    body: formData,
    headers: {}, // Let the browser set the content type for FormData
  })
}

export async function getDatasetDetails(datasetId: string) {
  return await apiRequest(`/api/v1/datasets/${datasetId}`)
}

export async function deleteDataset(datasetId: string) {
  return await apiRequest(`/api/v1/datasets/${datasetId}`, {
    method: "DELETE",
  })
}

// Fine-Tuning API
export async function listFineTuningJobs() {
  return await apiRequest("/api/v1/finetune/")
}

export async function createFineTuningJob(datasetId: string, modelName: string, parameters?: Record<string, any>) {
  return await apiRequest("/api/v1/finetune/", {
    method: "POST",
    body: JSON.stringify({
      dataset_id: datasetId,
      model_name: modelName,
      parameters,
    }),
  })
}

export async function getJobDetails(jobId: string) {
  return await apiRequest(`/api/v1/finetune/${jobId}`)
}

export async function cancelJob(jobId: string) {
  return await apiRequest(`/api/v1/finetune/${jobId}`, {
    method: "DELETE",
  })
}

// Models API
export async function listModelDeployments() {
  return await apiRequest("/api/v1/models/deployments")
}

export async function deployModel(jobId: string, modelName: string) {
  return await apiRequest("/api/v1/models/deploy", {
    method: "POST",
    body: JSON.stringify({
      job_id: jobId,
      model_name: modelName,
    }),
  })
}

export async function getModelDeploymentDetails(deploymentId: string) {
  return await apiRequest(`/api/v1/models/deployments/${deploymentId}`)
}

export async function undeployModel(deploymentId: string) {
  return await apiRequest(`/api/v1/models/deployments/${deploymentId}`, {
    method: "DELETE",
  })
}

// Inference API
export async function getAvailableDeployments() {
  return await apiRequest("/api/v1/inference/available-deployments")
}

export async function createCompletion(deploymentId: string, prompt: string, parameters?: Record<string, any>) {
  return await apiRequest("/api/v1/inference/completions", {
    method: "POST",
    body: JSON.stringify({
      deployment_id: deploymentId,
      prompt,
      parameters,
    }),
  })
}

export async function createAgenticRag(query: string, parameters?: Record<string, any>) {
  return await apiRequest("/api/v1/inference/agentic-rag", {
    method: "POST",
    body: JSON.stringify({
      query,
      parameters,
    }),
  })
}

export async function listModels() {
  return await apiRequest("/api/v1/models/")
}

export async function getModelDetails(modelId: string) {
  return await apiRequest(`/api/v1/models/${modelId}`)
}

export async function deleteModel(modelId: string) {
  return await apiRequest(`/api/v1/models/${modelId}`, {
    method: "DELETE",
  })
}

export async function generateText(modelId: string, prompt: string, parameters?: Record<string, any>) {
  return await apiRequest("/api/v1/inference/generate", {
    method: "POST",
    body: JSON.stringify({
      model_id: modelId,
      prompt: prompt,
      parameters: parameters,
    }),
  })
}

// Export a utility function to check if the backend is available
export async function checkBackendConnection(): Promise<boolean> {
  try {
    // Try a simple health check endpoint or list datasets with a short timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)
    
    const response = await fetch(`${API_BASE_URL}/api/v1/health`, {
      method: 'GET',
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    return response.ok
  } catch (error) {
    console.warn("Backend API connection check failed:", error)
    return false
  }
}

