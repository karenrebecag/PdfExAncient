import React from "react";
import "../styles/linkButton.scss";

interface LinkButtonProps {
  url: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ url }) => {
  return (
    <button
      className="link-button"
      onClick={() => window.open(url, "_blank")}
    >
      Visitar Enlace
    </button>
  );
};

export default LinkButton;