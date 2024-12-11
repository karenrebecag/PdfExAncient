import React from "react";

interface IncreaseTextSizeButtonProps {
  onClick: () => void;
}

const IncreaseTextSizeButton: React.FC<IncreaseTextSizeButtonProps> = ({
  onClick,
}) => {
  return (
    <button className="buttonSmall" onClick={onClick} title="Aumentar Tamaño">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        width="24"
        height="24"
      >
        <path
          d="M12 5v14M5 12h14"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default IncreaseTextSizeButton;