import React, { useRef, useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import Header from "./Header";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "../styles/editor.scss";
import AddPageButton from "./AddPageButton";

const A4_PAGE_HEIGHT = 1122;
const A4_PAGE_WIDTH = 794;

const Editor: React.FC = () => {
  const [pagesCount, setPagesCount] = useState(1);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeElementRef = useRef<HTMLDivElement | null>(null);

  // Verificar el desbordamiento
  const checkOverflow = () => {
    pagesRef.current.forEach((page, index) => {
      if (page) {
        const stripContent = page.querySelector(".strip-content") as HTMLDivElement;
        
        if (stripContent.scrollHeight > stripContent.clientHeight) {
          setPagesCount(pagesCount + 1);
        }
      }
    });
  };

  // Aplicar clase de texto
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
    checkOverflow();
  };

  // Cambiar tamaño de texto
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
        selectedNode.style.fontSize = `${newSize}px`;
      }
    }
    checkOverflow();
  };

  // Añadir nueva página manualmente
  const addNewPage = () => setPagesCount(pagesCount + 1);

  // Descargar PDF
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

  return (
    <div className="editor-container">
      <Header onDownloadPDF={handleDownloadPDF} />
      <Toolbar
        onIncreaseTextSize={() => adjustTextSize(2)}
        onDecreaseTextSize={() => adjustTextSize(-2)}
        onSelectClass={applyTextClass}
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
              onInput={checkOverflow}
              onFocus={(e) =>
                (activeElementRef.current = e.target as HTMLDivElement)
              }
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
