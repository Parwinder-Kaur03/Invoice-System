import React, { useEffect, useRef, useState } from "react";
import Form from "./src/Form";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Download = ({ items, tax, invoiceNum, invoiceDate }) => {

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const invoiceRef = useRef(null);

  useEffect(() => {
  const sub = items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const taxAmount = (sub * parseFloat(tax || 0)) / 100;
  const totalAmount = sub + taxAmount;

  setSubtotal(sub);
  setTotal(totalAmount);
}, [items, tax]);

const handleDownloadPDF = () => {
    const input = invoiceRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };

    return (
        <>
        <div ref={invoiceRef} className="w-full lg:w-1/3 p-4 m-2 shadow-lg rounded-md">
      <p className="font-medium">Invoice Number: <span className="font-semibold">#{invoiceNum}</span></p>
<p className="font-medium">Date: <span className="font-semibold">{invoiceDate}</span></p>

        <p className="py-1 flex justify-between font-semibold">
          Subtotal: <span>₹{subtotal.toFixed(2)}</span>
        </p>
        <p className="py-1 flex justify-between font-semibold">
            Tax ({tax}%): <span>₹{((subtotal * tax) / 100).toFixed(2)}</span>
            </p>
        <p className="py-2 flex justify-between font-bold border-t-2 border-b-2 border-gray-300">
          Total: <span>₹{total.toFixed(2)}</span>
        </p>
        <button className="bg-blue-400 p-2 mt-6 ml-10 rounded text-white"
        onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
        </>
    )
}

export default Download;