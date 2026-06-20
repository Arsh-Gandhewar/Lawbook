# Lawbook - Quick Start Guide

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Starting Lawbook Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is running
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongoService -and $mongoService.Status -eq 'Running') {
    Write-Host "[OK] MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "[WARN] MongoDB is not running. Attempting to start..." -ForegroundColor Yellow
    try {
        Start-Service MongoDB -ErrorAction Stop
        Write-Host "[OK] MongoDB started" -ForegroundColor Green
    } catch {
        Write-Host "[ERR] Could not start MongoDB. Please start it manually." -ForegroundColor Red
        Write-Host "  Run: net start MongoDB" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Starting Lawbook..." -ForegroundColor Yellow
Write-Host "Backend will run on http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend will run on http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the application" -ForegroundColor Yellow
Write-Host ""

# Start the application
npm run dev
