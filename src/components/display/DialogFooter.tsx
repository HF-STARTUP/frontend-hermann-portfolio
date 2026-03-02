import { cn } from "@/lib/utils"

export const DialogFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("p-4 shadow-sm w-full", className)}>
      {children}
    </div>
  )
}