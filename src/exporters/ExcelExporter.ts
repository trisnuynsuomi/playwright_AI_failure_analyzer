import ExcelJS from "exceljs";

export class ExcelExporter {
  async export(records: any[]) {
    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("Failures");

    sheet.columns = [
      {
        header: "Test",
        key: "testTitle",
        width: 40,
      },

      {
        header: "Error",
        key: "errorMessage",
        width: 50,
      },

      {
        header: "AI Summary",
        key: "aiSummary",
        width: 80,
      },

      {
        header: "Timestamp",
        key: "timestamp",
        width: 30,
      },
    ];

    records.forEach((r) => {
      sheet.addRow(r);
    });

    await workbook.xlsx.writeFile("failure-report.xlsx");
  }
}
