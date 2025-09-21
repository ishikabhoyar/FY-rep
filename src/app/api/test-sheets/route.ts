import { NextRequest, NextResponse } from 'next/server';
import { googleSheetsService } from '@/lib/googleSheets';

export async function GET(request: NextRequest) {
  try {
    // Test if the Google Sheets service is properly configured
    const envCheck = {
      hasServiceAccountEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      hasApiKey: !!process.env.GOOGLE_API_KEY,
      hasSheetsId: !!process.env.GOOGLE_SHEETS_ID,
      sheetsId: process.env.GOOGLE_SHEETS_ID,
      sheetName: process.env.GOOGLE_SHEET_NAME,
    };

    return NextResponse.json({
      message: 'Google Sheets configuration test',
      config: envCheck,
      status: 'Check the config above to see what might be missing'
    });
  } catch (error) {
    console.error('Error in test-sheets API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
