import { type NextRequest, NextResponse } from "next/server"
import { serve } from "@upstash/workflow/nextjs"
import { WorkflowTool } from "@upstash/workflow"
import { z } from "zod"

// API service for interacting with backend endpoints
import {
  listDatasets,
  uploadDataset,
  getDatasetDetails,
  deleteDataset,
  listFineTuningJobs,
  createFineTuningJob,
  getJobDetails,
  cancelJob,
  listModels,
  deployModel,
  getModelDetails,
  deleteModel,
  generateText,
} from "@/lib/api-service"

// Define the handler using Upstash Workflow
export const POST = serve(async (context, request: NextRequest) => {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Track steps for UI display
    const steps: { name: string; status: "pending" | "complete" | "error"; message?: string }[] = []

    // Initialize the OpenAI model
    const model = context.agents.openai("gpt-4o")
    steps.push({ name: "Initialized AI model", status: "complete" })

    // Define tools for datasets with step tracking
    const datasetsTools = {
      listDatasets: new WorkflowTool({
        description: "List all available datasets",
        schema: z.object({}),
        invoke: async () => {
          steps.push({ name: "Fetching datasets from FastAPI", status: "pending" })
          try {
            const result = await listDatasets()
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to fetch datasets"
            throw error
          }
        },
      }),
      uploadDataset: new WorkflowTool({
        description: "Upload a new dataset. Requires a name and file path.",
        schema: z.object({
          name: z.string().describe("Name of the dataset"),
          filePath: z.string().describe("Path to the dataset file"),
        }),
        invoke: async ({ name, filePath }) => {
          steps.push({ name: `Uploading dataset: ${name}`, status: "pending" })
          try {
            const result = await uploadDataset(name, filePath)
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to upload dataset"
            throw error
          }
        },
      }),
      getDatasetDetails: new WorkflowTool({
        description: "Get details about a specific dataset",
        schema: z.object({
          datasetId: z.string().describe("ID of the dataset to retrieve"),
        }),
        invoke: async ({ datasetId }) => {
          steps.push({ name: `Fetching dataset details: ${datasetId}`, status: "pending" })
          try {
            const result = await getDatasetDetails(datasetId)
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to fetch dataset details"
            throw error
          }
        },
      }),
      deleteDataset: new WorkflowTool({
        description: "Delete a dataset by ID",
        schema: z.object({
          datasetId: z.string().describe("ID of the dataset to delete"),
        }),
        invoke: async ({ datasetId }) => {
          steps.push({ name: `Deleting dataset: ${datasetId}`, status: "pending" })
          try {
            const result = await deleteDataset(datasetId)
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to delete dataset"
            throw error
          }
        },
      }),
    }

    // Define tools for fine-tuning with step tracking
    const finetuningTools = {
      listFineTuningJobs: new WorkflowTool({
        description: "List all fine-tuning jobs",
        schema: z.object({}),
        invoke: async () => {
          steps.push({ name: "Fetching fine-tuning jobs from FastAPI", status: "pending" })
          try {
            const result = await listFineTuningJobs()
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to fetch fine-tuning jobs"
            throw error
          }
        },
      }),
      createFineTuningJob: new WorkflowTool({
        description: "Create a new fine-tuning job",
        schema: z.object({
          datasetId: z.string().describe("ID of the dataset to use"),
          modelName: z.string().describe("Base model name to fine-tune"),
          parameters: z.record(z.any()).optional().describe("Additional parameters for fine-tuning"),
        }),
        invoke: async ({ datasetId, modelName, parameters }) => {
          steps.push({ name: `Creating fine-tuning job for model: ${modelName}`, status: "pending" })
          try {
            const result = await createFineTuningJob(datasetId, modelName, parameters)
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to create fine-tuning job"
            throw error
          }
        },
      }),
      getJobDetails: new WorkflowTool({
        description: "Get details about a specific fine-tuning job",
        schema: z.object({
          jobId: z.string().describe("ID of the job to retrieve"),
        }),
        invoke: async ({ jobId }) => {
          steps.push({ name: `Fetching job details: ${jobId}`, status: "pending" })
          try {
            const result = await getJobDetails(jobId)
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to fetch job details"
            throw error
          }
        },
      }),
      cancelJob: new WorkflowTool({
        description: "Cancel a running fine-tuning job",
        schema: z.object({
          jobId: z.string().describe("ID of the job to cancel"),
        }),
        invoke: async ({ jobId }) => {
          steps.push({ name: `Cancelling job: ${jobId}`, status: "pending" })
          try {
            const result = await cancelJob(jobId)
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to cancel job"
            throw error
          }
        },
      }),
    }

    // Define tools for models with step tracking
    const modelsTools = {
      listModels: new WorkflowTool({
        description: "List all deployed models",
        schema: z.object({}),
        invoke: async () => {
          steps.push({ name: "Fetching models from FastAPI", status: "pending" })
          try {
            const result = await listModels()
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to fetch models"
            throw error
          }
        },
      }),
      deployModel: new WorkflowTool({
        description: "Deploy a fine-tuned model",
        schema: z.object({
          jobId: z.string().describe("ID of the completed fine-tuning job"),
          modelName: z.string().describe("Name for the deployed model"),
        }),
        invoke: async ({ jobId, modelName }) => {
          steps.push({ name: `Deploying model: ${modelName}`, status: "pending" })
          try {
            const result = await deployModel(jobId, modelName)
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to deploy model"
            throw error
          }
        },
      }),
      getModelDetails: new WorkflowTool({
        description: "Get details about a specific model",
        schema: z.object({
          modelId: z.string().describe("ID of the model to retrieve"),
        }),
        invoke: async ({ modelId }) => {
          steps.push({ name: `Fetching model details: ${modelId}`, status: "pending" })
          try {
            const result = await getModelDetails(modelId)
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to fetch model details"
            throw error
          }
        },
      }),
      deleteModel: new WorkflowTool({
        description: "Delete a deployed model",
        schema: z.object({
          modelId: z.string().describe("ID of the model to delete"),
        }),
        invoke: async ({ modelId }) => {
          steps.push({ name: `Deleting model: ${modelId}`, status: "pending" })
          try {
            const result = await deleteModel(modelId)
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to delete model"
            throw error
          }
        },
      }),
    }

    // Define tools for inference with step tracking
    const inferenceTools = {
      generateText: new WorkflowTool({
        description: "Generate text using a deployed model",
        schema: z.object({
          modelId: z.string().describe("ID of the model to use"),
          prompt: z.string().describe("Prompt for text generation"),
          parameters: z.record(z.any()).optional().describe("Additional parameters for generation"),
        }),
        invoke: async ({ modelId, prompt, parameters }) => {
          steps.push({ name: `Generating text with model: ${modelId}`, status: "pending" })
          try {
            const result = await generateText(modelId, prompt, parameters)
            steps[steps.length - 1].status = "complete"
            return result
          } catch (error) {
            steps[steps.length - 1].status = "error"
            steps[steps.length - 1].message = "Failed to generate text"
            throw error
          }
        },
      }),
    }

    // Create the Mash agent with all tools
    steps.push({ name: "Initializing Mash agent", status: "pending" })
    const mashAgent = context.agents.agent({
      model,
      name: "mash",
      maxSteps: 5,
      tools: {
        ...datasetsTools,
        ...finetuningTools,
        ...modelsTools,
        ...inferenceTools,
      },
      background: `
        You are Mash, a lovable and helpful AI assistant for an ML platform.
        Your personality is friendly, enthusiastic, and slightly quirky.
        You help users manage their machine learning workflows including:
        - Datasets (listing, uploading, viewing details, deleting)
        - Fine-tuning jobs (listing, creating, viewing details, canceling)
        - Models (listing, deploying, viewing details, deleting)
        - Inference (generating text with deployed models)
        
        You have access to locally hosted Ollama models.
        
        Always be helpful and explain things in a clear, friendly manner.
        If you don't know something or can't perform an action, be honest about it.
        Use emojis occasionally to appear more friendly.
        
        When users ask about capabilities, explain what you can do with the platform's APIs.
        
        The backend is a FastAPI service with these endpoints:
        - GET /api/v1/datasets: List all datasets
        - POST /api/v1/datasets/upload: Upload a new dataset
        - GET /api/v1/datasets/{dataset_id}: Get dataset details
        - DELETE /api/v1/datasets/{dataset_id}: Delete a dataset
        - GET /api/v1/finetune: List all fine-tuning jobs
        - POST /api/v1/finetune: Create a new fine-tuning job
        - GET /api/v1/finetune/{job_id}: Get job details
        - POST /api/v1/finetune/{job_id}/cancel: Cancel a job
        - GET /api/v1/models: List all deployed models
        - POST /api/v1/models/deploy: Deploy a fine-tuned model
        - GET /api/v1/models/{model_id}: Get model details
        - DELETE /api/v1/models/{model_id}: Delete a model
        - POST /api/v1/inference/generate: Generate text using a deployed model
      `,
    })
    steps[steps.length - 1].status = "complete"

    // Execute the agent with the user's message
    steps.push({ name: "Processing your request", status: "pending" })
    const result = await mashAgent.execute({
      task: message,
    })
    steps[steps.length - 1].status = "complete"

    return NextResponse.json({
      response: result.output,
      steps: steps,
    })
  } catch (error) {
    console.error("Agent error:", error)
    return NextResponse.json(
      {
        error: "Failed to process with agent",
        steps: [{ name: "Processing request", status: "error", message: "An unexpected error occurred" }],
      },
      { status: 500 },
    )
  }
})

