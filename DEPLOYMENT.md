# Deployment Guide - Doha Offers MVP

This guide provides instructions for deploying the Doha Offers MVP to various hosting platforms.

## Table of Contents
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Platform-Specific Guides](#platform-specific-guides)

## Local Development

### Quick Start
Run both backend and frontend with one command:
```bash
./start.sh
```

Or manually:

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Production Deployment

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- A hosting platform account (Heroku, Vercel, Netlify, etc.)

### Build for Production

#### Frontend
```bash
cd frontend
npm run build
```
This creates an optimized production build in `frontend/dist/`

#### Backend
The backend runs as-is in production with:
```bash
cd backend
npm start
```

### Environment Variables

#### Backend (.env)
```
PORT=5000
NODE_ENV=production
```

#### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com
```

## Platform-Specific Guides

### Heroku Deployment

#### Backend
1. Create a new Heroku app:
```bash
heroku create doha-offers-api
```

2. Set up the backend as a separate app:
```bash
cd backend
git init
heroku git:remote -a doha-offers-api
```

3. Create a Procfile in the backend directory:
```
web: npm start
```

4. Deploy:
```bash
git add .
git commit -m "Deploy backend"
git push heroku main
```

#### Frontend
1. Update the API URL in `frontend/vite.config.js` to point to your Heroku backend
2. Build the frontend:
```bash
cd frontend
npm run build
```
3. Deploy the `dist` folder to a static hosting service (see Netlify/Vercel below)

### Vercel Deployment

#### Frontend
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy from the frontend directory:
```bash
cd frontend
vercel
```

3. Follow the prompts to deploy

#### Backend
Vercel also supports Node.js APIs. Create a `vercel.json` in the backend directory:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

### Netlify Deployment

#### Frontend
1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

#### Backend
For the backend, use Netlify Functions or deploy to a separate service like Heroku or Railway.

### Railway Deployment

Railway provides an easy way to deploy both frontend and backend:

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Deploy backend:
```bash
cd backend
railway init
railway up
```

3. Deploy frontend similarly or use static hosting

### Docker Deployment

#### Backend Dockerfile
Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Frontend Dockerfile
Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
Create `docker-compose.yml` in the root:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

Run with:
```bash
docker-compose up -d
```

### AWS Deployment

#### Using AWS Elastic Beanstalk

1. Install AWS CLI and EB CLI
2. Initialize EB application:
```bash
cd backend
eb init
```

3. Create environment and deploy:
```bash
eb create doha-offers-api
eb deploy
```

#### Using AWS S3 + CloudFront (Frontend)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Upload to S3:
```bash
aws s3 sync dist/ s3://your-bucket-name/
```

3. Configure CloudFront distribution to serve from the S3 bucket

## Environment Configuration

### Backend Environment Variables
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `CORS_ORIGIN`: Allowed CORS origins

### Frontend Environment Variables
- `VITE_API_URL`: Backend API URL

## Post-Deployment Checklist

- [ ] Backend API is accessible and returns data
- [ ] Frontend can connect to backend API
- [ ] CORS is properly configured
- [ ] SSL/HTTPS is enabled
- [ ] Environment variables are set correctly
- [ ] Error logging is configured
- [ ] Performance monitoring is set up
- [ ] Database backups are configured (if applicable)

## Monitoring and Maintenance

### Health Checks
The backend includes a health check endpoint:
```
GET /api/health
```

### Logging
- Backend logs are written to stdout
- Frontend errors can be monitored via browser console or error tracking services

### Recommended Tools
- **Error Tracking**: Sentry, Rollbar
- **Analytics**: Google Analytics, Mixpanel
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Performance**: Lighthouse, WebPageTest

## Scaling Considerations

### Backend
- Use a load balancer for multiple instances
- Implement caching (Redis)
- Use a proper database (PostgreSQL, MongoDB) instead of JSON files
- Implement rate limiting

### Frontend
- Use CDN for static assets
- Implement code splitting
- Optimize images
- Enable gzip/brotli compression

## Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure backend CORS is configured to allow frontend domain
- Check that the API URL in frontend matches the deployed backend

**Build Failures:**
- Clear node_modules and reinstall dependencies
- Check Node.js version compatibility

**API Connection Issues:**
- Verify environment variables are set correctly
- Check network/firewall settings
- Ensure backend is running and accessible

## Support

For issues or questions, refer to the main README.md or create an issue in the repository.
