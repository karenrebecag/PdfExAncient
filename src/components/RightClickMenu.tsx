import React, { useState, useEffect } from "react";
import "../styles/rightClickMenu.scss";

const RightClickMenu: React.FC = () => {
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [popupType, setPopupType] = useState<string | null>(null);

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setMenuPosition({
      x: event.pageX,
      y: event.pageY,
    });
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".popup") && !target.closest(".right-click-menu")) {
      setMenuPosition(null);
      closeOverlay();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const handleAction = (type: string) => {
    setPopupType(type);
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setPopupType(null);
    setOverlayVisible(false);
  };

  const insertEditableElement = (element: HTMLElement) => {
    const editor = document.querySelector(".strip-content");
    if (editor) {
      const wrapper = document.createElement("div");
      wrapper.contentEditable = "true";
      wrapper.className = "editable-element";
      wrapper.appendChild(element);
      editor.appendChild(wrapper);
      editor.appendChild(document.createElement("br"));
    }
    closeOverlay();
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.alt = "Imagen Cargada";
      img.className = "inserted-image";
      insertEditableElement(img);
    }
  };

  const handleAddSeparator = () => {
    const separator = document.createElement("hr");
    separator.className = "custom-separator";
    insertEditableElement(separator);
  };

  const handleAddTable = (rows: number, columns: number, title: string) => {
    const table = document.createElement("div");
    table.className = "card";

    const tableTitle = document.createElement("div");
    tableTitle.className = "card__title";
    tableTitle.textContent = title || "Tabla Sin Título";

    const tableData = document.createElement("div");
    tableData.className = "card__data";

    for (let i = 0; i < rows; i++) {
      const rowRight = document.createElement("div");
      rowRight.className = "card__right";

      const rowLeft = document.createElement("div");
      rowLeft.className = "card__left";

      for (let j = 0; j < columns; j++) {
        const cellRight = document.createElement("div");
        cellRight.className = "item";
        cellRight.contentEditable = "true";
        cellRight.textContent = "Dato";

        const cellLeft = document.createElement("div");
        cellLeft.className = "item";
        cellLeft.contentEditable = "true";
        cellLeft.textContent = "Dato";

        rowRight.appendChild(cellRight);
        rowLeft.appendChild(cellLeft);
      }

      tableData.appendChild(rowRight);
      tableData.appendChild(rowLeft);
    }

    table.appendChild(tableTitle);
    table.appendChild(tableData);
    insertEditableElement(table);
  };

  const handleAddLink = (url: string) => {
    if (url.trim()) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.className = "link-button";
      link.textContent = "Visitar Enlace";
      insertEditableElement(link);
    }
  };

  return (
    <>
      {menuPosition && (
        <div
          className="right-click-menu"
          style={{
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
          }}
        >
          <button className="value" onClick={() => handleAction("image")}>
            Añadir Imagen
            <span className="menu-description">Selecciona una imagen desde tu dispositivo</span>
          </button>

          <button className="value" onClick={handleAddSeparator}>
            Añadir Separador
            <span className="menu-description">Inserta una línea divisoria</span>
          </button>

          <button className="value" onClick={() => handleAction("table")}>
            Añadir Tabla
            <span className="menu-description">Inserta una tabla personalizable</span>
          </button>

          <button className="value" onClick={() => handleAction("link")}>
            Añadir Enlace
            <span className="menu-description">Inserta un hipervínculo</span>
          </button>

          <button
            className="value"
            onClick={() => document.execCommand("insertText", false, "😊")}
          >
            Añadir Emoji
            <span className="menu-description">Selecciona un emoji del sistema</span>
          </button>
        </div>
      )}

      {overlayVisible && popupType && (
        <div className="overlay">
          <div className="popup">
            <button className="close-btn" onClick={closeOverlay}>×</button>

            {popupType === "image" && (
              <div className="popup-content">
                <h3>Selecciona una Imagen</h3>
                <input type="file" accept="image/*" onChange={handleAddImage} />
              </div>
            )}

            {popupType === "table" && (
              <div className="popup-content">
                <h3>Inserta una Tabla</h3>
                <label>
                  Nombre de la Tabla: <input className="whiteInput" type="text" id="table-title" />
                </label>
                <label>
                  Filas: <input className="whiteInput" type="number" min="1" id="rows" />
                </label>
                <label>
                  Columnas: <input className="whiteInput" type="number" min="1" id="columns" />
                </label>
                <button
                  className="buttonDownload"
                  onClick={() => {
                    const rows = parseInt(
                      (document.getElementById("rows") as HTMLInputElement).value,
                      10
                    );
                    const columns = parseInt(
                      (document.getElementById("columns") as HTMLInputElement).value,
                      10
                    );
                    const title = (document.getElementById("table-title") as HTMLInputElement).value;
                    handleAddTable(rows, columns, title);
                  }}
                >
                  Añadir
                </button>
              </div>
            )}

            {popupType === "link" && (
              <div className="popup-content">
                <h3>Inserta un Enlace</h3>
                <label>
                  URL: <input className="whiteInput" type="url" id="link-url" />
                </label>
                <button
                  className="buttonDownload"
                  onClick={() => {
                    const url = (document.getElementById("link-url") as HTMLInputElement).value;
                    handleAddLink(url);
                  }}
                >
                  Añadir
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RightClickMenu;
