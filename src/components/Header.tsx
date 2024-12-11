import React from "react";
import "../styles/header.scss";
import DownloadButton from "./DownloadButton";

interface HeaderProps {
  onDownloadPDF: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDownloadPDF }) => {
  return (
    <header className="header">
      <img src="./logoPurple.png" alt="Logo" className="logo" />
      <DownloadButton onClick={onDownloadPDF} />
    </header>
  );
};

export default Header;