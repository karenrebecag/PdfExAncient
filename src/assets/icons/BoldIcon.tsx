import React from "react";

interface IconProps {
  size?: number;
  color?: string;
}

const BoldIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 330 330"
      xmlSpace="preserve"
      width={size}
      height={size}
      fill={color}
    >
      <path
        id="XMLID_17_"
        d="M310.874,97.5c0-53.762-43.738-97.5-97.5-97.5h-121.5H49.126c-16.568,0-30,13.432-30,30s13.432,30,30,30
        h12.748v210H49.126c-16.568,0-30,13.432-30,30s13.432,30,30,30h42.748h121.5c53.762,0,97.5-43.738,97.5-97.5
        c0-26.174-10.369-49.969-27.212-67.5C300.505,147.469,310.874,123.674,310.874,97.5z M213.374,135h-91.5V60h91.5
        c20.678,0,37.5,16.822,37.5,37.5S234.052,135,213.374,135z M213.374,270h-91.5v-75h91.5c20.678,0,37.5,16.822,37.5,37.5
        S234.052,270,213.374,270z"
      />
    </svg>
  );
};

export default BoldIcon;