import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useRef } from "react";
import {
  Select as AriaSelect,
  Button,
  FieldError,
  Label,
  Popover,
  SelectValue,
  Text,
  ListBox,
  ListBoxItem as SelectItem,
  type SelectProps,
} from "react-aria-components";

type Props<T extends object> = SelectProps<T> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  className?: string;
  style?: React.CSSProperties;
};

function Select<T extends object>(props: Props<T>) {
  const {
    label,
    description,
    children,
    errorMessage,
    items,
    className,
    style,
    onOpenChange,
    ...restProps
  } = props;

  const listboxRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
    if (isOpen) {
      requestAnimationFrame(() => {
        const listbox = listboxRef.current;
        if (listbox) {
          const selected = listbox.querySelector(
            '[aria-selected="true"]',
          ) as HTMLElement | null;
          if (selected) {
            selected.scrollIntoView({ block: "center" });
          }
        }
      });
    }
  };

  return (
    <AriaSelect
      className={className}
      style={style}
      onOpenChange={handleOpenChange}
      {...restProps}
    >
      {label && <Label>{label}</Label>}
      <Button className="flex items-center gap-2 px-2 py-1 border border-dark rounded-xl">
        <SelectValue />
        <HugeiconsIcon icon={ArrowDown01Icon} />
      </Button>
      {description && <Text>{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="select-popover w-(--trigger-width)">
        <ListBox ref={listboxRef} className="select-listbox" items={items}>
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export default Select;
export { SelectItem };
