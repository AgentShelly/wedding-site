"use client";

import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

export const Select = RadixSelect.Root;
export const SelectValue = RadixSelect.Value;

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl border border-line text-ink-900 text-sm bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 outline-none transition-colors ${className ?? ""}`}
    {...props}
  >
    {children}
    <RadixSelect.Icon>
      <ChevronDown className="w-4 h-4 text-ink-300" />
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      className={`z-50 min-w-[8rem] rounded-xl border border-line bg-white shadow-lg py-1 animate-fade-in ${className ?? ""}`}
      {...props}
    >
      <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Portal>
));
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={`relative flex items-center gap-2 px-4 py-2.5 text-sm text-ink-600 hover:bg-limestone-100 hover:text-ink-900 outline-none cursor-pointer data-[highlighted]:bg-limestone-100 data-[highlighted]:text-ink-900 data-[state=checked]:text-emerald-500 data-[state=checked]:font-semibold ${className ?? ""}`}
    {...props}
  >
    <RadixSelect.ItemIndicator>
      <Check className="w-4 h-4" />
    </RadixSelect.ItemIndicator>
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));
SelectItem.displayName = "SelectItem";
