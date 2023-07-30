import React from "react";
import { useNavigate } from "../react-router/Hooks";

export function Link({ to, children, onClick }) {
    const navigate = useNavigate();

    const handleClick = onClick
        ? onClick
        : (event) => {
              event.preventDefault();
              navigate(to);
          };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    );
}
