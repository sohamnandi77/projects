import type {
  ModalOverlayProps,
  SeparatorProps,
  TextProps,
} from "react-aria-components";
import { createContext, forwardRef, useContext, useMemo } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search, X } from "lucide-react";
import {
  Button,
  Dialog,
  Modal,
  ModalOverlay,
  Text,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import type { KeyboardProps } from "@projects/ui/keyboard";
import { useViewport } from "@projects/hooks/use-viewport";
import { Keyboard } from "@projects/ui/keyboard";
import { cn } from "@projects/ui/lib/utils";
import { Separator } from "@projects/ui/separator";

// eslint-disable-next-line tailwindcss/no-custom-classname
const commandStyles = tv({
  slots: {
    command: [
      "flex h-svh w-full flex-col overflow-hidden rounded-md sm:h-full",
      "[&_[cmdk-group-heading]]:-mb-1.5 [&_[cmdk-group-heading]]:ml-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-fg [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_[data-slot=icon]]:size-5 [&_[cmdk-input]]:h-12",
      "[&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:pl-2.5 [&_[cmdk-item]]:pr-4",
    ],
    list: "max-h-[calc(100vh-35%)] overflow-y-auto overflow-x-hidden pb-16 md:max-h-[456px] lg:pb-0 [&:not(:has(.xda32kfseccmd))]:p-2 [&:not(:has(.xda32kfseccmd))_.s3xsprt]:my-2",
    input: [
      "flex w-full rounded-md bg-transparent text-base placeholder:text-muted-fg forced-colors:focus:outline-0",
      "focus:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    section: [
      "xda32kfseccmd overflow-hidden p-2 text-fg",
      "[&_[cmdk-group-heading]]:ml-px [&_[cmdk-group-heading]]:select-none [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[0.8rem] [&_[cmdk-group-heading]]:text-muted-fg",
    ],
    modal: [
      "fixed bottom-0 left-1/2 top-auto z-50 grid h-[calc(100vh-35%)] w-full max-w-full translate-x-1/2 gap-4 overflow-hidden rounded-t-2xl bg-overlay text-overlay-fg shadow-lg ring-1 ring-dark/5 dark:ring-border sm:bottom-auto sm:top-24 sm:h-auto sm:w-full sm:max-w-2xl sm:rounded-xl forced-colors:border",
      "entering:duration-300 entering:animate-in entering:fade-in-0 entering:slide-in-from-bottom-1/2 entering:slide-in-from-left-1/2 entering:[transition-timing-function:ease-out] sm:entering:duration-300 sm:entering:slide-in-from-top-[2rem]",
      "exiting:duration-300 exiting:animate-out exiting:fade-out-0 exiting:slide-out-to-bottom-1/2 exiting:slide-out-to-left-1/2 exiting:[transition-timing-function:ease] sm:exiting:slide-out-to-top-[4rem]",
    ],
    closeButton: [
      "absolute right-3 top-1.5 rounded-full border border-transparent p-2.5 text-xs transition-opacity data-[state=open]:bg-secondary data-[state=open]:text-muted-fg focus:outline-none disabled:pointer-events-none lg:top-3.5 lg:border-border lg:bg-secondary/50 lg:py-0.5 lg:focus:border-fg/70 lg:focus:ring-2 lg:focus:ring-ring [&>span>[data-slot=icon]]:text-muted-fg pressed:[&_[data-slot=icon]]:text-fg",
      "focus:outline-none lg:focus:border-primary/70 lg:focus:bg-primary/10 lg:focus:ring-2 lg:focus:ring-primary/20",
      "disabled:pointer-events-none",
    ],
    empty: "x3tmpy py-6 text-center text-sm text-muted-fg",
    kbdKeyboard: "hidden group-data-[selected=true]:opacity-60 lg:block",
    description: "ml-auto hidden text-sm sm:inline",
    item: [
      "group relative flex cursor-default select-none items-center rounded-lg py-2 text-sm text-fg outline-none forced-colors:outline-0",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-fg forced-colors:text-[WindowText] forced-colors:data-[selected=true]:bg-[Highlight] forced-colors:data-[selected=true]:text-[ActiveCaption] [&[data-selected=true]_[data-slot=icon]]:text-accent-fg",
      "focus-visible:bg-accent focus-visible:text-accent-fg [&:focus-visible_[data-slot=icon]]:text-accent-fg",
      "data-[danger=true]:data-[selected=true]:bg-danger data-[danger=true]:data-[selected=true]:text-danger-fg data-[danger=true]:text-danger",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "[&_[data-slot=icon]]:mr-2 [&_[data-slot=icon]]:size-[1.10rem] [&_[data-slot=icon]]:shrink-0 [&_[data-slot=icon]]:text-muted-fg",
      "[&_[data-slot=avatar]]:mr-2 [&_[data-slot=avatar]]:size-[1.10rem] [&_[data-slot=avatar]]:shrink-0",
      "forced-colors:[&_[data-slot=icon]]:text-[CanvasText] forced-colors:[&_[data-slot=icon]]:group-data-[focus]:text-[Canvas] ",
    ],
  },
  variants: {
    isDanger: {
      true: "text-danger data-[selected=true]:bg-danger data-[selected=true]:text-danger-fg [&[data-selected=true]_[data-slot=icon]]:text-danger-fg",
    },
  },
});

const {
  command,
  empty,
  section,
  list,
  item,
  closeButton,
  modal,
  input,
  kbdKeyboard,
  description,
} = commandStyles();

interface CommandMenuContextProps {
  hideSearchIndicator?: boolean;
  hideCloseButton?: boolean;
  messageOnEmpty?: boolean | string;
  isBlurred?: boolean;
}

const CommandMenuContext = createContext<CommandMenuContextProps>({});

interface CommandMenuRootProps {
  CommandMenuEmpty?: typeof CommandMenuEmpty;
  CommandMenuInput?: typeof CommandMenuInput;
  CommandMenuItem?: typeof CommandMenuItem;
  CommandMenuKeyboard?: typeof CommandMenuKeyboard;
  CommandMenuList?: typeof CommandMenuList;
  CommandMenuSection?: typeof CommandMenuSection;
  CommandMenuSeparator?: typeof CommandMenuSeparator;
  CommandMenuDescription?: typeof CommandMenuDescription;
}

const modalOverlay = tv({
  base: [
    "fixed inset-0 z-50 max-h-[--visual-viewport-height] bg-dark/15 entering:animate-in entering:fade-in-0 exiting:animate-in exiting:fade-out-0 dark:bg-dark/40",
  ],
  variants: {
    isBlurred: {
      true: "backdrop-blur",
      false: "bg-dark/15 dark:bg-dark/40",
    },
  },
});
interface CommandMenuProps
  extends ModalOverlayProps,
    CommandMenuRootProps,
    CommandMenuContextProps {
  children: React.ReactNode;
  value?: string;
  messageOnEmpty?: boolean | string;
  onValueChange?: (value: string) => void;
  classNames?: {
    overlay?: string;
    content?: string;
  };
}

const CommandMenu = ({
  classNames,
  hideSearchIndicator = false,
  hideCloseButton = false,
  messageOnEmpty,
  value,
  onValueChange,
  children,
  isBlurred = false,
  ...props
}: CommandMenuProps) => {
  const { isDesktop } = useViewport();

  const providerValue = useMemo(
    () => ({ hideSearchIndicator, hideCloseButton, messageOnEmpty }),
    [hideSearchIndicator, hideCloseButton, messageOnEmpty],
  );

  return (
    <CommandMenuContext value={providerValue}>
      <ModalOverlay
        isDismissable
        className={modalOverlay({
          isBlurred,
          className: classNames?.overlay,
        })}
        {...props}
      >
        <Modal className={modal({ className: classNames?.content })}>
          <Dialog className="outline-none" aria-label="Command Palette">
            {({ close }) => (
              <>
                <CommandPrimitive
                  value={value}
                  onValueChange={onValueChange}
                  className={command()}
                >
                  {children}
                </CommandPrimitive>
                {!hideCloseButton && (
                  <Button
                    autoFocus={!isDesktop}
                    onPress={close}
                    className={closeButton()}
                  >
                    <span className="hidden lg:block">Esc</span>
                    <span className="-mr-2 block lg:hidden">
                      <X />
                      <span className="sr-only">Close command palette</span>
                    </span>
                  </Button>
                )}
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </CommandMenuContext>
  );
};

type CommandMenuInputProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
>;

const CommandMenuInput = forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  CommandMenuInputProps
>(({ className, ...props }, ref) => {
  const { hideSearchIndicator } = useContext(CommandMenuContext);
  return (
    <div className="flex items-center border-b px-3">
      {!hideSearchIndicator && (
        <Search className="mr-2 size-5 shrink-0 opacity-50" />
      )}
      <CommandPrimitive.Input
        autoFocus
        ref={ref}
        className={input({
          className: hideSearchIndicator ? "pl-1" : className,
        })}
        {...props}
      />
    </div>
  );
});

CommandMenuInput.displayName = CommandPrimitive.Input.displayName;

type CommandMenuListProps = React.ComponentProps<typeof CommandPrimitive.List>;

const CommandMenuList = ({ className, ...props }: CommandMenuListProps) => {
  const { messageOnEmpty } = useContext(CommandMenuContext);
  return (
    <CommandPrimitive.List className={list({ className })} {...props}>
      {messageOnEmpty !== false && (
        <CommandMenuEmpty>
          {typeof messageOnEmpty === "string"
            ? messageOnEmpty
            : "No results found."}
        </CommandMenuEmpty>
      )}
      {props.children}
    </CommandPrimitive.List>
  );
};

type CommandMenuEmptyProps = React.ComponentProps<
  typeof CommandPrimitive.Empty
>;

const CommandMenuEmpty = ({ className, ...props }: CommandMenuEmptyProps) => {
  return <CommandPrimitive.Empty className={empty({ className })} {...props} />;
};

interface CommandSectionProps
  extends React.ComponentProps<typeof CommandPrimitive.Group> {
  separator?: boolean;
}

const CommandMenuSection = ({
  className,
  separator,
  ...props
}: CommandSectionProps) => {
  return (
    <CommandPrimitive.Group className={section({ className })} {...props}>
      {props.children}
      {separator && <CommandMenuSeparator className="mt-2" />}
    </CommandPrimitive.Group>
  );
};

const CommandMenuSeparator = ({ className, ...props }: SeparatorProps) => {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="s3xsprt -mx-4">
      <Separator className={className} {...props} orientation="horizontal" />
    </div>
  );
};

interface CommandItemProps
  extends React.ComponentProps<typeof CommandPrimitive.Item> {
  isDanger?: boolean;
}

const CommandMenuItem = ({
  isDanger,
  className,
  ...props
}: CommandItemProps) => {
  return (
    <CommandPrimitive.Item
      data-danger={isDanger ? "true" : undefined}
      className={item({ isDanger, className })}
      {...props}
    />
  );
};

interface CommandMenuDescriptionProps extends TextProps {
  intent?: "danger" | "warning" | "primary" | "secondary" | "success";
}

const commandMenuDescriptionVariants = tv({
  variants: {
    intent: {
      danger: "text-danger/90 group-data-[selected=true]:text-accent-fg/70",
      warning: "text-warning/90 group-data-[selected=true]:text-accent-fg/70",
      success: "text-success/90 group-data-[selected=true]:text-accent-fg/70",
      primary: "text-accent/90 group-data-[selected=true]:text-white/70",
      secondary: "text-muted-fg group-data-[selected=true]:text-accent-fg/70",
    },
  },
});

const CommandMenuDescription = ({
  intent,
  className,
  ...props
}: CommandMenuDescriptionProps) => {
  return (
    <Text
      {...props}
      slot="description"
      className={description({
        className: cn(commandMenuDescriptionVariants({ intent }), className),
      })}
    />
  );
};

const CommandMenuKeyboard = (props: KeyboardProps) => (
  <Keyboard classNames={{ kbd: kbdKeyboard(), base: "-mr-2.5" }} {...props} />
);

export {
  CommandMenu,
  CommandMenuEmpty,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuKeyboard,
  CommandMenuList,
  CommandMenuSection,
  CommandMenuSeparator,
  CommandMenuDescription,
};
