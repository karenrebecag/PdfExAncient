import React from "react";

interface IconProps {
  size?: number;
  color?: string;
}

const PurpleFontColorIcon: React.FC<IconProps> = ({ size = 24, color = "#5550FF" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-6 -7.5 24 24"
      width={size}
      height={size}
      fill={color}
      preserveAspectRatio="xMinYMin"
    >
      <path d="M6.327 6.99H2.672l-.477 1.306c-.191.524-.826.812-1.417.642-.59-.17-.915-.734-.723-1.258l2.304-6.312C2.743.32 4.011-.256 5.193.084 5.88.282 6.418.76 6.64 1.368L8.945 7.68c.191.524-.133 1.088-.724 1.258-.59.17-1.225-.118-1.417-.642l-.477-1.307zm-.729-1.998L4.5 1.984 3.4 4.992h2.197zM10 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
  );
};

export default PurpleFontColorIcon;