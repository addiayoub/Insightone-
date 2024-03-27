import { Button } from "@mui/material";
import React from "react";
import { CheckSquare, Search, Trash } from "react-feather";

export const DeleteButton = ({
  size = "small",
  variant = "contained",
  className,
  ...rest
}) => {
  return (
    <Button
      size={size}
      color="error"
      className={`flex gap-1 items-center ${className}`}
      variant={variant}
      {...rest}
    >
      Supprimer <Trash size={18} />
    </Button>
  );
};

export const SearchButton = ({
  size = "small",
  variant = "contained",
  className,
  ...rest
}) => {
  return (
    <Button
      size={size}
      className={`flex gap-2 items-center ${className}`}
      variant={variant}
      {...rest}
    >
      Rechercher <Search size={18} />
    </Button>
  );
};
export const ValidateButton = ({
  size = "medium",
  variant = "contained",
  className,
  ...rest
}) => {
  return (
    <Button
      size={size}
      className={`flex gap-2 items-center ${className}`}
      variant={variant}
      {...rest}
    >
      Valider <CheckSquare size={18} />
    </Button>
  );
};

const CustomButton = ({
  size = "small",
  variant = "contained",
  color = "primary",
  className,
  text,
  icon,
  isBefore,
  ...rest
}) => {
  return (
    <Button
      {...{ size, color, variant }}
      {...rest}
      className={`flex gap-1 items-center ${className}`}
    >
      {isBefore && icon}
      {text}
      {!isBefore && icon}
    </Button>
  );
};
export default CustomButton;
