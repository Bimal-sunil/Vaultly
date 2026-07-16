import React from "react";
import { DropdownMenu } from "radix-ui";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

function MenuButton(props: Props) {
  const { children, trigger } = props;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="p-4 bg-accent-bg rounded-[10px] menu-content"
          align="end"
          sideOffset={8}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default MenuButton;
