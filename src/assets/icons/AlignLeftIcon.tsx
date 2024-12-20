import React from "react";

interface IconProps {
  size?: number;
  color?: string;
}

const AlignLeftIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor" }) => {
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
      <g id="XMLID_785_">
        <path
          id="XMLID_786_"
          d="M15,60h300c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,30,0,36.716,0,45S6.716,60,15,60z"
        />
        <path
          id="XMLID_787_"
          d="M15,120h220c8.284,0,15-6.716,15-15s-6.716-15-15-15H15c-8.284,0-15,6.716-15,15S6.716,120,15,120z"
        />
        <path
          id="XMLID_788_"
          d="M315,150H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h300c8.284,0,15-6.716,15-15S323.284,150,315,150z"
        />
        <path
          id="XMLID_789_"
          d="M315,270H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h300c8.284,0,15-6.716,15-15S323.284,270,315,270z"
        />
        <path
          id="XMLID_790_"
          d="M15,240h220c8.284,0,15-6.716,15-15s-6.716-15-15-15H15c-8.284,0-15,6.716-15,15S6.716,240,15,240z"
        />
      </g>
    </svg>
  );
};

export default AlignLeftIcon;