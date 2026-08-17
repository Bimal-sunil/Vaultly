import {
  Home03Icon,
  Chart01Icon,
  PlusSignIcon,
  Chatting01Icon,
  Settings03Icon,
  LeftToRightListDashIcon,
} from "@hugeicons/core-free-icons";
import type { CategoryItem, NavLink } from "./types";
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
  { categoryname: "Entertainment", color: "#FF6B6B", icon: Film02Icon },
  { categoryname: "Productivity", color: "#4ECDC4", icon: ZapIcon },
  { categoryname: "Communication", color: "#FFE66D", icon: BubbleChatIcon },
  { categoryname: "Health", color: "#FF9F1C", icon: HealthIcon },
  { categoryname: "Shopping", color: "#8A2BE2", icon: ShoppingBag01Icon },
  { categoryname: "Finance", color: "#2ECC71", icon: MoneyBag02Icon },
  { categoryname: "Education", color: "#3498DB", icon: Book03Icon },
  { categoryname: "Other", color: "#95A5A6", icon: PinIcon },
];

export const navlinks: NavLink[] = [
  {
    icon: Home03Icon,
    to: "/",
  },
  {
    icon: LeftToRightListDashIcon,
    to: "/subscriptions",
  },
  {
    icon: PlusSignIcon,
    to: "/addSubscription",
  },
  {
    icon: Chart01Icon,
    to: "/insights",
  },
  {
    icon: Chatting01Icon,
    to: "/pluto",
  },
];
