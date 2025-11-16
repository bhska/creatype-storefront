# Docker Quick Start Guide

Get your Creatype Storefront running with Docker in under 5 minutes!

## Prerequisites
- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed

## Quick Start (3 Steps)

### 1. Clone & Configure
```bash
# Clone the repository (if not already done)
cd /path/to/creatype-storefront

# Copy environment file
cp .env.production.example .env.production

# Edit with your WooCommerce credentials (optional - works with mock data)
nano .env.production
```

### 2. Build & Run
```bash
# Build and start the container
docker-compose up -d

# Wait 30 seconds for the container to start
```

### 3. Access Your App
```bash
# Open in browser
open http://localhost:3000

# Or visit manually
# http://localhost:3000
```

That's it! Your app is now running! 🎉

---

## Common Commands

```bash
# View logs
docker-compose logs -f

# Stop the app
docker-compose down

# Restart the app
docker-compose restart

# Rebuild after code changes
docker-compose up -d --build

# Check container status
docker ps
```

---

## Using Mock Data (No WooCommerce Required)

The app works out-of-the-box with mock data! You don't need WooCommerce credentials for testing.

**What works with mock data:**
- ✅ Browse 12 products
- ✅ Product details & previews
- ✅ Shopping cart
- ✅ Checkout process
- ✅ Category filtering
- ✅ Search functionality
- ✅ Coupon code: `rockvilleversatility5`

**When you're ready for production:**
Just update `.env.production` with your real WooCommerce credentials and restart.

---

## Troubleshooting

### Port 3000 already in use?
```bash
# Use different port
docker-compose down
# Edit docker-compose.yml: change "3000:3000" to "3001:3000"
docker-compose up -d
# Access at http://localhost:3001
```

### Container won't start?
```bash
# Check logs
docker-compose logs

# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

### Need to reset?
```bash
# Complete reset
docker-compose down
docker system prune -f
docker-compose up -d --build
```

---

## Production Deployment

Ready to deploy to a VPS? See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Easypanel setup
- VPS configuration
- Domain & SSL setup
- Monitoring & scaling

---

## Next Steps

1. **Test the app**: Browse products, add to cart, checkout
2. **Customize**: Update branding, colors, content
3. **Configure WooCommerce**: When ready for production
4. **Deploy**: Follow DEPLOYMENT.md for VPS setup

---

**Status**: ✅ Docker Ready  
**Build Time**: ~2-3 minutes  
**Container Size**: ~500MB
