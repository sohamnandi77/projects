import type {
  ColumnProps as AriaColumnProps,
  CellProps,
  RowProps,
  TableBodyProps,
  TableHeaderProps,
  TableProps,
} from "react-aria-components";
import React from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Cell as AriaCell,
  Column as AriaColumn,
  ResizableTableContainer as AriaResizableTableContainer,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  ColumnResizer,
  composeRenderProps,
  Group,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const ResizableTableContainer = AriaResizableTableContainer;

const Table = ({ className, ...props }: TableProps) => (
  <AriaTable
    className={composeTailwindRenderProps(
      "w-full caption-bottom text-sm -outline-offset-2 focus-visible:outline-ring",
      className,
    )}
    {...props}
  />
);

const TableHeader = <T extends object>({
  className,
  ...props
}: TableHeaderProps<T>) => (
  <AriaTableHeader
    className={composeTailwindRenderProps("[&_tr]:border-b", className)}
    {...props}
  />
);

export interface ColumnProps extends AriaColumnProps {
  isResizable?: boolean;
}

const TableHead = ({ className, children, ...props }: ColumnProps) => (
  <AriaColumn
    className={composeTailwindRenderProps(
      "h-12 text-left align-middle font-medium text-muted-foreground -outline-offset-2 focus-visible:outline-ring",
      className,
    )}
    {...props}
  >
    {composeRenderProps(children, (children, { allowsSorting }) => (
      <div className="flex items-center">
        <Group
          role="presentation"
          tabIndex={-1}
          className={cn(
            "flex h-10 flex-1 items-center gap-1 overflow-hidden rounded-md px-4",
            allowsSorting && "p-2 hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:-outline-offset-2 focus-visible:outline-ring [&:has([slot=selection])]:pr-0",
          )}
        >
          <span className="truncate">{children}</span>
          {allowsSorting && <ArrowUpDown className="ml-2 size-4" />}
        </Group>
        {props.isResizable && (
          <ColumnResizer className="box-content h-5 w-px translate-x-[8px] cursor-col-resize rounded bg-muted-foreground bg-clip-content px-[8px] py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resizing:w-[2px] resizing:bg-primary resizing:pl-[7px]" />
        )}
      </div>
    ))}
  </AriaColumn>
);

const TableBody = <T extends object>({
  className,
  ...props
}: TableBodyProps<T>) => (
  <AriaTableBody
    className={composeTailwindRenderProps(
      "-outline-offset-2 empty:h-24 empty:text-center focus-visible:outline-ring [&_tr:last-child]:border-0",
      className,
    )}
    {...props}
  />
);

const TableRow = <T extends object>({ className, ...props }: RowProps<T>) => (
  <AriaRow
    className={composeTailwindRenderProps(
      "border-b -outline-offset-2 transition-colors hover:bg-muted/50 focus-visible:outline-ring selected:bg-muted",
      className,
    )}
    {...props}
  />
);

const TableCell = ({ className, ...props }: CellProps) => (
  <AriaCell
    className={composeTailwindRenderProps(
      "p-4 align-middle -outline-offset-2 focus-visible:outline-ring [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
);

const TableFooter = <T extends object>({
  className,
  ...props
}: RowProps<T>) => (
  <AriaRow
    className={composeTailwindRenderProps(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
);

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  ResizableTableContainer,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
