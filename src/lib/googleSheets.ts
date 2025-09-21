import { google } from 'googleapis';

// Initialize Google Sheets API
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Configuration from environment variables
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID || '1yddeR6XD-DFfJb6vl0GKKFLWGiOcAXrHWuW7iucWQr8';
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Sheet1';

interface ApplicationData {
  name: string;
  phone: string;
  college: string;
  year: string;
  preference1: string;
  preference2: string;
  aboutYourself: string;
  whyJoin: string;
  resumeLink: string;
}

export class GoogleSheetsService {
  private sheets: any;
  private auth: any;
  private isInitialized = false;

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    try {
      console.log('Initializing Google Sheets auth...');
      console.log('Environment variables check:');
      console.log('- GOOGLE_SERVICE_ACCOUNT_EMAIL:', !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
      console.log('- GOOGLE_PRIVATE_KEY exists:', !!process.env.GOOGLE_PRIVATE_KEY);
      console.log('- GOOGLE_SHEETS_ID:', process.env.GOOGLE_SHEETS_ID);
      console.log('- GOOGLE_SHEET_NAME:', process.env.GOOGLE_SHEET_NAME);

      // Method 1: Service Account (Recommended for production)
      if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
        console.log('Using service account authentication');
        this.auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          },
          scopes: SCOPES,
        });
        this.sheets = google.sheets({ version: 'v4', auth: this.auth });
        this.isInitialized = true;
        console.log('Google Sheets initialized with service account');
      }
      // Method 2: API Key (Less secure, for development)
      else if (process.env.GOOGLE_API_KEY) {
        console.log('Using API key authentication');
        this.auth = process.env.GOOGLE_API_KEY;
        this.sheets = google.sheets({ version: 'v4', auth: this.auth });
        this.isInitialized = true;
        console.log('Google Sheets initialized with API key');
      }
      // Method 3: Default credentials (if running on Google Cloud)
      else {
        console.warn('No Google Sheets credentials found. Service will not be initialized.');
        console.warn('Please check SHEETS_SETUP.md for setup instructions.');
        console.warn('Missing variables:');
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) console.warn('- GOOGLE_SERVICE_ACCOUNT_EMAIL');
        if (!process.env.GOOGLE_PRIVATE_KEY) console.warn('- GOOGLE_PRIVATE_KEY');
        if (!process.env.GOOGLE_API_KEY) console.warn('- GOOGLE_API_KEY');
        this.isInitialized = false;
      }
    } catch (error) {
      console.error('Failed to initialize Google Sheets auth:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      this.isInitialized = false;
    }
  }

  async addApplication(data: ApplicationData): Promise<boolean> {
    console.log('addApplication called, isInitialized:', this.isInitialized);
    
    if (!this.isInitialized) {
      console.error('Google Sheets service not properly initialized');
      return false;
    }

    try {
      console.log('Attempting to add application to Google Sheets...');
      console.log('Using spreadsheet ID:', SPREADSHEET_ID);
      console.log('Using sheet name:', SHEET_NAME);

      // Prepare the row data to match the actual form structure
      const values = [
        [
          new Date().toISOString(), // Timestamp
          data.name,
          data.phone,
          data.college,
          data.year,
          data.preference1,
          data.preference2,
          data.aboutYourself,
          data.whyJoin,
          data.resumeLink,
        ],
      ];

      const request = {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:J`, // Updated range to include phone number column
        valueInputOption: 'RAW',
        resource: {
          values,
        },
      };

      console.log('Making request to Google Sheets API...');
      const response = await this.sheets.spreadsheets.values.append(request);
      console.log('Application added to Google Sheets successfully:', response.data);
      return true;
    } catch (error) {
      console.error('Error adding application to Google Sheets:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        // @ts-ignore
        code: error?.code,
        // @ts-ignore
        status: error?.status
      });
      return false;
    }
  }

  async initializeSheet(): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('Google Sheets service not properly initialized');
      return false;
    }

    try {
      // Create headers to match the actual form structure
      const headers = [
        'Timestamp',
        'Name',
        'Phone',
        'College',
        'Year',
        'Preference 1',
        'Preference 2',
        'About Yourself',
        'Why Join',
        'Resume Link',
      ];

      const request = {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:J1`,
        valueInputOption: 'RAW',
        resource: {
          values: [headers],
        },
      };

      await this.sheets.spreadsheets.values.update(request);
      console.log('Sheet headers initialized');
      return true;
    } catch (error) {
      console.error('Error initializing sheet:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const googleSheetsService = new GoogleSheetsService();
