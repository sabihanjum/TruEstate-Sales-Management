# Deployment Guide

## Prerequisites
- GitHub account
- Render account (https://render.com)
- Git installed locally

## Step 1: Push to GitHub

### 1.1 Create a New Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `TruEstate-Sales-Management`
3. Description: `Retail Sales Management System with advanced filtering, search, and pagination`
4. Keep it **Public**
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 1.2 Push Your Code
After creating the repository, run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/TruEstate-Sales-Management.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 2: Deploy Backend on Render

### 2.1 Create Web Service
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select `TruEstate-Sales-Management` repository

### 2.2 Configure Backend Service
Fill in the following details:

**Basic Settings:**
- **Name**: `truestate-backend`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`

**Build & Deploy:**
- **Build Command**: `chmod +x build.sh && ./build.sh`
- **Start Command**: `gunicorn truestate_backend.wsgi:application`

**Environment Variables:**
Click "Advanced" and add these environment variables:

| Key | Value |
|-----|-------|
| `PYTHON_VERSION` | `3.11.0` |
| `SECRET_KEY` | Generate a random string (use: https://djecrety.ir/) |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `truestate-backend.onrender.com` (update with your actual URL) |
| `CORS_ALLOW_ALL_ORIGINS` | `False` |
| `CORS_ALLOWED_ORIGINS` | `https://your-frontend-url.vercel.app` (update after frontend deployment) |

**Instance Type:**
- Select **Free** tier

Click "Create Web Service"

### 2.3 Wait for Deployment
- Render will automatically build and deploy your backend
- This may take 5-10 minutes
- Once complete, you'll get a URL like: `https://truestate-backend.onrender.com`

### 2.4 Test Backend
Visit: `https://truestate-backend.onrender.com/api/sales/`

You should see JSON data with sales transactions.

## Step 3: Deploy Frontend on Vercel

### 3.1 Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 3.2 Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select `TruEstate-Sales-Management`

**Configure Project:**
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

**Environment Variables:**
Add this environment variable:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://truestate-backend.onrender.com/api/` |

(Use your actual Render backend URL)

Click "Deploy"

### 3.3 Wait for Deployment
- Vercel will build and deploy your frontend
- Takes 1-2 minutes
- You'll get a URL like: `https://truestate-sales-management.vercel.app`

## Step 4: Update CORS Settings

After frontend is deployed:

1. Go back to Render dashboard
2. Open your backend service
3. Go to "Environment" tab
4. Update `CORS_ALLOWED_ORIGINS` with your Vercel URL:
   ```
   https://truestate-sales-management.vercel.app
   ```
5. Save changes (this will redeploy)

## Step 5: Update README

Update your README.md with the live URLs:

```markdown
## Live Application
- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://truestate-backend.onrender.com/api/
```

Commit and push:
```bash
git add README.md
git commit -m "Update live application URLs"
git push
```

## Troubleshooting

### Backend Issues

**Problem**: Build fails
- Check build logs in Render dashboard
- Ensure `requirements.txt` is correct
- Verify Python version

**Problem**: 500 Internal Server Error
- Check application logs in Render
- Verify environment variables are set
- Check database connection

**Problem**: CORS errors
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Check that frontend is using correct backend URL

### Frontend Issues

**Problem**: API calls fail
- Check `VITE_API_URL` environment variable
- Verify backend is running
- Check browser console for errors

**Problem**: Build fails
- Check build logs in Vercel
- Verify `package.json` is correct
- Check Node version compatibility

## Important Notes

### Free Tier Limitations

**Render Free Tier:**
- Backend may sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month free

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

### Database Persistence

The free tier uses SQLite which is ephemeral on Render. For production:
1. Use Render's PostgreSQL database (free tier available)
2. Update `DATABASE_URL` environment variable
3. Run migrations after connecting database

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] API calls working from frontend to backend
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] README updated with live URLs
- [ ] Test all features (search, filter, sort, pagination)
- [ ] Check mobile responsiveness
- [ ] Verify error handling

## Monitoring

### Render Dashboard
- Monitor backend logs
- Check deployment status
- View metrics and usage

### Vercel Dashboard
- Monitor frontend deployments
- Check analytics
- View build logs

## Updating Your Application

To deploy updates:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push

# Both Render and Vercel will auto-deploy
```

## Support

If you encounter issues:
- Check Render logs: https://dashboard.render.com
- Check Vercel logs: https://vercel.com/dashboard
- Review documentation: 
  - Render: https://render.com/docs
  - Vercel: https://vercel.com/docs
