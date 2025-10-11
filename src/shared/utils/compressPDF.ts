import { PDFDocument } from "pdf-lib";

export async function compressPDF(file: File): Promise<File> {
  if (!file || file.type !== "application/pdf") return file;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      updateMetadata: false,
    });

    // Reescribe el PDF aplicando streams comprimidos
    const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: true });

    // ⚡ Convertimos explícitamente a Uint8Array compatible
    const compressedBlobPart = new Uint8Array(compressedPdfBytes);

    return new File([compressedBlobPart], file.name, {
      type: "application/pdf",
    });
  } catch (error) {
    console.error("Error al comprimir el PDF:", error);
    return file;
  }
}
