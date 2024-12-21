import type {
  MenuItemProps as MenuItemPrimitiveProps,
  MenuProps as MenuPrimitiveProps,
  MenuSectionProps,
  MenuTriggerProps as MenuTriggerPrimitiveProps,
  SeparatorProps,
  SubmenuTriggerProps,
} from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import { createContext, useContext, useMemo } from "react";
import { Check, ChevronRight, Circle } from "lucide-react";
import {
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  Collection,
  composeRenderProps,
  Header,
  Menu as MenuPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  Separator,
  SubmenuTrigger as SubmenuTriggerPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import type { ButtonProps } from "@projects/ui/button";
import type { PopoverProps } from "@projects/ui/popover";
import { Button } from "@projects/ui/button";
import {
  dropdownItemVariants,
  dropdownSectionVariants,
  DropdownItemDetails as MenuItemDetails,
} from "@projects/ui/dropdown";
import { Keyboard as MenuKeyboard } from "@projects/ui/keyboard";
import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";
import { PopoverContent } from "@projects/ui/popover";

interface MenuContextProps {
  respectScreen: boolean;
}

const MenuContext = createContext<MenuContextProps>({
  respectScreen: true,
});

interface MenuProps extends MenuTriggerPrimitiveProps {
  respectScreen?: boolean;
}

const Menu = ({ respectScreen = true, ...props }: MenuProps) => {
  const value = useMemo(() => ({ respectScreen }), [respectScreen]);
  return (
    <MenuContext value={value}>
      <MenuTriggerPrimitive {...props}>{props.children}</MenuTriggerPrimitive>
    </MenuContext>
  );
};

const SubMenu = (props: SubmenuTriggerProps) => {
  const { delay = 0, ...rest } = props;
  return (
    <SubmenuTriggerPrimitive delay={delay} {...rest}>
      {props.children}
    </SubmenuTriggerPrimitive>
  );
};

const menuStyles = tv({
  slots: {
    menu: "max-h-[calc(var(--visual-viewport-height)-10rem)] overflow-auto rounded-xl p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_calc(var(--radius)-2px))] sm:max-h-[inherit]",
    popover: "z-50 min-w-40 p-0 shadow-sm outline-none",
    trigger: [
      "relative inline text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary pressed:outline-none",
    ],
  },
});

const { menu, popover, trigger } = menuStyles();

interface MenuTriggerProps extends ButtonProps {
  className?: string;
}

const MenuTrigger = ({ className, ...props }: MenuTriggerProps) => (
  <Button className={trigger({ className })} {...props} />
);

interface MenuContentProps<T>
  extends Omit<PopoverProps, "children" | "style">,
    MenuPrimitiveProps<T> {
  className?: string;
  popoverClassName?: string;
  showArrow?: boolean;
  respectScreen?: boolean;
}

const MenuContent = <T extends object>(props: MenuContentProps<T>) => {
  const { className, showArrow = false, popoverClassName, ...rest } = props;
  const { respectScreen } = useContext(MenuContext);
  return (
    <PopoverContent
      respectScreen={respectScreen}
      showArrow={showArrow}
      className={popover({
        className: cn([
          showArrow &&
            "placement-left:mt-[-0.38rem] placement-right:mt-[-0.38rem]",
          popoverClassName,
        ]),
      })}
      {...rest}
    >
      <MenuPrimitive className={menu({ className })} {...props} />
    </PopoverContent>
  );
};

interface MenuItemProps
  extends Omit<MenuItemPrimitiveProps, "isDanger">,
    VariantProps<typeof dropdownItemVariants> {
  isDanger?: boolean;
}

const MenuItem = ({
  className,
  isDanger = false,
  children,
  ...props
}: MenuItemProps) => {
  const textValue =
    props.textValue ?? (typeof children === "string" ? children : undefined);
  return (
    <AriaMenuItem
      className={composeRenderProps(className, (className, renderProps) =>
        dropdownItemVariants({
          ...renderProps,
          className,
        }),
      )}
      textValue={textValue}
      data-danger={isDanger ? "true" : undefined}
      {...props}
    >
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          {values.hasSubmenu && <ChevronRight className="ml-auto size-3.5" />}
        </>
      )}
    </AriaMenuItem>
  );
};

export interface MenuHeaderProps extends React.ComponentProps<typeof Header> {
  separator?: boolean;
}

const MenuHeader = ({
  className,
  separator = false,
  ...props
}: MenuHeaderProps) => (
  <Header
    className={cn(
      "p-2 text-base font-semibold sm:text-sm",
      separator && "-mx-1 border-b px-3 pb-2.5",
      className,
    )}
    {...props}
  />
);

const MenuSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator className={cn("-mx-1 my-1 h-px border-b", className)} {...props} />
);

const MenuCheckbox = ({ className, children, ...props }: MenuItemProps) => (
  <AriaMenuItem
    className={composeTailwindRenderProps("relative pr-8", className)}
    {...props}
  >
    {(values) => (
      <>
        {typeof children === "function" ? children(values) : children}
        {values.isSelected && (
          <span className="absolute right-2 flex size-4 shrink-0 items-center justify-center animate-in">
            <Check />
          </span>
        )}
      </>
    )}
  </AriaMenuItem>
);

const MenuRadio = ({ className, children, ...props }: MenuItemProps) => (
  <AriaMenuItem
    className={composeTailwindRenderProps("relative", className)}
    {...props}
  >
    {(values) => (
      <>
        {typeof children === "function" ? children(values) : children}

        {values.isSelected && (
          <span
            data-slot="menu-radio"
            className="absolute right-3 flex items-center justify-center animate-in"
          >
            <Circle />
          </span>
        )}
      </>
    )}
  </AriaMenuItem>
);

const { section, header } = dropdownSectionVariants();

interface SectionProps<T> extends MenuSectionProps<T> {
  title?: string;
}

const MenuSection = <T extends object>({
  className,
  ...props
}: SectionProps<T>) => {
  return (
    <AriaMenuSection className={section({ className })} {...props}>
      {"title" in props && <Header className={header()}>{props.title}</Header>}
      <Collection items={props.items}>{props.children}</Collection>
    </AriaMenuSection>
  );
};

export {
  Menu,
  MenuPrimitive,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuKeyboard,
  MenuCheckbox,
  MenuRadio,
  MenuSeparator,
  MenuTrigger,
  MenuItemDetails,
  MenuSection,
  SubMenu,
};

export type { MenuContentProps };
