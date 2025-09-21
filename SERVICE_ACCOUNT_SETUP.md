# Service Account Setup Steps

## Issue Found:
❌ API keys don't work with Google Sheets API for writing data
✅ Need Service Account credentials instead

## Steps to Fix:

### 1. Create Service Account
1. Go to [Google Cloud Console → Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Click "Create Service Account"
3. Name: `datazen-sheets-service`
4. Click "Create and Continue"
5. Role: Select "Editor"
6. Click "Continue" → "Done"

### 2. Create Key
1. Click on your new service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key" → "JSON"
4. Download the JSON file

### 3. Extract Credentials
From the downloaded JSON file, copy:
- `client_email` 
- `private_key`

### 4. Update .env.local
Uncomment and fill in these lines in your `.env.local`:
```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key-here\n-----END PRIVATE KEY-----\n"
```

### 5. Share Sheet
1. Open your Google Sheet
2. Click "Share"
3. Add the service account email
4. Set permission to "Editor"
5. Uncheck "Notify people"

### 6. Test
After setup, restart the server and try submitting the form again!

## Current Status:
✅ Form submissions are being logged to console
✅ Users see success messages
❌ Google Sheets integration needs service account setup
