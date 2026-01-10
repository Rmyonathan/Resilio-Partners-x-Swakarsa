# 🚀 Deployment Guide - Vercel + Neon PostgreSQL (100% Free)

This guide will help you deploy your Next.js application to Vercel with a free PostgreSQL database using Neon.

## 📋 Prerequisites

- GitHub account (for Vercel deployment)
- Email account for signing up to services
- Your project ready to deploy

---

## Step 1: Set Up Neon Database (Free PostgreSQL) 🗄️

### 1.1 Create Neon Account
1. Go to [neon.tech](https://neon.tech)
2. Click **"Sign Up"** (or "Start Free")
3. Sign up with GitHub (recommended) or email
4. Verify your email if needed

### 1.2 Create a New Project
1. Click **"Create Project"**
2. Fill in:
   - **Project Name**: `resilio-partners` (or your preferred name)
   - **Region**: Choose closest to your users (e.g., `US East (Ohio)` for US, `EU West` for Europe)
   - **PostgreSQL Version**: Use default (usually latest stable)
3. Click **"Create Project"**

### 1.3 Get Connection String
1. After project creation, you'll see a **Connection String** section
2. Copy the **Connection String** (it looks like: `postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`)
3. **IMPORTANT**: Save this connection string securely - you'll need it for Vercel environment variables

### 1.4 (Optional) Create .env.local for Local Development
Create a `.env.local` file in your project root:
```env
DATABASE_URL="your-neon-connection-string-here"
```

**Free Tier Limits:**
- ✅ 5 GB storage
- ✅ Shared compute (auto-sleeps after inactivity, wakes up quickly)
- ✅ Unlimited projects
- ✅ No credit card required

---

## Step 2: Run Database Migrations Locally (Optional but Recommended)

Before deploying, test your database connection locally:

```bash
# 1. Set DATABASE_URL in .env.local (from Step 1.3)
# 2. Install dependencies
npm install

# 3. Push schema to Neon database
npx prisma db push

# 4. Seed initial data (admin users, team members, etc.)
npx tsx prisma/seed.ts
```

**Verify it works:**
- Check your Neon dashboard - you should see tables created
- Try running `npm run dev` and test login with `admin@swakarsa.id` / `admin123`

---

## Step 3: Deploy to Vercel 🌐

### 3.1 Prepare Your Project
1. Make sure all changes are committed to Git:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### 3.2 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with **GitHub** (recommended for easiest integration)
4. Authorize Vercel to access your GitHub repositories

### 3.3 Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository (`Resilio-PartnersxSwakarsa`)
3. Click **"Import"**

### 3.4 Configure Project Settings
Vercel will auto-detect Next.js, but verify:
- **Framework Preset**: Next.js (should be auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

**DON'T CLICK "Deploy" YET** - we need to set environment variables first!

---

## Step 4: Configure Environment Variables 🔐

Before deploying, add all required environment variables in Vercel:

### 4.1 Add Environment Variables in Vercel
1. In the project import page, scroll down to **"Environment Variables"**
2. Add each variable below:

#### Required Variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `DATABASE_URL` | Your Neon connection string from Step 1.3 | PostgreSQL database URL |
| `AUTH_SECRET` | Generate using: `openssl rand -base64 32` | NextAuth.js secret (see below) |
| `NEXTAUTH_URL` | `https://your-app-name.vercel.app` | Your production URL (update after first deploy) |

#### Optional Email Variables (Choose One Method):

**Option A: Gmail SMTP (FREE, Recommended)**
| Variable Name | Value | Description |
|--------------|-------|-------------|
| `GMAIL_USER` | `swakarsadigital@gmail.com` | Your Gmail address |
| `GMAIL_APP_PASSWORD` | Your 16-char app password | [How to get Gmail App Password](#gmail-app-password) |
| `ADMIN_EMAIL` | `swakarsadigital@gmail.com` | Admin notification email |
| `RESEND_API_KEY` | (leave empty) | Not needed if using Gmail |

**Option B: Resend API (Requires Domain)**
| Variable Name | Value | Description |
|--------------|-------|-------------|
| `RESEND_API_KEY` | Your Resend API key | Get from resend.com |
| `ADMIN_EMAIL` | `swakarsadigital@gmail.com` | Admin notification email |
| `GMAIL_USER` | (leave empty) | Not needed if using Resend |

### 4.2 Generate AUTH_SECRET

Run this command in your terminal (or use online generator):

**On Windows (PowerShell):**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**On Mac/Linux:**
```bash
openssl rand -base64 32
```

Copy the output and paste it as the value for `AUTH_SECRET`.

### 4.3 Gmail App Password (If Using Gmail)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select **"Mail"** and **"Other (Custom name)"**
5. Name it: `Resilio Partners Production`
6. Click **"Generate"**
7. Copy the 16-character password (no spaces)
8. Use this as `GMAIL_APP_PASSWORD` value

---

## Step 5: Deploy! 🚀

1. After adding all environment variables, scroll up
2. Click **"Deploy"**
3. Wait 2-3 minutes for build to complete
4. Once deployed, Vercel will show your live URL (e.g., `https://resilio-partners.vercel.app`)

### 5.1 Update NEXTAUTH_URL (IMPORTANT!)
After first deploy, you'll get your production URL:
1. Go to **Project Settings** → **Environment Variables**
2. Find `NEXTAUTH_URL`
3. Update it to your actual Vercel URL (e.g., `https://resilio-partners.vercel.app`)
4. Click **"Save"**
5. Go to **Deployments** tab
6. Click the **three dots (⋯)** on the latest deployment
7. Click **"Redeploy"**

---

## Step 6: Set Up Database in Production 🗄️

### 6.1 Run Migrations on Production Database

You have two options:

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (from your project directory)
vercel link

# Run Prisma migrations (this will use production DATABASE_URL from Vercel)
npx prisma migrate deploy
```

**Option B: Using Neon SQL Editor**
1. Go to your Neon dashboard
2. Click **"SQL Editor"**
3. You can manually run Prisma migrations, but **Option A is easier**

### 6.2 Seed Production Database

After migrations, seed initial data:

```bash
# Make sure you're in project directory and have .env.local with production DATABASE_URL
# Or use Vercel CLI to pull env vars
vercel env pull .env.local

# Run seed script
npx tsx prisma/seed.ts
```

**⚠️ Important:** Only seed once! The seed script uses `upsert`, so it's safe to run multiple times, but you typically only need to do it once.

---

## Step 7: Verify Deployment ✅

1. **Test Public Pages:**
   - Visit your Vercel URL
   - Check `/jobs` page loads
   - Test application form submission

2. **Test Authentication:**
   - Go to `/login`
   - Login with `admin@swakarsa.id` / `admin123`
   - Verify redirect to `/admin` works

3. **Test Database:**
   - Submit a job application form
   - Check Neon dashboard → Data section to see new records
   - Login to admin panel and verify you can see applications

4. **Test Email (if configured):**
   - Submit a job application
   - Check applicant email inbox for confirmation
   - Check admin email for notification

---

## 🔧 Troubleshooting

### Build Fails with "Prisma Client not generated"
- **Solution**: Make sure `postinstall` script is in `package.json`:
  ```json
  "scripts": {
    "postinstall": "prisma generate"
  }
  ```

### Database Connection Errors
- **Check**: DATABASE_URL is correct (copy from Neon dashboard)
- **Check**: Connection string includes `?sslmode=require` at the end
- **Check**: Neon database is not paused (it auto-wakes, but first connection may take 2-3 seconds)

### Authentication Not Working
- **Check**: AUTH_SECRET is set in Vercel environment variables
- **Check**: NEXTAUTH_URL matches your actual Vercel domain
- **Redeploy** after changing NEXTAUTH_URL

### Email Not Sending
- **Gmail**: Verify Gmail App Password is correct (16 chars, no spaces)
- **Gmail**: Make sure 2-Step Verification is enabled
- **Both**: Check Vercel function logs for email errors
- **Test**: Try sending from local dev environment first

### "Module not found" Errors
- **Solution**: Make sure `@prisma/client` is in `dependencies`, not `devDependencies`
- **Solution**: Delete `node_modules` and `.next`, then `npm install` again

---

## 📊 Free Tier Limits

### Neon (Database)
- ✅ **5 GB storage** - Plenty for MVP and beyond
- ✅ **Shared compute** - Auto-sleeps after 5 min inactivity (wakes in 1-2 seconds)
- ✅ **Unlimited projects**
- ✅ **No credit card required**

### Vercel (Hosting)
- ✅ **100 GB bandwidth/month**
- ✅ **Unlimited deployments**
- ✅ **Automatic HTTPS**
- ✅ **No credit card required**
- ⚠️ **Serverless functions**: 100GB-hours/month (usually plenty for MVP)

---

## 🔄 Continuous Deployment

Once set up, every push to your `main` branch will automatically:
1. Trigger a new build on Vercel
2. Run `npm install`
3. Run `prisma generate` (via postinstall)
4. Build your Next.js app
5. Deploy to production

**To deploy database schema changes:**
```bash
# Make changes to prisma/schema.prisma
npx prisma migrate dev --name your_migration_name
git add prisma/
git commit -m "Update database schema"
git push origin main

# After code is deployed, run migrations on production
npx prisma migrate deploy
```

---

## 🎉 You're Live!

Your application is now deployed and accessible worldwide! 

**Next Steps:**
- Set up a custom domain (optional, in Vercel project settings)
- Monitor usage in Neon and Vercel dashboards
- Set up error tracking (e.g., Sentry - optional)
- Configure backups (Neon has automatic backups on free tier)

**Support:**
- Neon Docs: https://neon.tech/docs
- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs

