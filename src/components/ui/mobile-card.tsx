import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const mobileCardVariants = cva(
  "rounded-lg border bg-gradient-card text-card-foreground shadow-soft transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-border",
        elevated: "border-border shadow-elevated hover:shadow-glow",
        glow: "border-primary/20 shadow-glow bg-gradient-primary text-primary-foreground",
        success: "border-success/20 bg-gradient-to-br from-success/10 to-success/5",
        warning: "border-warning/20 bg-gradient-to-br from-warning/10 to-warning/5",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface MobileCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mobileCardVariants> {}

const MobileCard = React.forwardRef<HTMLDivElement, MobileCardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(mobileCardVariants({ variant, size, className }))}
      {...props}
    />
  )
);
MobileCard.displayName = "MobileCard";

const MobileCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));
MobileCardHeader.displayName = "MobileCardHeader";

const MobileCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
MobileCardTitle.displayName = "MobileCardTitle";

const MobileCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
MobileCardDescription.displayName = "MobileCardDescription";

const MobileCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
MobileCardContent.displayName = "MobileCardContent";

const MobileCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
MobileCardFooter.displayName = "MobileCardFooter";

export {
  MobileCard,
  MobileCardHeader,
  MobileCardTitle,
  MobileCardDescription,
  MobileCardContent,
  MobileCardFooter,
};