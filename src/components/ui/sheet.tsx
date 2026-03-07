"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronLeftIcon, ChevronRightIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> & {
    allowNestedDialogs?: boolean;
  }
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 overflow-visible",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
      variant: {
        sm: "w-[300px]",
        md: "w-[400px]",
        lg: "w-[500px]",
        xl: "w-[550px]",
        "2xl": "w-[700px]",
      },
    },
    defaultVariants: {
      side: "right",
      variant: "sm",
    },
  }
);

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  /** Empêche la fermeture quand on clique sur un Dialog (headlessui ou autre) */
  allowNestedDialogs?: boolean;
  variant?: VariantProps<typeof sheetVariants>['variant']
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(
  (
    {
      side = "right",
      className,
      children,
      allowNestedDialogs = false,
      onInteractOutside,
      onPointerDownOutside,
      variant = 'md',
      ...props
    },
    ref
  ) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side, variant }), className, "p-0")}
        onInteractOutside={(e) => {
          // Empêche la fermeture si on clique sur un Dialog headlessui ou Radix
          if (allowNestedDialogs) {
            const target = e.target as HTMLElement;
            if (
              target?.closest('[role="dialog"]') ||
              target?.closest("[data-headlessui-state]") ||
              target?.closest("[data-radix-popper-content-wrapper]")
            ) {
              e.preventDefault();
            }
          }
          onInteractOutside?.(e);
        }}
        onPointerDownOutside={(e) => {
          if (allowNestedDialogs) {
            const target = e.target as HTMLElement;
            if (
              target?.closest('[role="dialog"]') ||
              target?.closest("[data-headlessui-state]") ||
              target?.closest("[data-radix-popper-content-wrapper]")
            ) {
              e.preventDefault();
            }
          }
          onPointerDownOutside?.(e);
        }}
        {...props}>
        {children}
        <SheetPrimitive.Close
          className={cn(
            "absolute flex justify-center items-center top-[48vh] bg-white h-10 w-10 rounded-full ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary z-[10] shadow-lg",
            side === "right" && "left-[-65px]",
            side === "left" && "right-[-65px]",
            side === "top" && "bottom-[-65px] left-1/2 -translate-x-1/2",
            side === "bottom" && "top-[-65px] left-1/2 -translate-x-1/2"
          )}>
          {side === "right" && <ChevronRightIcon className="h-4 w-4" />}
          {side === "left" && <ChevronLeftIcon className="h-4 w-4" />}
          {(side === "top" || side === "bottom") && (
            <ChevronRightIcon className="h-4 w-4 rotate-90" />
          )}
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left p-4",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};