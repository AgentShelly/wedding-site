import { google } from "googleapis";

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendYesRow(data: {
  timestamp: string;
  totalGuests: number;
  primaryFirst: string;
  primaryLast: string;
  primaryEmail: string;
  primaryPhone: string;
  guests: { firstName: string; lastName: string }[];
}) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const row = [
    data.timestamp,
    data.totalGuests,
    data.primaryFirst,
    data.primaryLast,
    data.primaryEmail,
    data.primaryPhone,
    ...data.guests.flatMap((g) => [g.firstName, g.lastName]),
  ];
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID_YES,
    range: "Sheet1!A1",
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}

export async function appendNoRow(data: {
  timestamp: string;
  fullName: string;
  reason?: string;
}) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const row = [data.timestamp, data.fullName, data.reason ?? ""];
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID_NO,
    range: "Sheet1!A1",
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}
