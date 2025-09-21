import { NextRequest, NextResponse } from 'next/server';
import { googleSheetsService } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    console.log('Init-sheet API called');
    const success = await googleSheetsService.initializeSheet();
    
    if (success) {
      return NextResponse.json(
        { message: 'Sheet headers initialized successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to initialize sheet headers' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in init-sheet API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('Init-sheet API called via GET');
    const success = await googleSheetsService.initializeSheet();
    
    if (success) {
      return NextResponse.json(
        { message: 'Sheet headers initialized successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to initialize sheet headers' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in init-sheet API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
