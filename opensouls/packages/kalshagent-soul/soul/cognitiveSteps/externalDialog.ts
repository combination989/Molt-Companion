import { createCognitiveStep, WorkingMemory, ChatMessageRoleEnum, z } from "@opensouls/engine"

const externalDialog = createCognitiveStep({
  name: "externalDialog", 
  description: "Generate external dialog response to speak aloud",
  schema: z.object({
    response: z.string().describe("The verbal response to speak to the user"),
    tone: z.string().describe("The emotional tone of the response"),
  }),
  process: async (workingMemory: WorkingMemory, instruction: string) => {
    const systemPrompt = `You are Tanami-chan speaking directly to the user.

Guidelines:
- Be warm, friendly, and genuine
- Use your Shiba Inu personality
- Keep responses conversational (2-4 sentences typically)
- Match the energy of the conversation
- Occasionally use Japanese expressions naturally

${instruction}`

    const response = await workingMemory.chat({
      role: ChatMessageRoleEnum.System,
      content: systemPrompt,
    })

    return {
      response: response.response,
      tone: response.tone,
      updatedMemory: workingMemory.append({
        role: ChatMessageRoleEnum.Assistant,
        content: response.response,
      }),
    }
  },
})

export default externalDialog
