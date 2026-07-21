import React from "react";
import {
  MenuTrigger,
  Menu,
  MenuSection,
  Button,
  Popover,
} from "react-aria-components";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

function MenuButton(props: Props) {
  const { children, trigger } = props;
  return (
    <MenuTrigger>
      <Button>{trigger}</Button>
      <Popover placement="bottom end">
        <Menu>
          <MenuSection className="p-4 bg-accent-bg rounded-[10px] menu-content">
            {children}
          </MenuSection>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

export default MenuButton;
