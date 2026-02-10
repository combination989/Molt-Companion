import { Soul } from "@opensouls/engine"

const kalshagent = new Soul({
  name: "kalshagent",
  blueprint: "kalshagent-soul",
  soulId: "kalshagent-shared-session",
  initialProcess: "initialProcess",
  staticMemories: {
    core: load("./staticMemories/core.md"),
  },
  defaultModel: "gpt-4o-mini",
  config: {
    maxTokens: 500,
    temperature: 0.8,
  },
})

export default kalshagent
