import React from "react";

interface IconProps {
  size?: number;
  color?: string;
}

const ItalicIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 330.003 330.003"
      xmlSpace="preserve"
      width={size}
      height={size}
      fill={color}
    >
      <path
        id="XMLID_16_"
        d="M255.001,0h-60.042c-0.026,0-0.052,0-0.079,0h-59.879c-8.284,0-15,6.716-15,15s6.716,15,15,15h41.703
          l-54,270H75.001c-8.284,0-15,6.716-15,15s6.716,15,15,15h59.956c0.02,0,0.04,0.003,0.059,0.003c0.023,0,0.045-0.003,0.066-0.003
          h59.918c8.284,0,15-6.716,15-15s-6.716-15-15-15h-41.703l54-270h47.703c8.284,0,15-6.716,15-15S263.286,0,255.001,0z"
      />
    </svg>
  );
};

export default ItalicIcon;