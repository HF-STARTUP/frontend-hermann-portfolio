"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface CopyToClipboardProps {
  text: string
  className?: string
  textClassName?: string
}

export function CopyToClipboard({
  text,
  className,
  textClassName,
}: CopyToClipboardProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      void navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        const t = setTimeout(() => setCopied(false), 2000)
        return () => clearTimeout(t)
      })
    },
    [text]
  )

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={cn(
          "group/copy inline-flex items-center gap-1.5 min-w-0",
          className
        )}
      >
        <span
          className={cn("truncate min-w-0", textClassName)}
        >
          {text}
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 opacity-0 group-hover/copy:opacity-100 transition-opacity focus-visible:opacity-100"
              onClick={handleCopy}
              aria-label={copied ? "Copié" : "Copier"}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            {copied ? "Copié" : "Copier"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
