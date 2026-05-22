"use client";

import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogPortal = RadixDialog.Portal;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => (
  <RadixDialog.Overlay
    ref={ref}
    className={`fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm animate-fade-in ${className ?? ""}`}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className, children, ...props }, ref) => (
  <RadixDialog.Portal>
    <DialogOverlay />
    <RadixDialog.Content
      ref={ref}
      className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto animate-fade-in ${className ?? ""}`}
      {...props}
    >
      {children}
      <RadixDialog.Close className="absolute top-4 right-4 p-2 rounded-lg text-ink-300 hover:text-ink-600 hover:bg-limestone-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500">
        <X className="w-5 h-5" />
        <VisuallyHidden.Root>Close</VisuallyHidden.Root>
      </RadixDialog.Close>
    </RadixDialog.Content>
  </RadixDialog.Portal>
));
DialogContent.displayName = "DialogContent";

export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col space-y-2 p-6 border-b border-line ${className ?? ""}`}
    {...props}
  />
);

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={`font-display text-xl text-ink-900 font-semibold ${className ?? ""}`}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={`text-ink-600 text-sm ${className ?? ""}`}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-6 border-t border-line ${className ?? ""}`}
    {...props}
  />
);

export const DialogClose = RadixDialog.Close;
