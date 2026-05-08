import dotenv from 'dotenv';

dotenv.config();

export const googleSheetConfig = {
  spreadsheetId: process.env.GOOGLE_SHEET_ID!,
  clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
  privateKey: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
};