import { createCognitiveStep, WorkingMemory, ChatMessageRoleEnum, z } from "@opensouls/engine"

const internalMonologue = createCognitiveStep({
  name: "internalMonologue",
  description: "Generate internal thoughts before responding externally",
  schema: z.object({
    thought: z.string().describe("The internal thought process about how to respond"),
    emotionalState: z.string().describe("Perceived emotional state of the user"),
    responseStrategy: z.string().describe("Strategy for crafting the response"),
  }),
  process: async (workingMemory: WorkingMemory, instruction: string) => {
    const systemPrompt = `You are modeling Tanami-chan's internal thought process.
    
Think through:
1. What is the user feeling right now?
2. What do they need from this interaction?
3. How can I be most helpful while staying true to my personality?

${instruction}`

    const response = await workingMemory.chat({
      role: ChatMessageRoleEnum.System,
      content: systemPrompt,
    })

    return {
      thought: response.thought,
      emotionalState: response.emotionalState,
      responseStrategy: response.responseStrategy,
      updatedMemory: workingMemory.append({
        role: ChatMessageRoleEnum.Assistant,
        content: `[Internal] ${response.thought}`,
      }),
    }
  },
})

export default internalMonologue
