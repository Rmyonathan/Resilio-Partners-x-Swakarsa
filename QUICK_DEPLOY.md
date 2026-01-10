# ⚡ Quick Deployment Checklist

Follow these steps in order to deploy your app to Vercel with Neon database.

## ✅ Pre-Deployment Setup

- [ ] Commit all changes: `git add . && git commit -m "Ready for deployment"`
- [ ] Push to GitHub: `git push origin main`

## 🗄️ Step 1: Neon Database (5 minutes)

1. Go to [neon.tech](https://neon.tech) → Sign up (free)
2. Create new project → Copy **Connection String**
3. Save connection string (you'll need it for Vercel)

**Connection String Format:**
```
postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
```

## 🌐 Step 2: Deploy to Vercel (10 minutes)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. **"Add New Project"** → Import your GitHub repo
3. **Before clicking Deploy**, add these environment variables:

### Required Environment Variables:

```
DATABASE_URL = [Your Neon connection string from Step 1]
AUTH_SECRET = [Generate: openssl rand -base64 32]
NEXTAUTH_URL = https://your-app-name.vercel.app
```

### Email Variables (Choose Gmail OR Resend):

**Gmail (Recommended - FREE):**
```
GMAIL_USER = swakarsadigital@gmail.com
GMAIL_APP_PASSWORD = [Get from: myaccount.google.com/apppasswords]
ADMIN_EMAIL = swakarsadigital@gmail.com
```

**OR Resend (Alternative):**
```
RESEND_API_KEY = [Get from resend.com]
ADMIN_EMAIL = swakarsadigital@gmail.com
```

4. Click **"Deploy"**
5. Wait for build to complete (2-3 minutes)
6. **IMPORTANT**: After first deploy, update `NEXTAUTH_URL` to your actual Vercel URL, then redeploy

## 🗃️ Step 3: Database Setup (5 minutes)

After Vercel deployment succeeds:

```bash
# Install Vercel CLI (one-time)
npm i -g vercel

# Login and link project
vercel login
vercel link

# Pull environment variables to local (optional, for verification)
vercel env pull .env.local

# Run migrations on production database
npx prisma migrate deploy

# Seed initial data (admin users, etc.)
npx tsx prisma/seed.ts
```

**Or use Neon SQL Editor:**
- Go to Neon dashboard → SQL Editor
- Run migrations manually (not recommended)

## ✅ Step 4: Verify

- [ ] Visit your Vercel URL
- [ ] Test `/jobs` page loads
- [ ] Submit a job application form
- [ ] Login at `/login` with `admin@swakarsa.id` / `admin123`
- [ ] Check admin panel at `/admin`
- [ ] Verify emails are sending (check inboxes)

## 🎉 Done!

Your app is now live! Every push to `main` branch auto-deploys.

---

**Need help?** See `DEPLOYMENT_GUIDE.md` for detailed instructions.

