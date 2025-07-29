@echo off
cd /d ".\backend\python"
set PYTHONPATH=c:\Users\bence.kovacs3\Desktop\wens\backend\python
"news_env\Scripts\python.exe" -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
pause
