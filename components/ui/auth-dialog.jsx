"use client"
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { CircleX } from "lucide-react"
import { cn } from "@/lib/utils"

const AuthDialog = DialogPrimitive.Root
const AuthDialogTrigger = DialogPrimitive.Trigger
const AuthDialogPortal = DialogPrimitive.Portal
const AuthDialogClose = DialogPrimitive.Close

const AuthDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props} 
  />
))
AuthDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const AuthDialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AuthDialogPortal>
      <AuthDialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border card-gradient p-10 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[1.5rem]",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute -right-2 -top-2 bg-card rounded-full opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground p-2">
          <CircleX className="h-5 w-5 text-foreground" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </AuthDialogPortal>
  )
)
AuthDialogContent.displayName = DialogPrimitive.Content.displayName

const AuthDialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props} 
  />
)
AuthDialogHeader.displayName = "AuthDialogHeader"

const AuthDialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} 
  />
)
AuthDialogFooter.displayName = "AuthDialogFooter"

const AuthDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} 
  />
))
AuthDialogTitle.displayName = DialogPrimitive.Title.displayName

const AuthDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} 
  />
))
AuthDialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  AuthDialog,
  AuthDialogPortal,
  AuthDialogOverlay,
  AuthDialogTrigger,
  AuthDialogClose,
  AuthDialogContent,
  AuthDialogHeader,
  AuthDialogFooter,
  AuthDialogTitle,
  AuthDialogDescription,
}