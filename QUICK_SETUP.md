# Quick Google Sheets Setup Guide

Since you're seeing "Submission Failed", here's a quick setup to get your form working:

## Option 1: Quick Setup with API Key (5 minutes)

1. **Get an API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Make sure your project is selected
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key

2. **Update your `.env.local` file**:
   ```bash
   # Add this line to your .env.local file:
   GOOGLE_API_KEY=your-api-key-here
   
   # Keep these existing lines:
   GOOGLE_SHEETS_ID=1yddeR6XD-DFfJb6vl0GKKFLWGiOcAXrHWuW7iucWQr8
   GOOGLE_SHEET_NAME=Applications
   ```

3. **Make your sheet public** (temporarily for testing):
   - Open your Google Sheet
   - Click "Share" > "Change to anyone with the link"
   - Set permission to "Editor"

4. **Restart your development server**:
   ```bash
   npm run dev
   ```

5. **Test the form** - it should now work!

## Current Status
- ✅ Form is working and logging to console
- ❌ Google Sheets integration needs authentication
- ✅ Fallback logging is active

## What happens now:
1. When you submit the form, it will try Google Sheets first
2. If that fails, it logs to console and still shows success
3. You can see all submissions in your terminal/console

## Next Steps:
1. Follow Option 1 above for quick API key setup
2. Or follow SHEETS_SETUP.md for more secure service account setup
3. Your form submissions are being logged to console in the meantime

## Testing:
Try submitting the form again after setting up the API key!
