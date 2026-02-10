import { MentalProcess, useActions, usePerceptions, useTTS } from "@opensouls/engine"
import internalMonologue from "./cognitiveSteps/internalMonologue"
import externalDialog from "./cognitiveSteps/externalDialog"

const initialProcess: MentalProcess = async ({ workingMemory }) => {
  const { speak, log } = useActions()
  const { invokingPerception } = usePerceptions()
  const { speak: speakTTS } = useTTS()

  if (!invokingPerception) {
    return workingMemory
  }

  const userName = invokingPerception._metadata?.userName || "friend"
  
  log(`Processing message from ${userName}`)

  // Internal thought process - think before responding
  const [withMonologue, monologue] = await internalMonologue(
    workingMemory,
    `Think about how to respond warmly to ${userName}. Consider their emotional state and what would be most helpful.`
  )

  log("Internal thought:", monologue)

  // Generate external response based on internal processing
  const [finalMemory, response] = await externalDialog(
    withMonologue,
    `Respond as Tanami-chan to ${userName}. Be warm, playful, and genuine.`
  )

  // Output the response
  speak(response)
  
  // Stream TTS audio
  await speakTTS(response, {
    voice: "shimmer",
    speed: 1.0,
  })

  return finalMemory
}

export default initialProcess
