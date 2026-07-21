"use client";

import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  onNearBottom?: () => void;
  threshold?: number;
}

export const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
  ({ className, children, onNearBottom, threshold = 300, ...props }, forwardedRef) => {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const hasTriggeredRef = useRef(false);

    useEffect(() => {
      const node = innerRef.current;
      if (!node || !onNearBottom) return;

      const handleScroll = () => {
        const distanceFromBottom =
          node.scrollHeight - node.scrollTop - node.clientHeight;

        if (distanceFromBottom <= threshold) {
          if (!hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            onNearBottom();
          }
        } else {
          hasTriggeredRef.current = false;
        }
      };

      node.addEventListener("scroll", handleScroll, { passive: true });
      return () => node.removeEventListener("scroll", handleScroll);
    }, [onNearBottom, threshold]);

    return (
      <div
        ref={(node) => {
          innerRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        className={cn("overflow-y-auto", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollContainer.displayName = "ScrollContainer";