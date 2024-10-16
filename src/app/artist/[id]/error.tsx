'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { startTransition, useEffect } from 'react'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const { refresh } = useRouter()

  return (
    <section className="flex items-center justify-center min-h-screen py-8 pb-20 m-auto max-w-custom container">
      <article className="flex flex-col items-center gap-6 p-4">
        <div className="txt">
          <h2 className="font-bold">페이지에서 오류가 발생했습니다!</h2>
          <p className="mt-8">{error.message}</p>
        </div>

        <Button
          onClick={() =>
            startTransition(() => {
              refresh()
              reset()
            })
          }
        >
          다시 시도하기
        </Button>
      </article>
    </section>
  )
}
