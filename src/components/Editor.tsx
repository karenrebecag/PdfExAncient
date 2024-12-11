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

      <RightClickMenu />

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
              src="/logo.png"
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
