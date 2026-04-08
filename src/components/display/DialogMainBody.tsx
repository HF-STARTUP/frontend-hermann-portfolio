import { cn } from "@/lib/utils";
import React from "react";


export interface DialogMainBodyProps {
  children: React.ReactNode;
  className?: string;  
}


export const DialogMainBody = React.forwardRef<HTMLDivElement, DialogMainBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 py-4 custom-scrollbar p-4 max-h-[calc(90dvh-11rem)] flex-grow",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

DialogMainBody.displayName = "DialogMainBody";