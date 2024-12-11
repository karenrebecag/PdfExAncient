// src/components/Separator.tsx
import React from 'react';

interface SvgProps {
  width?: string;
  height?: string;
  className?: string;
}

const Separator: React.FC<SvgProps> = ({ width = '24', height = '24', className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M1 11h9v2H1zm13 2h9v-2h-9z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);

export default Separator;
