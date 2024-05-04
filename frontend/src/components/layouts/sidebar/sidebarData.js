import { Article, Balance, Newspaper } from "@mui/icons-material";
import {
  BackwardItem,
  Chart,
  Diagram,
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
  BarChart,
  List,
} from "react-feather";
import { ChartScatterIcon } from "../../../icons/Icons";

export const sidebarData = [
  {
    title: "News",
    icon: Article,
    link: "",
    isPrivate: false,
  },
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
        link: "dashboard-actions",
        icon: Layers,
      },
      {
        title: "Obligataire",
        icon: DollarSign,
        link: "dashboard-taux",
      },
      {
        title: "Principaux indicateurs",
        icon: Activity,
        link: "dashboard-principaux-indicateurs",
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
    icon: BarChart,
    title: "Statistiques",
    link: "statistiques",
    isPrivate: true,
  },
  {
    icon: Activity,
    title: "Analyse Quantitative",
    link: null,
    isPrivate: false,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      {
        title: "Analyse Sectorielle",
        link: "analyse-sectorielle",
        icon: Layers,
        iconClosed: ChevronDown,
        iconOpened: ChevronUp,
        nestedMenu: [
          {
            title: "Indices sectoriels BVC",
            link: "analyse-sectorielle",
            icon: BarChart2,
          },
          {
            title: "Indices MBI",
            link: "analyse-mbi",
            icon: BarChart2,
          },
        ],
      },
      {
        title: "Titre côté",
        link: null,
        iconClosed: ChevronDown,
        iconOpened: ChevronUp,
        icon: Box,
        nestedMenu: [
          {
            title: "Profil technique",
            link: "analyse-chartiste",
            icon: BarChart2,
          },
          {
            title: "Profil financier",
            link: "profil-financier",
            icon: BarChart2,
          },
        ],
      },
      {
        title: "OPCVM",
        // icon: Briefcase,
        icon: Wallet,
        link: null,
        isPrivate: false,
        iconClosed: ChevronDown,
        iconOpened: ChevronUp,
        nestedMenu: [
          {
            title: "Composition OPCVM",
            link: "composition-opcvm",
            icon: Compass,
          },
          {
            title: "Analyse quantitative",
            link: "analyse-quantitative",
            icon: Globe,
          },
          {
            title: "Tracking des fonds",
            link: "tracking",
            icon: Compass,
          },
        ],
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
        link: null,
        icon: Box,
        iconClosed: ChevronDown,
        iconOpened: ChevronUp,
        icon: Dribbble,
        nestedMenu: [
          {
            title: "Fonds de fonds",
            link: "opcvm",
            icon: Box,
            icon: Dribbble,
          },
          {
            title: "Black Litterman",
            link: "black-litterman-opc",
            icon: Briefcase,
          },
        ],
      },
    ],
  },
  {
    title: "Simulation",
    icon: Folder,
    link: null,
    isPrivate: false,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      // {
      //   title: "Consultation",
      //   link: "consultation",
      //   icon: List,
      // },
      {
        title: "Tradebot",
        link: "backtest",
        icon: BarChart2,
      },
      {
        title: "Backtest",
        link: "portefeuilles",
        icon: Pocket,
      },
      {
        title: "Risk management",
        link: "risk-management",
        icon: Diagram,
      },
    ],
  },
];
