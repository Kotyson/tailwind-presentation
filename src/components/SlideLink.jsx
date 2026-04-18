import { ArrowSquareOut } from "@phosphor-icons/react"

export function SlideLink({ href, children, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
    >
      <ArrowSquareOut className="size-3.5 shrink-0" />
      {children ?? label ?? href}
    </a>
  )
}
