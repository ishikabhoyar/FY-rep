import { google } from 'googleapis';

// Initialize Google Sheets API
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Configuration from environment variables
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID || '1yddeR6XD-DFfJb6vl0GKKFLWGiOcAXrHWuW7iucWQr8';
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Applications';

interface ApplicationData {
  name: string;
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
      // Method 1: Service Account (Recommended for production)
      if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
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
        this.auth = process.env.GOOGLE_API_KEY;
        this.sheets = google.sheets({ version: 'v4', auth: this.auth });
        this.isInitialized = true;
        console.log('Google Sheets initialized with API key');
      }
      // Method 3: Default credentials (if running on Google Cloud)
      else {
        console.warn('No Google Sheets credentials found. Service will not be initialized.');
        console.warn('Please check SHEETS_SETUP.md for setup instructions.');
        this.isInitialized = false;
      }
    } catch (error) {
      console.error('Failed to initialize Google Sheets auth:', error);
      this.isInitialized = false;
    }
  }

  async addApplication(data: ApplicationData): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('Google Sheets service not properly initialized');
      return false;
    }

    try {
      // Prepare the row data to match the actual form structure
      const values = [
        [
          new Date().toISOString(), // Timestamp
          data.name,
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
        range: `${SHEET_NAME}!A:I`, // Updated range to match actual columns
        valueInputOption: 'RAW',
        resource: {
          values,
        },
      };

      const response = await this.sheets.spreadsheets.values.append(request);
      console.log('Application added to Google Sheets:', response.data);
      return true;
    } catch (error) {
      console.error('Error adding application to Google Sheets:', error);
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
        range: `${SHEET_NAME}!A1:I1`,
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
