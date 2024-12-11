import React from "react";

interface IconProps {
  size?: number;
  color?: string;
}

const UnderlineIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 300 300"
      xmlSpace="preserve"
      width={size}
      height={size}
      fill={color}
    >
      <g id="XMLID_12_">
        <path
          id="XMLID_13_"
          d="M230,0c-8.284,0-15,6.716-15,15v130c0,35.841-29.16,65-65.002,65c-17.362,0-33.684-6.762-45.961-19.038
            C91.759,178.685,84.999,162.361,85,144.999V15c0-8.284-6.716-15-15-15S55,6.716,55,15v129.998
            c-0.001,25.375,9.879,49.232,27.823,67.177c17.943,17.943,41.8,27.825,67.175,27.825C202.382,240,245,197.383,245,145V15
            C245,6.716,238.284,0,230,0z"
        />
        <path
          id="XMLID_14_"
          d="M230,270H70c-8.284,0-15,6.716-15,15s6.716,15,15,15h160c8.284,0,15-6.716,15-15S238.284,270,230,270z"
        />
      </g>
    </svg>
  );
};

export default UnderlineIcon;