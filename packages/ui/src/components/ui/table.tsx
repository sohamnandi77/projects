import type {
  ColumnProps,
  ColumnResizerProps,
  TableBodyProps,
  CellProps as TableCellProps,
  TableHeaderProps,
  TableProps as TablePrimitiveProps,
  RowProps as TableRowProps,
} from "react-aria-components";
import { useMemo } from "react";
import { ChevronDown, Menu } from "lucide-react";
import {
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  Button,
  Cell,
  Collection,
  Column,
  ColumnResizer as ColumnResizerPrimitive,
  composeRenderProps,
  ResizableTableContainer,
  Row,
  Table as TablePrimitive,
  useTableOptions,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Checkbox } from "@projects/ui/checkbox";
import { cn, createContextFactory } from "@projects/ui/lib/utils";

// eslint-disable-next-line tailwindcss/no-custom-classname
const table = tv({
  slots: {
    root: "table w-full min-w-full caption-bottom border-spacing-0 text-sm outline-none [&_[data-drop-target]]:border [&_[data-drop-target]]:border-primary",
    header: "border-b",
    row: "tr group relative cursor-default border-b text-fg/70 outline-none ring-primary focus-visible:ring-1 selected:bg-accent-subtle selected:hover:bg-accent-subtle/50 dark:selected:hover:bg-accent-subtle/60",
    cellIcon:
      "grid size-[1.15rem] flex-none shrink-0 place-content-center rounded bg-secondary text-fg [&>[data-slot=icon]]:size-3.5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:transition-transform [&>[data-slot=icon]]:duration-200",
    columnResizer: [
      "absolute inset-y-0 right-0 grid w-px touch-none place-content-center px-1 [&[data-resizing]>div]:bg-primary",
      "&[data-resizable-direction=left]:cursor-e-resize &[data-resizable-direction=right]:cursor-w-resize [&[data-resizable-direction=both]]:cursor-ew-resize",
    ],
  },
});

const { root, header, row, cellIcon, columnResizer } = table();

interface TableContextValue {
  allowResize?: boolean;
}

const [TableContext, useTableContext] = createContextFactory<
  TableContextValue | undefined
>();

interface TableProps extends TablePrimitiveProps {
  allowResize?: boolean;
}
const Table = (props: TableProps) => {
  const { children, allowResize, className, ...rest } = props;
  const value = useMemo(() => ({ allowResize }), [allowResize]);
  return (
    <TableContext value={value}>
      <div className="relative w-full overflow-auto">
        {allowResize ? (
          <ResizableTableContainer className="overflow-auto">
            <TablePrimitive
              {...rest}
              className={composeRenderProps(className, (className) =>
                root({ className }),
              )}>
              {children}
            </TablePrimitive>
          </ResizableTableContainer>
        ) : (
          <TablePrimitive
            {...rest}
            className={composeRenderProps(className, (className) =>
              root({ className }),
            )}>
            {children}
          </TablePrimitive>
        )}
      </div>
    </TableContext>
  );
};

const ColumnResizer = (props: ColumnResizerProps) => {
  const { className, ...rest } = props;
  return (
    <ColumnResizerPrimitive
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        columnResizer({
          ...renderProps,
          className,
        }),
      )}>
      <div className="h-full w-px bg-border py-3" />
    </ColumnResizerPrimitive>
  );
};

const TableBody = <T extends object>(props: TableBodyProps<T>) => (
  <AriaTableBody {...props} className={cn("[&_.tr:last-child]:border-0")} />
);

const cellStyles = tv({
  base: "group p-3 outline-none",
  variants: {
    allowResize: {
      true: "overflow-hidden truncate",
    },
  },
});
const TableCell = (props: TableCellProps) => {
  const { children, className, ...rest } = props;
  const context = useTableContext();
  if (!context) {
    throw new Error("TableCell must be within Table");
  }
  const { allowResize } = context;
  return (
    <Cell
      {...rest}
      className={composeRenderProps(className, (className) =>
        cellStyles({ allowResize, className }),
      )}>
      {children}
    </Cell>
  );
};

const columnStyles = tv({
  base: "relative whitespace-nowrap p-3 text-left font-medium outline-none allows-sorting:cursor-pointer dragging:cursor-grabbing [&:has([slot=selection])]:pr-0",
  variants: {
    isResizable: {
      true: "overflow-hidden truncate",
    },
  },
});

interface TableColumnProps extends ColumnProps {
  isResizable?: boolean;
}

const TableColumn = (props: TableColumnProps) => {
  const { isResizable = false, children, className, ...rest } = props;
  return (
    <Column
      {...rest}
      className={composeRenderProps(className, (className) =>
        columnStyles({
          isResizable,
          className,
        }),
      )}>
      {composeRenderProps(
        children,
        (children, { allowsSorting, sortDirection, isHovered }) => (
          <div className="flex items-center gap-2 [&_[data-slot=icon]]:shrink-0">
            {children}
            {allowsSorting && (
              <span
                className={cellIcon({
                  className: isHovered ? "bg-secondary-fg/10" : "",
                })}>
                <ChevronDown
                  className={cn(
                    "size-4",
                    sortDirection === "ascending" ? "rotate-180" : "",
                  )}
                />
              </span>
            )}
            {isResizable && <ColumnResizer />}
          </div>
        ),
      )}
    </Column>
  );
};

const TableHeader = <T extends object>(props: TableHeaderProps<T>) => {
  const { children, className, columns, ...rest } = props;
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();
  return (
    <AriaTableHeader
      {...rest}
      className={composeRenderProps(className, (className) =>
        header({ className }),
      )}>
      {allowsDragging && <Column className="w-0" />}
      {selectionBehavior === "toggle" && (
        <Column className="w-0 pl-4">
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaTableHeader>
  );
};

const TableRow = <T extends object>(props: TableRowProps<T>) => {
  const { children, href, className, columns, id, ...rest } = props;
  const { selectionBehavior, allowsDragging } = useTableOptions();
  return (
    <Row
      id={id}
      href={href}
      {...rest}
      className={composeRenderProps(className, (className) =>
        row({
          className: href
            ? cn("cursor-pointer hover:bg-secondary/50", className)
            : "",
        }),
      )}>
      {allowsDragging && (
        <Cell className="group cursor-grab pr-0 ring-primary dragging:cursor-grabbing">
          <Button
            className="relative bg-transparent py-1.5 pl-3.5 text-muted-fg pressed:text-fg"
            slot="drag">
            <Menu />
          </Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell className="pl-4">
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 hidden h-full w-0.5 bg-primary group-selected:block"
          />
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </Row>
  );
};

const TableCaption = (props: React.HTMLAttributes<HTMLTableCaptionElement>) => {
  const { className, ...rest } = props;
  return (
    <caption
      {...rest}
      className={cn("mt-4 text-sm text-muted-fg", className)}
    />
  );
};

const TableFooter = (props: React.HTMLAttributes<HTMLTableSectionElement>) => {
  const { className, ...rest } = props;
  return (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...rest}
    />
  );
};

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  TableFooter,
};
