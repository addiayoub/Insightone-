import { BackwardItem, Chart, Document, User } from "iconsax-react";
import { Activity, Dribbble, Layers, Box } from "react-feather";

export const sidebarData = [
  {
    icon: BackwardItem,
    title: "Tableau de bord",
    link: "",
    isPrivate: false,
  },
  {
    icon: Layers,
    title: "Sectorial",
    link: "sectorial",
    isPrivate: false,
  },
  {
    icon: User,
    title: "Utilisateurs",
    link: "users",
    isPrivate: true,
  },
  {
    icon: Dribbble,
    title: "Markowitz",
    link: "markowitz",
    isPrivate: false,
  },
  {
    icon: Activity,
    title: "Analyses",
    link: "analyses",
    isPrivate: false,
  },
  {
    icon: Box,
    title: "OPCVM",
    link: "opcvm",
    isPrivate: false,
  },
];
