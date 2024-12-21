import type { Key } from "react-aria-components";
import type { ListData } from "react-stately";
import { useCallback, useState } from "react";
import { cn } from "#ui/lib/utils";
import { Group, TextField } from "react-aria-components";
import { twJoin } from "tailwind-merge";
import { tv } from "tailwind-variants";

import type { FieldProps } from "./form";
import type { RestrictedIntent, TagGroupProps } from "./tag-group";
import { Description, Input, Label } from "./form";
import { TagGroup, TagItem, TagList } from "./tag-group";

const tagFieldsStyles = tv({
  base: ["relative flex min-h-10 flex-row flex-wrap items-center bg-bg"],
  variants: {
    appearance: {
      outline: [
        "rounded-lg border px-1 shadow-sm",
        "has-[input[data-focused=true]]:border-primary",
        "has-[input[data-invalid=true][data-focused=true]]:border-danger has-[input[data-invalid=true]]:border-danger has-[input[data-invalid=true]]:ring-danger/20",
        "has-[input[data-focused=true]]:ring-4 has-[input[data-focused=true]]:ring-primary/20",
      ],
      plain: ["has-[input[data-focused=true]]:border-transparent"],
    },
  },
});

interface TagItemProps {
  id: number;
  name: string;
}

interface TagFieldProps extends Pick<TagGroupProps, "shape">, FieldProps {
  intent?: RestrictedIntent;
  isDisabled?: boolean;
  max?: number;
  className?: string;
  children?: React.ReactNode;
  name?: string;
  list: ListData<TagItemProps>;
  onItemInserted?: (tag: TagItemProps) => void;
  onItemCleared?: (tag: TagItemProps | undefined) => void;
  appearance?: "outline" | "plain";
}

const TagField = ({
  appearance = "outline",
  name,
  className,
  list,
  onItemCleared,
  onItemInserted,
  ...props
}: TagFieldProps) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const existingTagCount = list.items.length;
  const maxTags = props.max ?? Infinity;
  const maxTagsToAdd = maxTags - existingTagCount;

  const insertTag = () => {
    const tagNames = inputValue.split(/,/);
    if (maxTagsToAdd <= 0) {
      setIsInvalid(true);
      setInputValue("");
      const timeoutId = setTimeout(() => {
        setIsInvalid(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }

    tagNames.slice(0, maxTagsToAdd).forEach((tagName) => {
      const formattedName = tagName
        .trim()
        .replace(/\s+/g, " ")
        .replace(/[\t\r\n]/g, "");

      if (
        formattedName &&
        !list.items.some(
          ({ name }) => name.toLowerCase() === formattedName.toLowerCase(),
        )
      ) {
        const tag = {
          id: (list.items.at(-1)?.id ?? 0) + 1,
          name: formattedName,
        };

        list.append(tag);
        onItemInserted?.(tag);
      }
    });

    setInputValue("");
    return;
  };

  const clearInvalidFeedback = () => {
    if (maxTags - list.items.length <= maxTagsToAdd) {
      setIsInvalid(false);
    }
  };

  const onRemove = (keys: Set<Key>) => {
    list.remove(...keys);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onItemCleared?.(list.getItem([...keys][0]!));
    clearInvalidFeedback();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      insertTag();
    }

    if (e.key === "Backspace" && inputValue === "") {
      popLast();
      clearInvalidFeedback();
    }
  };

  const popLast = useCallback(() => {
    if (list.items.length == 0) {
      return;
    }

    const endKey = list.items[list.items.length - 1];

    if (endKey !== undefined) {
      list.remove(endKey.id);
      onItemCleared?.(list.getItem(endKey.id));
    }
  }, [list, onItemCleared]);

  return (
    <div className={cn("flex w-full flex-col gap-y-1.5", className)}>
      {props.label && <Label>{props.label}</Label>}
      <Group
        className={twJoin("flex flex-col", props.isDisabled && "opacity-50")}
      >
        <TagGroup
          intent={props.intent}
          shape={props.shape}
          aria-label="List item inserted"
          onRemove={onRemove}
        >
          <div className={tagFieldsStyles({ appearance })}>
            <div className="flex flex-1 flex-wrap items-center">
              <TagList
                items={list.items}
                className={twJoin(
                  list.items.length !== 0
                    ? appearance === "outline" && "gap-1.5 px-0.5 py-1.5"
                    : "gap-0",
                  props.shape === "square" &&
                    "[&_.jdt3lr2x]:rounded-[calc(var(--radius)-4px)]",
                  "outline-none [&_.jdt3lr2x]:cursor-default last:[&_.jdt3lr2x]:-mr-1",
                )}
              >
                {(item) => <TagItem>{item.name}</TagItem>}
              </TagList>
              <TextField
                isDisabled={props.isDisabled}
                aria-label={
                  props.label ?? props["aria-label"] ?? props.placeholder
                }
                isInvalid={isInvalid}
                onKeyDown={onKeyDown}
                onChange={setInputValue}
                value={inputValue}
                {...props}
              >
                <Input
                  className="inline w-auto"
                  placeholder={
                    maxTagsToAdd <= 0
                      ? "Remove one to add more"
                      : props.placeholder
                  }
                />
              </TextField>
            </div>
          </div>
        </TagGroup>
        {name && (
          <input
            hidden
            name={name}
            value={list.items.map((i) => i.name).join(",")}
            readOnly
          />
        )}
      </Group>
      {props.description && <Description>{props.description}</Description>}
    </div>
  );
};

export { TagField, type TagItemProps };
