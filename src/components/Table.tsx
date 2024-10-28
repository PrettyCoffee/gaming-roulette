import * as React from "react"

import { cn } from "utils/utils"

const Root = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      style={{ borderCollapse: "separate", borderSpacing: "0" }}
      {...props}
    />
  </div>
))
Root.displayName = "Table.Root"

const Header = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("sticky top-0 z-10 bg-background", className)}
    {...props}
  />
))
Header.displayName = "Table.Header"

const Body = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
Body.displayName = "Table.Body"

const Footer = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-alt font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
Footer.displayName = "Table.Footer"

const Row = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "flex h-12 items-center border-b border-border data-[state=selected]:bg-muted [tbody>&:focus-within]:bg-alt [tbody>&:hover]:bg-alt",
      "[tfoot_&]:h-8 [thead_&:not(:last-of-type)]:h-8 [thead_&:not(:last-of-type)]:border-0",
      className
    )}
    {...props}
  />
))
Row.displayName = "Table.Row"

const Head = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "flex bg-background px-4 text-left font-medium text-muted-foreground",
      "relative after:absolute after:inset-y-0 after:right-0 after:my-auto after:block after:h-4 after:w-px after:bg-border",
      "[&:last-of-type:after]:hidden",
      className
    )}
    {...props}
  />
))
Head.displayName = "Table.Head"

const Cell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "h-max truncate px-4 [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
Cell.displayName = "Table.Cell"

const Caption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
Caption.displayName = "Table.Caption"

export const Table = {
  Root,
  Header,
  Body,
  Footer,
  Row,
  Head,
  Cell,
  Caption,
}
