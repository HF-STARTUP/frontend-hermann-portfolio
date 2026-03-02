import { cn } from "@/lib/utils"

export const DialogMainBody = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 py-4 custom-scrollbar p-4", className)}>
      {children}
    </div>
  )
}