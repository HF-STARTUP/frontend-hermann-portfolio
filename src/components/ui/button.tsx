"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link" // Ajout de l'import pour la navigation Next.js

import { cn } from "@/lib/utils"
import { Loader } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground text-vaTextPrimary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-vaTextPrimary",
        link: "text-primary underline-offset-4 hover:underline",
        mainBlue: "bg-vaMainBlue text-white",
        mainBlueOutline: "border border-vaMainBlue text-vaMainBlue",
        orange: "bg-vaOrange text-black font-semibold",
        success: "bg-vaGreen text-white font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-11 rounded-xl px-8",
        xl: "h-12 rounded-xl px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Extension des types pour accepter les attributs d'un lien si href est présent
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string // Ajout de la prop href facultative
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps & { fullWidth?: boolean, loading?: boolean }>(
  ({ className, variant, size, asChild = false, loading = false, fullWidth = false, children, disabled, href, ...props }, ref) => {
    
    // Si un href est fourni, on utilise le composant Link de Next.js, sinon le Slot ou le bouton classique
    const Comp = asChild ? Slot : href ? Link : "button"
    
    // Ajustement des propriétés selon le composant rendu (href attend un ancrage)
    const componentProps = href ? { href, ...props } : props;
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), fullWidth && "w-full")}
        ref={ref as any}
        disabled={disabled || loading}
        {...(componentProps as any)}
      >
        {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }