import React from "react";
import "../styles/customTable.scss";

interface CustomTableProps {
  rows: number;
  columns: number;
}

const CustomTable: React.FC<CustomTableProps> = ({ rows, columns }) => {
  return (
    <table className="custom-table">
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex} contentEditable suppressContentEditableWarning>
                {" "}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;