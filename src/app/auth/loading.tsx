import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-primary w-10 h-10" />
    </div>
  )
}
