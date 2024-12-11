import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Genera un PDF desde un elemento HTML.
 * @param element - El elemento HTML que se convertirá en PDF.
 */
export const downloadPDF = async (element: HTMLElement) => {
  const pdf = new jsPDF('p', 'pt', 'a4');
  const canvas = await html2canvas(element, { scale: 2 });

  // Convertir canvas a imagen
  const imgData = canvas.toDataURL('image/png');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Agregar imagen al PDF (centrada y ajustada al tamaño de página)
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

  // Descargar el archivo PDF
  pdf.save('document.pdf');
};