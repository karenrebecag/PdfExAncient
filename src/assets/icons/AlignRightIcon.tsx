import React from "react";

interface IconProps {
  size?: number;
  color?: string;
}

const AlignRightIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor" }) => {
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
      <g id="XMLID_534_">
        <path
          id="XMLID_535_"
          d="M315,270H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h300c8.284,0,15-6.716,15-15S323.284,270,315,270z"
        />
        <path
          id="XMLID_536_"
          d="M315,210H95c-8.284,0-15,6.716-15,15s6.716,15,15,15h220c8.284,0,15-6.716,15-15S323.284,210,315,210z"
        />
        <path
          id="XMLID_782_"
          d="M315,150H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h300c8.284,0,15-6.716,15-15S323.284,150,315,150z"
        />
        <path
          id="XMLID_783_"
          d="M15,60h300c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,30,0,36.716,0,45S6.716,60,15,60z"
        />
        <path
          id="XMLID_784_"
          d="M315,90H95c-8.284,0-15,6.716-15,15s6.716,15,15,15h220c8.284,0,15-6.716,15-15S323.284,90,315,90z"
        />
      </g>
    </svg>
  );
};

export default AlignRightIcon;