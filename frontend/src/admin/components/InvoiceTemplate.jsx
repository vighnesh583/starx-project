import React, { useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvoiceTemplate = ({ student, selectedInstallments }) => {
    useEffect(() => {
        const doc = new jsPDF();

        const totalPaid = selectedInstallments.reduce((sum, i) => sum + i.amount, 0);
        const remaining = student.totalFees - totalPaid;

        doc.setFontSize(18);
        doc.text("StarX Academy - Student Invoice", 14, 20);

        doc.setFontSize(12);
        doc.text(`Name: ${student.name}`, 14, 35);
        doc.text(`Email: ${student.email}`, 14, 42);
        doc.text(`Contact: ${student.contact}`, 14, 49);
        doc.text(`Course: ${student.courses[0]?.name}`, 14, 56);
        doc.text(`Topics: ${student.courses[0]?.selectedTopics?.join(", ")}`, 14, 63);

        autoTable(doc, {
            startY: 70,
            head: [["Amount", "Due Date"]],
            body: selectedInstallments.map(i => [`${i.amount}`, i.dueDate?.split("T")[0]]),
        });

        doc.text(`Total Paid: ${totalPaid}`, 14, doc.lastAutoTable.finalY + 10);
        doc.text(`Total Fees: ${student.totalFees}`, 14, doc.lastAutoTable.finalY + 17);
        doc.text(`Remaining Fees: ${remaining}`, 14, doc.lastAutoTable.finalY + 24);

        doc.save(`Invoice_${student.name}.pdf`);
    }, [student, selectedInstallments]);

    return null;
};

export default InvoiceTemplate;
