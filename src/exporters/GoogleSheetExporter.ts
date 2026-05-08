import { google } from 'googleapis';
import { googleSheetConfig } from '../config/googleSheet';

export class GoogleSheetExporter {
  private async getSheetsClient() {
    const auth = new google.auth.JWT({
      email: googleSheetConfig.clientEmail,
      key: googleSheetConfig.privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({
      version: 'v4',
      auth,
    });
  }

  async ensureSheetExists(sheetName: string) {
    const sheets = await this.getSheetsClient();

    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: googleSheetConfig.spreadsheetId,
    });

    const exists = spreadsheet.data.sheets?.some(
      sheet => sheet.properties?.title === sheetName
    );

    if (exists) return;

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: googleSheetConfig.spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
              },
            },
          },
        ],
      },
    });
  }

  async clearSheet(sheetName: string) {
    const sheets = await this.getSheetsClient();

    await sheets.spreadsheets.values.clear({
      spreadsheetId: googleSheetConfig.spreadsheetId,
      range: `${sheetName}!A:Z`,
    });
  }

  async export(sheetName: string, records: any[]) {
    await this.ensureSheetExists(sheetName);
    await this.clearSheet(sheetName);

    const sheets = await this.getSheetsClient();

    const rows = [
      [
        'Test',
        'Error',
        'AI Summary',
        'Fingerprint',
        'Timestamp',
      ],
      ...records.map(record => [
        record.testTitle,
        record.errorMessage,
        record.aiSummary,
        record.fingerprint,
        record.timestamp?.toISOString?.() ?? String(record.timestamp),
      ]),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: googleSheetConfig.spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: rows,
      },
    });
  }
}