import React, { ReactNode, MouseEvent } from "react";
import "./Button.scss";
import classNames from "classnames";

interface ButtonProps {
  children: ReactNode,
  kind?: string;
  stylesBtn?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  kind,
  stylesBtn,
  type = "button",
  onClick,
  disabled = false,
  id,
}) => {
  const btnClass = classNames("button", {
    primary: kind === "primary",
    secondary: kind === "secondary",
    tertiary: kind === "tertiary",
  });

  return (
    <button
      className={btnClass}
      type={type}
      id={id}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
