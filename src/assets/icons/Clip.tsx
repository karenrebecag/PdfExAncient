// src/components/Clip.tsx
import React from 'react';

interface SvgProps {
  width?: string;
  height?: string;
  className?: string;
}

const Clip: React.FC<SvgProps> = ({ width = '24', height = '24', className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
  >
    <style type="text/css">
      {`.st0 { fill: #000000; }`}
    </style>
    <g>
      <path
        className="st0"
        d="M157.644,298.25l150.407-150.415l-27-26.992l-150.4,150.399c-9.162,9.155-16.08,19.809-20.684,31.163
          c-6.903,17.024-8.615,35.585-5.175,53.378c3.44,17.785,12.116,34.877,25.859,48.614c9.148,9.163,19.809,16.088,31.156,20.684
          c17.031,6.895,35.585,8.615,53.377,5.167c17.793-3.432,34.878-12.108,48.614-25.852l184.454-184.454
          c12.55-12.542,22.016-27.107,28.302-42.632c9.445-23.287,11.796-48.72,7.077-73.065c-4.695-24.345-16.552-47.692-35.371-66.513
          c-12.542-12.549-27.115-22.001-42.632-28.302c-23.295-9.436-48.705-11.78-73.057-7.077c-24.352,4.703-47.7,16.56-66.513,35.387
          L74.518,229.271c-16.134,16.134-28.294,34.855-36.376,54.801c-12.139,29.93-15.16,62.608-9.11,93.932
          c6.058,31.292,21.27,61.284,45.486,85.484c16.126,16.133,34.847,28.295,54.8,36.384c29.923,12.131,62.609,15.16,93.917,9.094
          c31.3-6.05,61.292-21.262,85.5-45.478L466.22,305.996l-26.994-26.993L281.734,436.495c-12.48,12.481-26.818,21.781-42.152,27.99
          c-22.975,9.33-48.203,11.674-72.311,7.002c-24.117-4.688-47.039-16.286-65.752-34.992c-12.489-12.48-21.781-26.818-28.006-42.16
          c-9.323-22.968-11.659-48.203-6.993-72.312c4.68-24.109,16.285-47.038,34.999-65.752L293.051,64.74
          c8.888-8.889,19.078-15.502,29.984-19.924c16.339-6.629,34.299-8.295,51.452-4.977c17.16,3.334,33.439,11.575,46.772,24.885
          c8.889,8.896,15.486,19.086,19.908,29.984c6.636,16.338,8.303,34.306,4.985,51.46c-3.334,17.153-11.576,33.439-24.893,46.772
          L236.797,377.395c-5.502,5.494-11.78,9.566-18.5,12.298c-10.083,4.094-21.186,5.129-31.78,3.074
          c-10.601-2.07-20.616-7.138-28.873-15.372c-5.502-5.502-9.566-11.781-12.29-18.508c-4.094-10.076-5.137-21.187-3.075-31.78
          C144.349,316.506,149.402,306.491,157.644,298.25z"
      />
    </g>
  </svg>
);

export default Clip;