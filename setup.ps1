# Lawbook Setup Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Lawbook - Setup & Installation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if MongoDB is installed
Write-Host "`nChecking MongoDB installation..." -ForegroundColor Yellow
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongoService) {
    Write-Host "✓ MongoDB service found" -ForegroundColor Green
    if ($mongoService.Status -ne 'Running') {
        Write-Host "  Starting MongoDB service..." -ForegroundColor Yellow
        Start-Service MongoDB
        Write-Host "✓ MongoDB started" -ForegroundColor Green
    } else {
        Write-Host "✓ MongoDB is running" -ForegroundColor Green
    }
} else {
    Write-Host "⚠ MongoDB service not found. Make sure MongoDB is installed and running." -ForegroundColor Yellow
    Write-Host "  You can start MongoDB manually or install it from https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
}

# Create .env file if it doesn't exist
Write-Host "`nSetting up environment variables..." -ForegroundColor Yellow
if (!(Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "✓ Created .env file from .env.example" -ForegroundColor Green
    Write-Host "⚠ Please update .env with your API keys:" -ForegroundColor Yellow
    Write-Host "  - GEMINI_API_KEY (Get from https://makersuite.google.com/app/apikey)" -ForegroundColor Yellow
    Write-Host "  - RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (Get from https://dashboard.razorpay.com/)" -ForegroundColor Yellow
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

# Install root dependencies
Write-Host "`nInstalling root dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Root dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install root dependencies" -ForegroundColor Red
    exit 1
}

# Install client dependencies
Write-Host "`nInstalling client dependencies..." -ForegroundColor Yellow
cd client
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Client dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install client dependencies" -ForegroundColor Red
    exit 1
}
cd ..

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update .env file with your API keys" -ForegroundColor White
Write-Host "2. Make sure MongoDB is running" -ForegroundColor White
Write-Host "3. Run 'npm run dev' to start both server and client" -ForegroundColor White
Write-Host ""
Write-Host "Or run separately:" -ForegroundColor Yellow
Write-Host "  npm run server  # Backend on http://localhost:5000" -ForegroundColor White
Write-Host "  npm run client  # Frontend on http://localhost:3000" -ForegroundColor White
Write-Host ""
