import React, { useRef, useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import Header from "./Header";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "../styles/editor.scss";
import AddPageButton from "./AddPageButton";
import RightClickMenu from "./RightClickMenu";

const A4_PAGE_HEIGHT = 1122;
const A4_PAGE_WIDTH = 794;

const Editor: React.FC = () => {
  const [pagesCount, setPagesCount] = useState(1);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeElementRef = useRef<HTMLDivElement | null>(null);

  const addNewPage = () => {
    setPagesCount((prev) => prev + 1);
  };

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF("p", "pt", "a4");

    for (let index = 0; index < pagesCount; index++) {
      const pageElement = pagesRef.current[index];
      if (pageElement) {
        const canvas = await html2canvas(pageElement, {
          scale: 2,
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        if (index !== 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      }
    }

    pdf.save("document.pdf");
  };

  const applyTextClass = (className: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      const span = document.createElement("span");
      span.className = className;

      if (!range.collapsed) {
        range.surroundContents(span);
        selection.removeAllRanges();
      }
    }
    reflowContent();
  };

  const adjustTextSize = (change: number) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedNode = range.startContainer.parentElement;

      if (selectedNode && selectedNode.nodeType === 1) {
        const currentSize = parseFloat(
          window.getComputedStyle(selectedNode).getPropertyValue("font-size")
        );
        const newSize = Math.max(currentSize + change, 8);
        (selectedNode as HTMLElement).style.fontSize = `${newSize}px`;
      }
    }
    reflowContent();
  };

  // Función para redistribuir contenido (reflow)
  const reflowContent = () => {
    for (let i = 0; i < pagesCount; i++) {
      const page = pagesRef.current[i];
      if (!page) continue;
      const stripContent = page.querySelector(".strip-content") as HTMLDivElement;
      
      while (stripContent.scrollHeight > stripContent.clientHeight) {
        let nextPageIndex = i + 1;
        if (nextPageIndex >= pagesCount) {
          addNewPage();
          nextPageIndex = i + 1;
        }

        const nextPage = pagesRef.current[nextPageIndex];
        const nextStrip = nextPage?.querySelector(".strip-content") as HTMLDivElement;
        if (!nextStrip) break;

        const lastChild = stripContent.lastChild;
        if (!lastChild) break;

        nextStrip.insertBefore(lastChild, nextStrip.firstChild);
      }
    }
  };

  const handleInput = () => {
    reflowContent();
  };

  // Insertar un elemento en el editor (al final del contenido actual del foco)
  // o en el cursor si lo deseas extender.
  const insertEditableElement = (element: HTMLElement) => {
    // Insertaremos el elemento donde se encuentre el foco:
    const editor = document.activeElement as HTMLDivElement;
    // Verificamos que el focus esté en una .strip-content
    const stripContent = editor?.closest(".strip-content") as HTMLDivElement;
    const selection = window.getSelection();
    if (stripContent && selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const wrapper = document.createElement("div");
      wrapper.className = "editable-element";
      wrapper.contentEditable = "true";
      wrapper.appendChild(element);
      wrapper.appendChild(document.createElement("br"));

      range.insertNode(wrapper);
      // Colocar el cursor después del elemento insertado
      range.setStartAfter(wrapper);
      range.setEndAfter(wrapper);
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (stripContent) {
      // Si no hay selección válida, insertamos al final
      const wrapper = document.createElement("div");
      wrapper.className = "editable-element";
      wrapper.contentEditable = "true";
      wrapper.appendChild(element);
      wrapper.appendChild(document.createElement("br"));
      stripContent.appendChild(wrapper);
    }
    reflowContent();
  };

  // Funciones específicas de inserción (integradas desde RightClickMenu)
  const onInsertImage = (file: File) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.alt = "Imagen Cargada";
    img.className = "inserted-image";
    insertEditableElement(img);
  };

  const onInsertSeparator = () => {
    const separator = document.createElement("hr");
    separator.className = "custom-separator";
    insertEditableElement(separator);
  };

  const onInsertTable = (rows: number, columns: number, title: string) => {
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

  const onInsertLink = (url: string) => {
    if (url.trim()) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.className = "link-button";
      link.textContent = "Visitar Enlace";
      insertEditableElement(link);
    }
  };

  const onInsertEmoji = (emoji: string) => {
    const span = document.createElement("span");
    span.textContent = emoji;
    insertEditableElement(span);
  };

  // Cuando se añade una nueva página, darle el foco automáticamente
  useEffect(() => {
    const lastPageIndex = pagesCount - 1;
    const lastPage = pagesRef.current[lastPageIndex];
    if (lastPage) {
      const stripContent = lastPage.querySelector(".strip-content") as HTMLDivElement;
      stripContent?.focus();
    }
  }, [pagesCount]);

  return (
    <div className="editor-container">
      <Header onDownloadPDF={handleDownloadPDF} />
      <Toolbar
        onIncreaseTextSize={() => adjustTextSize(2)}
        onDecreaseTextSize={() => adjustTextSize(-2)}
        onSelectClass={applyTextClass}
      />

      {/* Integración del menú contextual */}
      <RightClickMenu
        onInsertImage={onInsertImage}
        onInsertSeparator={onInsertSeparator}
        onInsertTable={onInsertTable}
        onInsertLink={onInsertLink}
        onInsertEmoji={onInsertEmoji}
      />

      <div className="pages-container">
        {Array.from({ length: pagesCount }).map((_, index) => (
          <div
            id={`page-${index}`}
            key={index}
            ref={(el) => (pagesRef.current[index] = el)}
            className="page-container"
            style={{
              width: `${A4_PAGE_WIDTH}px`,
              height: `${A4_PAGE_HEIGHT}px`,
            }}
          >
            <img
              src="src/assets/logoPurple.png"
              alt="Logo"
              className="page-logo"
              style={{ width: "250px" }}
            />

            <div
              className="strip-content"
              contentEditable
              suppressContentEditableWarning
              onInput={handleInput}
              onFocus={(e) =>
                (activeElementRef.current = e.target as HTMLDivElement)
              }
              style={{ outline: "none" }}
            ></div>

            <div className="footer">
              <div className="contact-info">
                <p>
                  <span>GDL, México</span>
                  <br />
                  <span className="purpleTitle">+52 (33) 85 26 21 20</span>
                </p>
                <p>
                  <span>CDMX, México</span>
                  <br />
                  <span className="purpleTitle">+52 (55) 41 72 40 90</span>
                </p>
                <p>
                  <span>Austin, Texas</span>
                  <br />
                  <span className="purpleTitle">+1 (650) 45 70 118</span>
                </p>
              </div>
              <div className="email-info">
                <p>
                  <span className="purpleTitle">ancient.global</span>
                  <br />
                  <span>hola@ancient.global</span>
                </p>
              </div>
              <p className="page-number">{index + 1}</p>
            </div>
          </div>
        ))}
        <AddPageButton onClick={addNewPage} />
      </div>
    </div>
  );
};

export default Editor;
