import React from "react";
import "./Card.css";

const Card = ({
  children,
  className = "",
  onClick,
  hoverable = false,
  padding = "medium",
  ...props
}) => {
  const classes = `
    card 
    card-${padding}
    ${hoverable ? "card-hoverable" : ""}
    ${onClick ? "card-clickable" : ""}
    ${className}
  `.trim();

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
