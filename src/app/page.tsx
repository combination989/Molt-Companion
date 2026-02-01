'use client'

import { AlonChat } from '@/components/AlonChat'

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <AlonChat />
    </div>
  )
}
