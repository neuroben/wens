@echo off
cd /d "%~dp0\backend\python"
call news_env\Scripts\activate.bat
uvicorn main:app --reload
pause
