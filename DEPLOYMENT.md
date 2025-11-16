# Deployment Guide - Docker & Easypanel

Complete guide for deploying the Creatype Storefront to VPS using Docker and Easypanel.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Docker Testing](#local-docker-testing)
- [Easypanel Deployment](#easypanel-deployment)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **VPS Server**: Ubuntu 20.04+ or similar
- **Easypanel**: Installed on your VPS

### Required Credentials
- WooCommerce site URL
- WooCommerce Consumer Key
- WooCommerce Consumer Secret
- Domain name (for production)

---

## Local Docker Testing

Test the Docker build locally before deploying to production.

### 1. Build the Docker Image

```bash
# Build the image
docker build -t creatype-storefront:latest .

# Check the image was created
docker images | grep creatype-storefront
```

### 2. Run with Docker Compose

```bash
# Copy environment file
cp .env.production.example .env.production

# Edit .env.production with your credentials
nano .env.production

# Start the container
docker-compose up -d

# Check logs
docker-compose logs -f

# Access the app
open http://localhost:3000
```

### 3. Test the Application

```bash
# Check container health
docker ps

# View logs
docker logs creatype-storefront

# Test the endpoint
curl http://localhost:3000

# Stop the container
docker-compose down
```

---

## Easypanel Deployment

### Method 1: Using Easypanel UI (Recommended)

#### Step 1: Access Easypanel Dashboard
1. Open your Easypanel dashboard: `https://your-vps-ip:3000`
2. Login with your credentials

#### Step 2: Create New Project
1. Click **"Create Project"**
2. Enter project name: `creatype-storefront`
3. Click **"Create"**

#### Step 3: Add Service
1. Click **"Add Service"**
2. Select **"App"**
3. Choose **"From Source"**

#### Step 4: Configure Source
1. **Source Type**: GitHub/GitLab
2. **Repository**: Your repository URL
3. **Branch**: `main`
4. **Auto Deploy**: Enable (optional)

Or for Docker Hub:
1. **Source Type**: Docker Image
2. **Image**: `your-username/creatype-storefront:latest`

#### Step 5: Configure Build
1. **Build Type**: Dockerfile
2. **Dockerfile Path**: `/Dockerfile`
3. **Context**: `/`

#### Step 6: Configure Service
1. **Service Name**: `web`
2. **Port**: `3000`
3. **Protocol**: HTTP

#### Step 7: Add Environment Variables
Click **"Environment"** and add:

```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_WC_SITE_URL=https://your-wordpress-site.com
WC_CONSUMER_KEY=ck_your_consumer_key
WC_CONSUMER_SECRET=cs_your_consumer_secret
```

#### Step 8: Configure Domain
1. Click **"Domains"**
2. Add domain: `creatype.yourdomain.com`
3. Enable **SSL/HTTPS**
4. Click **"Add"**

#### Step 9: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (3-5 minutes)
3. Check logs for any errors

### Method 2: Using easypanel.yml

#### Step 1: Prepare Repository
```bash
# Ensure easypanel.yml is in your repo root
git add easypanel.yml
git commit -m "Add Easypanel configuration"
git push origin main
```

#### Step 2: Import to Easypanel
1. Open Easypanel dashboard
2. Click **"Import Project"**
3. Select **"From Configuration File"**
4. Choose repository with `easypanel.yml`
5. Review configuration
6. Click **"Import"**

#### Step 3: Configure Secrets
Update the environment variables in Easypanel UI with your actual credentials.

---

## Environment Configuration

### Required Environment Variables

#### Production (.env.production)
```bash
# WooCommerce API
NEXT_PUBLIC_WC_SITE_URL=https://your-site.com
WC_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Next.js
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Environment Variable Priority
1. Easypanel UI variables (highest priority)
2. `.env.production` file
3. `docker-compose.yml` defaults
4. Application defaults (mock data)

---

## Domain & SSL Setup

### Configure DNS
1. Add A record pointing to your VPS IP:
   ```
   Type: A
   Name: creatype (or @)
   Value: YOUR_VPS_IP
   TTL: 3600
   ```

2. Wait for DNS propagation (5-30 minutes)

### Enable SSL in Easypanel
1. Go to project **"Domains"**
2. Enable **"SSL/HTTPS"**
3. Easypanel auto-configures Let's Encrypt
4. Certificate renews automatically

---

## Health Checks & Monitoring

### Container Health Check
The Docker container includes a health check:
```dockerfile
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Monitor in Easypanel
1. **Logs**: View in real-time from dashboard
2. **Metrics**: CPU, Memory, Network usage
3. **Uptime**: Automatic monitoring
4. **Alerts**: Configure in settings

### Manual Checks
```bash
# SSH into your VPS
ssh user@your-vps-ip

# Check container status
docker ps | grep creatype

# View logs
docker logs -f creatype-storefront

# Check health
curl http://localhost:3000

# Check resources
docker stats creatype-storefront
```

---

## Updating the Application

### Method 1: Git Push (Auto Deploy Enabled)
```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Easypanel auto-detects and redeploys
# Wait 3-5 minutes for build
```

### Method 2: Manual Deploy via Easypanel
1. Open Easypanel dashboard
2. Go to your project
3. Click **"Redeploy"**
4. Wait for build completion

### Method 3: Docker Image Update
```bash
# Build new image
docker build -t your-username/creatype-storefront:latest .

# Push to registry
docker push your-username/creatype-storefront:latest

# Redeploy in Easypanel
# (Easypanel will pull latest image)
```

---

## Scaling & Performance

### Horizontal Scaling
In Easypanel, increase replicas:
1. Go to service settings
2. **Replicas**: Change from 1 to 2 or more
3. Click **"Update"**
4. Load balancing is automatic

### Vertical Scaling
Increase resources:
1. **Memory Limit**: 512MB → 1GB
2. **CPU Limit**: 0.5 → 1.0 core
3. Click **"Update"**

### Caching Strategy
The app uses Next.js built-in caching:
- Static pages cached automatically
- API responses cached on client
- Images optimized and cached

---

## Backup & Recovery

### Backup Configuration
1. Export environment variables from Easypanel
2. Save `.env.production` securely
3. Backup WooCommerce credentials

### Quick Recovery
```bash
# Redeploy from scratch
1. Delete project in Easypanel
2. Create new project
3. Import easypanel.yml
4. Add environment variables
5. Deploy
```

---

## Troubleshooting

### Container Won't Start

**Check logs:**
```bash
docker logs creatype-storefront
```

**Common issues:**
- Missing environment variables
- Port 3000 already in use
- Build errors

**Solutions:**
```bash
# Check port usage
sudo lsof -i :3000

# Rebuild without cache
docker-compose build --no-cache

# Check environment
docker exec creatype-storefront env
```

### App Shows "consumerKey required" Error

**Solution:** The app falls back to mock data if WooCommerce credentials are missing. This is expected behavior during development.

For production, ensure these are set:
```bash
NEXT_PUBLIC_WC_SITE_URL=https://your-site.com
WC_CONSUMER_KEY=ck_xxxxx
WC_CONSUMER_SECRET=cs_xxxxx
```

### Slow Build Times

**Optimize build:**
```bash
# Use Docker BuildKit
DOCKER_BUILDKIT=1 docker build -t creatype-storefront .

# Enable layer caching in Easypanel settings
```

### 502 Bad Gateway

**Causes:**
- Container not ready yet
- Port mismatch
- Container crashed

**Debug:**
```bash
# Check container status
docker ps -a

# Restart container
docker-compose restart

# Check Easypanel service logs
```

### SSL Certificate Issues

**Solutions:**
1. Verify DNS points to correct IP
2. Wait for DNS propagation (30 min)
3. Disable SSL, wait 5 min, re-enable
4. Check Let's Encrypt rate limits

### Out of Memory

**Increase container memory:**
```yaml
# docker-compose.yml
services:
  creatype-storefront:
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

---

## Production Checklist

Before going live, verify:

- [ ] Environment variables configured
- [ ] WooCommerce API credentials tested
- [ ] Domain DNS configured
- [ ] SSL certificate active
- [ ] Health checks passing
- [ ] Logs showing no errors
- [ ] All pages loading correctly
- [ ] Cart functionality working
- [ ] Checkout process tested
- [ ] Mobile responsive checked
- [ ] Performance acceptable
- [ ] Backup strategy in place

---

## Security Best Practices

1. **Never commit secrets to Git**
   - Use `.env.production` (in `.gitignore`)
   - Store in Easypanel UI only

2. **Use strong credentials**
   - Regenerate WooCommerce keys regularly
   - Use different keys for staging/production

3. **Enable HTTPS only**
   - Force SSL in Easypanel
   - Redirect HTTP to HTTPS

4. **Keep updated**
   - Update dependencies regularly
   - Monitor security advisories
   - Apply Docker image updates

5. **Restrict access**
   - Firewall rules on VPS
   - WooCommerce IP whitelist (optional)
   - Rate limiting via reverse proxy

---

## Cost Optimization

### VPS Requirements
- **Minimum**: 1GB RAM, 1 CPU, 25GB Storage
- **Recommended**: 2GB RAM, 2 CPU, 50GB Storage
- **Estimated cost**: $5-10/month (Hetzner, DigitalOcean)

### Resource Usage
- **Container**: ~200MB RAM idle, ~400MB under load
- **Storage**: ~500MB (app + dependencies)
- **Network**: Minimal (mostly static content)

---

## Support Resources

- **Easypanel Docs**: https://easypanel.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Docker Docs**: https://docs.docker.com
- **WooCommerce API**: https://woocommerce.github.io/woocommerce-rest-api-docs

---

## Quick Commands Reference

```bash
# Build and run locally
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up -d

# Check container health
docker ps
docker inspect creatype-storefront

# SSH to VPS
ssh user@your-vps-ip

# Update from Git
git pull origin main
docker-compose up -d --build
```

---

**Deployment Status**: ✅ Ready for Production  
**Estimated Setup Time**: 15-30 minutes  
**Difficulty Level**: Beginner-Friendly
