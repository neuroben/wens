# FastAPI Server Starter Script
Set-Location "c:\Users\bence.kovacs3\Desktop\react-news\backend\python"
$env:PYTHONPATH = "c:\Users\bence.kovacs3\Desktop\react-news\backend\python"

Write-Host "Starting FastAPI server..." -ForegroundColor Green
Write-Host "Server will be available at: http://127.0.0.1:8000" -ForegroundColor Yellow
Write-Host "API Documentation: http://127.0.0.1:8000/docs" -ForegroundColor Yellow
Write-Host ""

& ".\news_env\Scripts\python.exe" -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
