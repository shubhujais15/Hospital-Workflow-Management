import React from "react";
import { Button, Stack } from "@mui/joy";
import * as XLSX from "xlsx";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const PrintPage = ({ tableData }) => {
  // Headers for the table
  const headers = ["Role", "Country", "State", "Latitude", "Longitude", "Check-In", "Check-Out"];

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "History");
    XLSX.writeFile(workbook, "AttendanceHistory.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Attendance History", 10, 10);

    // Add headers
    doc.autoTable({
      head: [headers],
      body: tableData.map(row => [
        row.role,
        row.country,
        row.state,
        row.latitude,
        row.longitude,
        row.checkIn,
        row.checkOut,
      ]),
    });

    doc.save("AttendanceHistory.pdf");
  };

  // Export to DOCX

const exportToDocx = async () => {
  const doc = new Document({
    creator: "Attendance Manager",
    title: "Attendance History",
    description: "Document containing attendance history details",
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Attendance History",
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            text: "Here is the list of attendance records:",
          }),
          // Add more paragraphs or tables here as needed
        ],
      },
    ],
  });

  // Generate and save the document
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "attendance_history.docx");
};

// export default exportToDocx;

  return (
    <Stack spacing={2} direction="row">
      <Button onClick={exportToExcel} variant="solid" color="success">
        Export to Excel
      </Button>
      <Button onClick={exportToPDF} variant="solid" color="danger">
        Export to PDF
      </Button>
      <Button onClick={exportToDocx} variant="solid" color="primary">
        Export to DOCX
      </Button>
    </Stack>
  );
};

export default PrintPage;
