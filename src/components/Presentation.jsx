import { useCallback, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { slides } from "../slides"
import { Badge } from "./ui/badge"

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

export default function Presentation() {
  const [index, setIndex] = useState(0)

  const slide = slides[index]
  const SlideComponent = slide.component

  const total = slides.length

  const go = useCallback((n) => setIndex(() => clamp(n, 0, total - 1)), [total])
  const prev = useCallback(() => setIndex((i) => clamp(i - 1, 0, total - 1)), [total])
  const next = useCallback(() => setIndex((i) => clamp(i + 1, 0, total - 1)), [total])

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "PageUp") prev()
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") next()
      if (e.key === "Home") go(0)
      if (e.key === "End") go(total - 1)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [go, next, prev, total])

  // Set document title
  useEffect(() => {
    document.title = `${index + 1}/${total} — ${slide.title}`
  }, [index, total, slide.title])

  return (
    <div className="relative h-screen w-screen overflow-hidden text-foreground">
      {/* Slide content */}
      <div className="h-full w-full">
        <SlideComponent />
      </div>

      {/* Overlay nav bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-4">
        <Card className="pointer-events-auto flex w-full max-w-2xl flex-row items-center gap-3 rounded-2xl px-4 py-3 opacity-80 bg-card/70 backdrop-blur-lg">
          <Button variant="ghost" size="sm" onClick={prev} disabled={index === 0}>
            ← Prev
          </Button>

          {/* Progress dots */}
          <div className="flex flex-1 items-center justify-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i)}
                title={s.title}
                className={[
                  "h-1.5 rounded-full transition-all",
                  i === index
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                ].join(" ")}
              />
            ))}
          </div>

          {/* Slide title + counter */}
          <Badge className="min-w-0 text-center text-xs text-white tabular-nums">
            {index + 1} / {total}
          </Badge>

          <Button variant="ghost" size="sm" onClick={next} disabled={index === total - 1}>
            Next →
          </Button>
        </Card>
      </div>
    </div>
  )
}
