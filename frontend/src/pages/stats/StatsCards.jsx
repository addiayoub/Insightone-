import { Clock, Shield, UserMinus, UserPlus } from "react-feather";
import { Wallet } from "iconsax-react";
export const getStatsCards = (data) => {
  return [
    {
      title: "Utilisateurs",
      icon: <UserPlus className="text-primary" size={22} />,
      value: data.totalUsers,
    },
    {
      title: "Utilisateurs actifs",
      icon: <UserPlus className="text-success" size={22} />,
      value: data.activeUsers,
    },
    {
      title: "Utilisateurs inactifs",
      icon: <UserMinus className="text-error" size={22} />,
      value: data.notActiveUsers,
    },
    {
      title: "Admins",
      icon: <Shield className="text-primary" size={22} />,
      value: data.adminUsers,
    },
    {
      title: "Portefeuilles",
      icon: <Wallet className="text-primary" size={22} />,
      value: data.totalPtfs,
    },
    {
      title: "Portefeuilles Actions",
      icon: <Wallet className="text-primary" size={22} />,
      value: data?.ptfsByType?.Actions,
    },
    {
      title: "Portefeuilles OPCVM",
      icon: <Wallet className="text-primary" size={22} />,
      value: data?.ptfsByType?.OPCVM,
    },
    {
      title: "Total Execution time",
      icon: <Clock className="text-primary" size={22} />,
      value: `${data?.executionTimeStats?.total}s`,
    },
    {
      title: "Min Execution time",
      icon: <Clock className="text-success" size={22} />,
      value: `${data?.executionTimeStats?.min}s`,
    },

    {
      title: "Average Execution time",
      icon: <Clock className="text-primary" size={22} />,
      value: `${data?.executionTimeStats?.average}s`,
    },
    {
      title: "Max Execution time",
      icon: <Clock className="text-error" size={22} />,
      value: `${data?.executionTimeStats?.max}s`,
    },
  ];
};
