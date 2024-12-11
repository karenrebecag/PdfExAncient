import React from "react";
import TextStyleDropdown from "./TextStyleDropdown.tsx";
import IncreaseTextSizeButton from "./IncreaseTextSizeButton";
import DecreaseTextSizeButton from "./DecreaseTextSizeButton";
import "../styles/toolbar.scss";

// Íconos
import BoldIcon from "../assets/icons/BoldIcon";
import ItalicIcon from "../assets/icons/ItalicIcon";
import UnderlineIcon from "../assets/icons/UndelineIcon.tsx";
import BlackFontColorIcon from "../assets/icons/BlackFontColor.tsx";
import WhiteFontColorIcon from "../assets/icons/WhiteFontColor.tsx";
import PurpleFontColorIcon from "../assets/icons/PurpleFontColor.tsx";
import AlignLeftIcon from "../assets/icons/AlignLeftIcon.tsx";
import AlignCenterIcon from "../assets/icons/AlignCenterIcon";
import AlignRightIcon from "../assets/icons/AlignRightIcon.tsx";

interface ToolbarProps {
  onIncreaseTextSize: () => void;
  onDecreaseTextSize: () => void;
  onSelectClass: (className: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onIncreaseTextSize,
  onDecreaseTextSize,
  onSelectClass,
}) => {
  const applyCommand = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value || "");
  };

  return (
    <div className="toolbar">
      {/* Botones de Formato */}
      <button className="buttonSmall" onClick={() => applyCommand("bold")}>
        <BoldIcon />
      </button>
      <button className="buttonSmall" onClick={() => applyCommand("italic")}>
        <ItalicIcon />
      </button>
      <button className="buttonSmall" onClick={() => applyCommand("underline")}>
        <UnderlineIcon />
      </button>

      {/* Selector de Estilos */}
      <TextStyleDropdown onSelectClass={onSelectClass} />

      {/* Botones de Ajuste de Tamaño */}
      <IncreaseTextSizeButton onClick={onIncreaseTextSize} />
      <DecreaseTextSizeButton onClick={onDecreaseTextSize} />

      {/* Botones de Colores */}
      <button
        className="buttonSmallColors"
        onClick={() => applyCommand("foreColor", "black")}
      >
        <BlackFontColorIcon />
      </button>

      <button
        className="buttonSmallColors"
        onClick={() => applyCommand("foreColor", "#5450FF")}
      >
        <PurpleFontColorIcon />
      </button>

      {/* Botones de Alineación */}
      <button
        className="buttonSmall"
        onClick={() => applyCommand("justifyLeft")}
      >
        <AlignLeftIcon />
      </button>
      <button
        className="buttonSmall"
        onClick={() => applyCommand("justifyCenter")}
      >
        <AlignCenterIcon />
      </button>
      <button
        className="buttonSmall"
        onClick={() => applyCommand("justifyRight")}
      >
        <AlignRightIcon />
      </button>
    </div>
  );
};

export default Toolbar;