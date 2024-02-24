import { Balance } from "@mui/icons-material";
import {
  BackwardItem,
  Chart,
  Document,
  User,
  Wallet,
  Wallet1,
  WalletMinus,
  WalletMoney,
} from "iconsax-react";
import {
  Activity,
  Dribbble,
  Layers,
  Box,
  BarChart2,
  Folder,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Compass,
  Globe,
  Pocket,
  DollarSign,
} from "react-feather";
import { ChartScatterIcon } from "../../../icons/Icons";

export const sidebarData = [
  {
    icon: BackwardItem,
    title: "Tableau de bord",
    isPrivate: false,
    link: null,
    isPrivate: false,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      {
        title: "Actions",
        link: "",
        icon: Layers,
      },
      {
        title: "Obligataire",
        icon: DollarSign,
        link: "fixed-income",
      },
    ],
  },
  {
    icon: User,
    title: "Utilisateurs",
    link: "users",
    isPrivate: true,
  },
  {
    icon: Activity,
    title: "Analyse",
    link: null,
    isPrivate: false,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      {
        title: "Sectorielle",
        link: "analyse-sectorial",
        icon: Layers,
      },
      {
        title: "Chartiste",
        link: "analyse-chartiste",
        icon: BarChart2,
      },
    ],
  },
  {
    title: "Création de portefeuille",
    icon: Layers,
    isPrivate: false,
    link: null,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      {
        title: "Actions BVC",
        link: "markowitz",
        iconClosed: ChevronDown,
        iconOpened: ChevronUp,
        icon: Dribbble,
        nestedMenu: [
          {
            title: "Markowitz",
            link: "markowitz",
            icon: Dribbble,
          },
          {
            title: "Black Litterman",
            link: "black-litterman",
            icon: Briefcase,
          },
        ],
      },
      // {
      //   title: "Black Litterman",
      //   link: "black-litterman",
      //   icon: Briefcase,
      // },
      {
        title: "Fonds de fonds",
        link: "opcvm",
        icon: Box,
      },
    ],
  },

  // {
  //   icon: Dribbble,
  //   title: "Markowitz",
  //   link: "markowitz",
  //   isPrivate: false,
  // },
  // {
  //   icon: Activity,
  //   title: "Analyses",
  //   link: "analyses",
  //   isPrivate: false,
  // },
  // {
  //   icon: Box,
  //   title: "OPCVM",
  //   link: "opcvm",
  //   isPrivate: false,
  // },
  // {
  //   icon: BarChart2,
  //   title: "Backtest",
  //   link: "backtest",
  //   isPrivate: false,
  // },
  // {
  //   icon: Folder,
  //   title: "Consultation",
  //   link: "portefeuilles",
  //   isPrivate: false,
  // },
  {
    title: "Simulation",
    icon: Folder,
    link: null,
    isPrivate: false,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      {
        title: "Tridbot",
        link: "backtest",
        icon: BarChart2,
      },
      {
        title: "Backtest",
        link: "portefeuilles",
        icon: Pocket,
      },
    ],
  },
  {
    title: "Analyse OPCVM",
    // icon: Briefcase,
    icon: Wallet,
    link: null,
    isPrivate: false,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      {
        title: "Analyse OPCVM",
        link: "analyse-opcvm",
        icon: Globe,
      },
      {
        title: "Tracking des fonds",
        link: "tracking",
        icon: Compass,
      },
    ],
  },
];
