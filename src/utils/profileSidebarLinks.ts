import { CiUser } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { RiUserSettingsLine } from "react-icons/ri";

export const userProfileLinks = [
  {
    href: "/profile",
    label: "Profile",
    Icon: CiUser,
  },
  {
    href: "/profile/settings",
    label: "Account setting",
    Icon: RiUserSettingsLine,
  },
  {
    href: "/profile/my-projects",
    label: "My Projects",
    Icon: FiShoppingBag,
  },
];
