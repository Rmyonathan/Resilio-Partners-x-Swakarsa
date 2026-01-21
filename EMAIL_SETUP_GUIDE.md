# Email Setup Guide - Switching to Resilio Partners Email

## Current Setup

Currently, emails are sent from the email address specified in `GMAIL_USER` in your `.env` file. The "From" name is already set to "Resilio Partners" in the code, but the actual email address comes from `GMAIL_USER`.

**Current Configuration:**
```env
GMAIL_USER=swakarsadigital@gmail.com
GMAIL_APP_PASSWORD=your_current_app_password
```

**What users see:**
- From Name: "Resilio Partners"
- From Email: `swakarsadigital@gmail.com` (or whatever is in `GMAIL_USER`)

## How to Switch to Resilio Partners Email

To switch to a Resilio Partners email (e.g., `jirwin@resilio-partners.com` or `noreply@resilio-partners.com`):

### Option 1: Google Workspace Email (Recommended for Business)

If `resilio-partners.com` is set up with Google Workspace:

1. **Update `.env` file:**
   ```env
   GMAIL_USER=jirwin@resilio-partners.com
   GMAIL_APP_PASSWORD=your_new_app_password_here
   ```

2. **Get App Password for Google Workspace Email:**
   - Go to: https://admin.google.com (if you're the admin) OR https://myaccount.google.com
   - Sign in with the Resilio Partners email (`jirwin@resilio-partners.com`)
   - Go to **Security** → **2-Step Verification** (must be enabled first)
   - Scroll down to **App passwords**
   - Click **Select app** → Choose "Mail"
   - Click **Select device** → Choose "Other (Custom name)" → Enter "Resilio Partners Website"
   - Click **Generate**
   - Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)
   - **Remove the spaces** when adding to `.env` file

3. **Restart your dev server** after updating `.env`

### Option 2: Regular Gmail Account

If you want to use a personal Gmail account (not recommended for business, but works):

1. **Update `.env` file:**
   ```env
   GMAIL_USER=your-resilio-gmail@gmail.com
   GMAIL_APP_PASSWORD=your_new_app_password_here
   ```

2. **Get App Password for Gmail:**
   - Go to: https://myaccount.google.com
   - Sign in with the Gmail account
   - Go to **Security** → **2-Step Verification** (must be enabled first)
   - Scroll down to **App passwords**
   - Click **Select app** → Choose "Mail"
   - Click **Select device** → Choose "Other (Custom name)" → Enter "Resilio Partners Website"
   - Click **Generate**
   - Copy the 16-character password

## Important Notes

### 1. **2-Step Verification Required**
App passwords only work if 2-Step Verification is enabled on the Google account. If it's not enabled:
- Go to Security settings
- Enable 2-Step Verification first
- Then generate App Password

### 2. **From Name vs From Email**
- **From Name**: Already set to "Resilio Partners" in the code (line 53 in `app/lib/actions.ts`)
- **From Email**: Comes from `GMAIL_USER` environment variable
- Users will see: `Resilio Partners <jirwin@resilio-partners.com>`

### 3. **For Vercel Deployment**
When deploying to Vercel, add the same environment variables in Vercel project settings:
- `GMAIL_USER=jirwin@resilio-partners.com`
- `GMAIL_APP_PASSWORD=your_app_password`

### 4. **Testing**
After updating:
1. Restart your dev server: `npm run dev`
2. Check the console - you should see: `Gmail User: ✅ jirwin@resilio-partners.com`
3. Test by submitting a job application form
4. Check the email sender address in the received email

## Code Reference

The sender email is configured in `app/lib/actions.ts`:

```typescript
// Line 53
from: `Resilio Partners <${process.env.GMAIL_USER}>`,
```

To change the "From" name, you would edit this line, but it's already set to "Resilio Partners" which is correct.

## Troubleshooting

**Problem**: "Invalid login" error
- **Solution**: Make sure 2-Step Verification is enabled and you're using an App Password (not your regular password)

**Problem**: Emails not sending
- **Solution**: Check console logs for error messages, verify `GMAIL_APP_PASSWORD` has no spaces in `.env`

**Problem**: Want to send from multiple emails
- **Solution**: Currently the system uses one sender email. To use different senders, you'd need to modify the code or use Resend API with verified domains.

