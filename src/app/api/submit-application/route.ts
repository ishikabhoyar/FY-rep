import { NextRequest, NextResponse } from 'next/server';
import { googleSheetsService } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the required fields
    const requiredFields = ['name', 'college', 'year', 'preference1', 'preference2', 'aboutYourself', 'whyJoin', 'resumeLink'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    // Log the application data (fallback while setting up Google Sheets)
    console.log('=== NEW APPLICATION SUBMITTED ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Name:', body.name);
    console.log('College:', body.college);
    console.log('Year:', body.year);
    console.log('Preference 1:', body.preference1);
    console.log('Preference 2:', body.preference2);
    console.log('About Yourself:', body.aboutYourself);
    console.log('Why Join:', body.whyJoin);
    console.log('Resume Link:', body.resumeLink);
    console.log('================================');

    // Try to add to Google Sheets
    let sheetsSuccess = false;
    try {
      sheetsSuccess = await googleSheetsService.addApplication(body);
    } catch (sheetsError) {
      console.error('Google Sheets error (will continue with console logging):', sheetsError);
    }

    if (sheetsSuccess) {
      return NextResponse.json(
        { message: 'Application submitted successfully to Google Sheets' },
        { status: 200 }
      );
    } else {
      // Return success even if Google Sheets fails (data is logged to console)
      return NextResponse.json(
        { 
          message: 'Application received and logged (Google Sheets setup pending)',
          note: 'Your application has been recorded. Please check the setup guide for Google Sheets integration.'
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error in submit-application API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
