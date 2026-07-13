import type { CategoryItem } from "./types";
import {
  Film02Icon,
  ZapIcon,
  BubbleChatIcon,
  HealthIcon,
  ShoppingBag01Icon,
  MoneyBag02Icon,
  Book03Icon,
  PinIcon,
} from "@hugeicons/core-free-icons";

export const categories: CategoryItem[] = [
  { categoryname: "All" },
  { categoryname: "Entertainment", color: "#E4CBA8", icon: Film02Icon },
  { categoryname: "Productivity", color: "#BFCAD6", icon: ZapIcon },
  { categoryname: "Communication", color: "#C8D0B8", icon: BubbleChatIcon },
  { categoryname: "Health", color: "#C5D7CA", icon: HealthIcon },
  { categoryname: "Shopping", color: "#D4BDB7", icon: ShoppingBag01Icon },
  { categoryname: "Finance", color: "#D0C4A8", icon: MoneyBag02Icon },
  { categoryname: "Education", color: "#C6D0DB", icon: Book03Icon },
  { categoryname: "Other", color: "#D2D2D2", icon: PinIcon },
];
