# PowerShell script to start the server
Set-Location -Path (Join-Path $PSScriptRoot "backend\python")
& "news_env\Scripts\Activate.ps1"
uvicorn main:app --reload
