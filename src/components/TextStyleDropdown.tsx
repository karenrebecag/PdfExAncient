import React, { useState } from "react";
import "../styles/dropdown.scss";

interface TextStyleDropdownProps {
  onSelectClass: (className: string) => void;
}

const TextStyleDropdown: React.FC<TextStyleDropdownProps> = ({
  onSelectClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Selecciona Estilo");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (label: string, className: string) => {
    setSelectedLabel(label);
    onSelectClass(className); 
    setIsOpen(false);
  };

  const textStyles = [
    { label: "Título Principal", className: "style-title-main" },
    { label: "Título Secundario", className: "style-title-secondary" },
    { label: "Cuerpo Principal", className: "style-body-main" },
    { label: "Texto Resaltado", className: "style-highlight" },
    { label: "Nota", className: "style-note" },
    { label: "Código", className: "style-code" },
  ];

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <button
        type="button"
        className="trigger"
        aria-haspopup="listbox"
        onClick={toggleDropdown}
      >
        {selectedLabel}
      </button>

      <ul
        className={`list ${isOpen ? "visible" : "hidden"}`}
        role="listbox"
        aria-expanded={isOpen}
      >
        {textStyles.map(({ label, className }) => (
          <li
            key={className}
            className={`listitem ${className}`}
            role="option"
            onClick={() => handleSelect(label, className)}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextStyleDropdown;